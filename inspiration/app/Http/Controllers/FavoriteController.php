<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFavoriteRequest;
use App\Http\Requests\UpdateFavoriteRequest;
use App\Models\Favorite;
use App\Models\Idea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FavoriteController extends Controller
{
    // 気になるの切り替えを行う
    public function toggleFavorite(Request $request)
    {
        //気になるを検索する
        $idea = Idea::findOrFail($request->idea_id);

        //アイディアの所有者が現在のユーザーである場合は403エラーを返す
        if ($idea->user_id == auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        //気になる登録する．（ない場合はtrueとして作成する）
        $favorite = Favorite::firstOrCreate(
            ['user_id' => auth()->id(), 'idea_id' => $idea->id],
            ['is_favorite' => 0]
        );

        //気になるを反転させて，保存
        $favorite->is_favorite = !$favorite->is_favorite;
        $favorite->save();

        //レスポンスを表示
        return response()->json(['message' => 'Favorite toggled successfully.', 'is_favorite' => $favorite->is_favorite]);
    }

    // アイディアIDに基づいて気になる情報を取得
    public function getFavoriteByIdeaId($idea_id)
    {
        $favorite = Favorite::where('user_id', Auth::id())
            ->where('idea_id', $idea_id)
            ->first();

        if (!$favorite) {
            return response()->json(['is_favorite' => false], 200);
        }

        return response()->json($favorite);
    }

    /**
     * ログインユーザーの気になる一覧を表示
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // 気になるリストの取得とアイディアデータのフォーマット
        $favorites = Favorite::where('user_id', Auth::id())
            ->where('is_favorite', 1) // is_favoriteがtrueのものだけを取得
            ->with(['idea'])
            ->orderBy('created_at', 'desc')
            ->get();

        $formattedFavorites = $favorites->map(function ($favorite) {
            $idea = $favorite->idea;

            return [
                'id' => $favorite->id,
                'user_id' => $favorite->user_id,
                'idea_id' => $favorite->idea_id,
                'is_favorite' => $favorite->is_favorite,
                'created_at' => $favorite->created_at,
                'updated_at' => $favorite->updated_at,
                'idea' => [
                    'id' => $idea->id,
                    'user_id' => $idea->user_id,
                    'category_id' => $idea->category_id,
                    'title' => $idea->title,
                    'overview' => $idea->overview,
                    'content' => $idea->content,
                    'price' => $idea->price,
                    'purchased' => $idea->purchased,
                    'created_at' => $idea->created_at,
                    'updated_at' => $idea->updated_at,
                    // 必要なラベルデータを追加
                    'average_rating' => $idea->average_rating ?? '-',
                    'favorite_count' => $idea->favorite_count ?? 0,
                    'purchase_count' => $idea->purchase_count ?? 0,
                    'review_count' => $idea->review_count ?? 0,
                ]
            ];
        });

        return response()->json($formattedFavorites);
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

    // /**
    //  * Store a newly created resource in storage.
    //  *
    //  * @param  \App\Http\Requests\StoreFavoriteRequest  $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function store(StoreFavoriteRequest $request)
    // {
    //     //
    // }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\Models\Favorite  $favorite
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show(Favorite $favorite)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  \App\Models\Favorite  $favorite
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit(Favorite $favorite)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \App\Http\Requests\UpdateFavoriteRequest  $request
    //  * @param  \App\Models\Favorite  $favorite
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(UpdateFavoriteRequest $request, Favorite $favorite)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  \App\Models\Favorite  $favorite
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy(Favorite $favorite)
    // {
    //     //
    // }
}
