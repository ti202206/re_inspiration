<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreIdeaRequest;
use App\Http\Requests\UpdateIdeaRequest;
use App\Models\Idea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Log;

class IdeaController extends Controller
{
    /**
     * コンストラクタで認証ミドルウェアを適用
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //ideaテーブルの全てのデータを取得
        $ideas = Idea::orderByDesc('created_at')->get();

        // 各アイディアに平均評価と気になる数を追加
        $ideas->each(function ($idea) {
            $idea->average_rating = $idea->averageRating;
            $idea->favorite_count = $idea->favoriteCount;
            $idea->purchase_count = $idea->purchaseCount;
            $idea->review_count = $idea->reviewCount;
        });

        //json形式でデータを返す
        return response()->json($ideas);
    }

    /**
     * Display a listing of the user's own ideas.
     *
     * @return \Illuminate\Http\Response
     */
    public function myIdeas()
    {
        // 認証されたユーザーを取得
        $user = Auth::user();

        // ユーザーが投稿したアイディアを取得
        $ideas = Idea::where('user_id', $user->id)->orderByDesc('created_at')->get();

        // 各アイディアに平均評価と気になる数を追加
        $ideas->each(function ($idea) {
            $idea->average_rating = $idea->averageRating;
            $idea->favorite_count = $idea->favoriteCount;
            $idea->purchase_count = $idea->purchaseCount;
            $idea->review_count = $idea->reviewCount;
        });

        // JSON形式で返す
        return response()->json($ideas);
    }

    // /**
    //  * Show the form for creating a new resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreIdeaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreIdeaRequest $request)  //storeIdeaRequestのauthorizeをtrueに変更中
    {
        // バリデーション済みのデータを使用してアイデアを作成
        $validatedData = $request->validated();
        $idea = new Idea();
        $idea->user_id = Auth::id();
        $idea->category_id = $validatedData['category_id'];
        $idea->title = $validatedData['title'];
        $idea->overview = $validatedData['overview'];
        $idea->content = $validatedData['content'];
        $idea->price = $validatedData['price'];
        $idea->save();

        // データがあればjsonで返す（ステータスコード201）
        return response()->json($idea, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Idea  $idea
     * @return \Illuminate\Http\Response
     */
    public function show(Idea $idea)
    {
        // 購入者または投稿者のみがcontentを閲覧可能
        $user = Auth::user();
        $isPurchaser = $idea->purchases()->where('buyer_id', $user->id)->exists();
        $isOwner = $idea->user_id === $user->id;

        if (!$isPurchaser && !$isOwner) {
            // contentの非表示設定
            unset($idea->content);
        }

        //レビューがある購入の詳細情報をロードする
        $idea->load(['user:id,name', 'purchases' => function ($query) {
            $query->whereNotNull('review')->select('idea_id', 'review', 'rating', 'created_at');
        }]);

        //レスポンスで，各情報を返す
        return response()->json([
            'idea' => $idea,
            'average_rating' => $idea->averageRating,
            'reviews' => $idea->purchases,
            'purchase_count' => $idea->purchaseCount,
            'review_count' => $idea->reviewCount,
        ]);
    }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  \App\Models\Idea  $idea
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit(Idea $idea)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateIdeaRequest  $request
     * @param  \App\Models\Idea  $idea
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {

        $idea = Idea::find($id);
        if (!$idea) {
            return response()->json(['message' => 'Idea not found'], 404);
        }

        // 更新は投稿者のみ許可、かつ purchased が false であることが条件
        if ($idea->user_id !== Auth::id() || $idea->purchased) {
            return response()->json(['error' => 'すでに販売済みのため，変更できません'], 403);
        }

        // バリデーション済みのデータを使用してアイデアを更新
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'overview' => 'nullable|string',
            'content' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        // 更新処理
        try {
            $idea->update($validatedData);
        } catch (\Exception $e) {
            Log::error('Error updating idea: ' . $e->getMessage());
            return response()->json(['error' => '更新中にエラーが発生しました'], 500);
        }

        return response()->json(['message' => 'Idea updated successfully', 'idea' => $idea], 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Idea  $idea
     * @return \Illuminate\Http\Response
     */
    public function destroy(Idea $idea)
    {
        // 削除は投稿者のみ許可
        if ($idea->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        //データが削除されれば削除されたアイディアを含むレスポンスをjsonで返す
        //削除が失敗した場合は空のjsonレスポンスを返す（ステータスコード５００）
        try {
            $idea->delete();
            return response()->json(['message' => 'Idea deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting idea: ' . $e->getMessage());
            return response()->json(['error' => '削除中にエラーが発生しました'], 500);
        }
    }
}
