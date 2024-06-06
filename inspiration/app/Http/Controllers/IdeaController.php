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

        // 各アイディアに平均評価とお気に入り数を追加
        $ideas->each(function ($idea) {
            $idea->average_rating = $idea->average_rating;
            $idea->favorite_count = $idea->favorite_count;
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

        // 各アイディアに平均評価とお気に入り数を追加
        $ideas->each(function ($idea) {
            $idea->average_rating = $idea->average_rating;
            $idea->favorite_count = $idea->favorite_count;
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
        //ポストされたデータを取得して登録する
        $idea = Idea::create($request->all());

        //データがあればjsonで返す（ステータスコード２０１）
        //アイディアがなければ，エラーレスポンス（ステータスコード５００）
        return $idea ? response()->json($idea, 201) : response()->json([], 500);
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
        $idea->load(['purchases' => function($query) {
            $query->whereNotNull('review')->select('idea_id', 'review', 'rating', 'created_at');
        }]);

        //レスポンスで，各情報を返す
        return response()->json([
            'idea' => $idea,
            'average_rating' => $idea->averageRating,
            'reviews' => $idea->purchases
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
    public function update(UpdateIdeaRequest $request, Idea $idea)
    {
        // 更新は投稿者のみ許可、かつ purchased が false であることが条件
        if ($idea->user_id !== Auth::id() || $idea->purchased) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // アイデアを更新
        try {
            $idea->updateIdea($request->all());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 403);
        }

        //データがあればjsonで返す（ステータスコード２０１）
        return response()->json($idea,200);
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

        //削除する前にデータを保持
        $deletedIdea = $idea;

        //データが削除されれば削除されたアイディアを含むレスポンスをjsonで返す
        //削除が失敗した場合はからのjsonレスポンスを返す（ステータスコード５００）
        return $idea->delete() ? response()->json($deletedIdea) : response()->json([],500);
    }
}
