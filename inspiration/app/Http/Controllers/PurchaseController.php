<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Models\Idea;
use App\Models\Purchase;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    /**
     * コンストラクタで認証ミドルウェアを適用
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * 自身の購入リストを表示する
     *
     * @return \Illuminate\Http\Response
     */
    public function myPurchases()
    {
        $user = auth()->user();
        // ユーザーの購入履歴を取得
        $purchases = Purchase::where('buyer_id', $user->id)
            //ideasテーブルからデータを取得
            ->with(['idea' => function($query) {
                $query->select('id', 'category_id', 'title');
            }])
            //purchasesテーブルからデータを取得
            ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']); // 購入情報とレビューの詳細を取得

        // 一覧をJSON形式でレスポンス
        return response()->json($purchases);
    }

    /**
     * 自分がレビューした履歴のみを表示する
     *
     * @return \Illuminate\Http\Response
     */
    public function myReviewedPurchases()
    {
        $user = auth()->user();
        // レビュー履歴のみを取得
        $reviewedPurchases = Purchase::where('buyer_id', $user->id)
            ->whereNotNull('review')
            ->with(['idea' => function($query) {
                $query->select('id', 'category_id', 'title');
            }])
            ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']);
        // レビュー済みの一覧をJSON形式でレスポンス
        return response()->json($reviewedPurchases);
    }



    // /**
    //  * Display a listing of the resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function index()
    // {
    //     //
    // }

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
     * @param  \App\Http\Requests\StorePurchaseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePurchaseRequest $request)
    {
        //全ての処理が完了したら登録する
        DB::beginTransaction();

        try {
            //購入レコードの作成
            $purchase = Purchase::create([
                'idea_id' => $request->idea_id,
                'buyer_id' => $request->user()->id,
            ]);

            //条件に一致するモデルがあった場合にアイディアのpurchasedをtrueに変更
            $idea = Idea::findOrFail($request->idea_id);
            $idea->update(['purchased' => true]);

            //トランザクションが確定，データ保存
            DB::commit();
            return response()->json($purchase, 201);
        } catch (\Exception $e) {
            //エラー発生のため，ロースバックして，変更と取り消し
            DB::rollback();
            return response()->json(['error' => 'Failed to process purchase'], 500);
        }
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\Models\Purchase  $purchase
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show(Purchase $purchase)
    // {
    //     //
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  \App\Models\Purchase  $purchase
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit(Purchase $purchase)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePurchaseRequest  $request
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePurchaseRequest $request, Purchase $purchase)
    {
        //レビューと評価が共に入力されている場合(キーが存在し，空でない値)は登録
        if ($request->filled(['review', 'rating'])) {
            $purchase->update([
                'review' => $request->review,
                'rating' => $request->rating,
            ]);
            return response()->json($purchase);
        } else {
            //それ以外はエラー
            return response()->json(['error' => 'Both review and rating must be provided'], 400);
        }
    }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  \App\Models\Purchase  $purchase
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy(Purchase $purchase)
    // {
    //     //
    // }
}
