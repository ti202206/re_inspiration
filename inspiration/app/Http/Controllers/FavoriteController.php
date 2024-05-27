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
    // お気に入りの切り替えを行う
    public function toggleFavorite(Request $request)
    {
        //お気に入りを検索する
        $idea = Idea::findOrFail($request->idea_id);

        //アイディアの所有者が現在のユーザーである場合は403エラーを返す
        if ($idea->user_id == auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        //お気に入り登録する．（ない場合はfalseとして作成する）
        $favorite = Favorite::firstOrCreate(
            ['user_id' => auth()->id(), 'idea_id' => $idea->id],
            ['is_favorite' => false]
        );

        //お気に入りを反転させて，保存
        $favorite->is_favorite = !$favorite->is_favorite;
        $favorite->save();

        //レスポンスを表示
        return response()->json(['message' => 'Favorite toggled successfully.', 'is_favorite' => $favorite->is_favorite]);

    }

    /**
     * ログインユーザーのお気に入り一覧を表示
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //一覧を表示する（アイディアのデータも取得）
        $favorites = Favorite::where('user_id',Auth::id())->with('idea')->get();

        return response()->json($favorites);
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
