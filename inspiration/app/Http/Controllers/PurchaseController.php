<?php

// namespace App\Http\Controllers;

// use App\Http\Requests\StorePurchaseRequest;
// use App\Http\Requests\UpdatePurchaseRequest;
// use App\Models\Idea;
// use App\Models\Purchase;
// use Illuminate\Support\Facades\DB;

// class PurchaseController extends Controller
// {
//     /**
//      * コンストラクタで認証ミドルウェアを適用
//      */
//     // public function __construct()
//     // {
//     //     $this->middleware('auth');
//     // }

//     /**
//      * 自身の購入リストを表示する
//      *
//      * @return \Illuminate\Http\Response
//      */
//     public function myPurchases()
//     {
//         $user = auth()->user();
//         // ユーザーの購入履歴を取得
//         $purchases = Purchase::where('buyer_id', $user->id)
//             //ideasテーブルからデータを取得
//             ->with(['idea' => function($query) {
//                 $query->select('id', 'category_id', 'title','overview');
//             }])
//             //purchasesテーブルからデータを取得
//             ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']); // 購入情報とレビューの詳細を取得

//         // 一覧をJSON形式でレスポンス
//         return response()->json($purchases);
//     }

//     /**
//      * 全ユーザーのレビュー履歴を表示する
//      *
//      * @return \Illuminate\Http\Response
//      */
//     public function allReviews()
//     {
//         // 全てのレビューを持つ購入レコードを取得
//         $reviews = Purchase::whereNotNull('review')
//             ->with(['idea' => function($query) {
//                 $query->select('id', 'title'); // アイディアのIDとタイトルを取得
//             }])
//             ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']); // 必要な購入情報を取得

//         // 一覧をJSON形式でレスポンス
//         return response()->json($reviews);
//     }

//     /**
//      * 自分がレビューした履歴のみを表示する
//      *
//      * @return \Illuminate\Http\Response
//      */
//     public function myReviewedPurchases()
//     {
//         $user = auth()->user();
//         // レビュー履歴のみを取得
//         $reviewedPurchases = Purchase::where('buyer_id', $user->id)
//             ->whereNotNull('review')
//             ->with(['idea' => function($query) {
//                 $query->select('id', 'category_id', 'title');
//             }])
//             ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']);
//         // レビュー済みの一覧をJSON形式でレスポンス
//         return response()->json($reviewedPurchases);
//     }



//     // /**
//     //  * Display a listing of the resource.
//     //  *
//     //  * @return \Illuminate\Http\Response
//     //  */
//     // public function index()
//     // {
//     //     //
//     // }

//     // /**
//     //  * Show the form for creating a new resource.
//     //  *
//     //  * @return \Illuminate\Http\Response
//     //  */
//     // public function create()
//     // {
//     //     //
//     // }

//     /**
//      * Store a newly created resource in storage.
//      *
//      * @param  \App\Http\Requests\StorePurchaseRequest  $request
//      * @return \Illuminate\Http\Response
//      */
//     public function store(StorePurchaseRequest $request)
//     {
//         //全ての処理が完了したら登録する
//         DB::beginTransaction();

//         try {
//             //購入レコードの作成
//             $purchase = Purchase::create([
//                 'idea_id' => $request->idea_id,
//                 'buyer_id' => $request->user()->id,
//             ]);

//             //条件に一致するモデルがあった場合にアイディアのpurchasedをtrueに変更
//             $idea = Idea::findOrFail($request->idea_id);
//             $idea->update(['purchased' => true]);

//             //トランザクションが確定，データ保存
//             DB::commit();
//             return response()->json($purchase, 201);
//         } catch (\Exception $e) {
//             //エラー発生のため，ロースバックして，変更と取り消し
//             DB::rollback();
//             return response()->json(['error' => 'Failed to process purchase'], 500);
//         }
//     }

//     // /**
//     //  * Display the specified resource.
//     //  *
//     //  * @param  \App\Models\Purchase  $purchase
//     //  * @return \Illuminate\Http\Response
//     //  */
//     // public function show(Purchase $purchase)
//     // {
//     //     //
//     // }

//     // /**
//     //  * Show the form for editing the specified resource.
//     //  *
//     //  * @param  \App\Models\Purchase  $purchase
//     //  * @return \Illuminate\Http\Response
//     //  */
//     // public function edit(Purchase $purchase)
//     // {
//     //     //
//     // }

//     /**
//      * Update the specified resource in storage.
//      *
//      * @param  \App\Http\Requests\UpdatePurchaseRequest  $request
//      * @param  \App\Models\Purchase  $purchase
//      * @return \Illuminate\Http\Response
//      */
//     public function update(UpdatePurchaseRequest $request, Purchase $purchase)
//     {
//         //レビューと評価が共に入力されている場合(キーが存在し，空でない値)は登録
//         if ($request->filled(['review', 'rating'])) {
//             $purchase->update([
//                 'review' => $request->review,
//                 'rating' => $request->rating,
//             ]);
//             return response()->json($purchase);
//         } else {
//             //それ以外はエラー
//             return response()->json(['error' => 'Both review and rating must be provided'], 400);
//         }
//     }

//     // /**
//     //  * Remove the specified resource from storage.
//     //  *
//     //  * @param  \App\Models\Purchase  $purchase
//     //  * @return \Illuminate\Http\Response
//     //  */
//     // public function destroy(Purchase $purchase)
//     // {
//     //     //
//     // }
// }



// namespace App\Http\Controllers;

// use App\Http\Requests\StorePurchaseRequest;
// use App\Http\Requests\UpdatePurchaseRequest;
// use App\Models\Idea;
// use App\Models\Purchase;
// use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Facades\Auth;

// class PurchaseController extends Controller
// {
//     /**
//      * コンストラクタで認証ミドルウェアを適用
//      */
//     // public function __construct()
//     // {
//     //     $this->middleware('auth:sanctum');
//     // }

//     /**
//      * 自身の購入リストを表示する
//      *
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function myPurchases()
//     {
//         $user = Auth::user();
//         // ユーザーの購入履歴を取得
//         $purchases = Purchase::where('buyer_id', $user->id)
//             ->with(['idea:id,category_id,title,overview']) // ideas テーブルからデータを取得
//             ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']); // 購入情報とレビューの詳細を取得

//         return response()->json($purchases);
//     }

//     /**
//      * 全ユーザーのレビュー履歴を表示する
//      *
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function allReviews()
//     {
//         // 全てのレビューを持つ購入レコードを取得
//         $reviews = Purchase::whereNotNull('review')
//             ->with(['idea:id,title']) // アイディアのIDとタイトルを取得
//             ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']); // 必要な購入情報を取得

//         return response()->json($reviews);
//     }

//     /**
//      * 自分がレビューした履歴のみを表示する
//      *
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function myReviewedPurchases()
//     {
//         $user = Auth::user();
//         // レビュー履歴のみを取得
//         $reviewedPurchases = Purchase::where('buyer_id', $user->id)
//             ->whereNotNull('review')
//             ->with(['idea:id,category_id,title,overview'])
//             ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']);

//         return response()->json($reviewedPurchases);
//     }

//     /**
//      * 購入を登録する
//      *
//      * @param  \App\Http\Requests\StorePurchaseRequest  $request
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function store(StorePurchaseRequest $request)
//     {
//         DB::beginTransaction();

//         try {
//             // 購入レコードの作成
//             $purchase = Purchase::create([
//                 'idea_id' => $request->idea_id,
//                 'buyer_id' => $request->user()->id,
//             ]);

//             // アイディアの purchased を true に変更
//             $idea = Idea::findOrFail($request->idea_id);
//             $idea->update(['purchased' => true]);

//             DB::commit();
//             return response()->json($purchase, 201);
//         } catch (\Exception $e) {
//             DB::rollback();
//             return response()->json(['error' => 'Failed to process purchase', 'message' => $e->getMessage()], 500);
//         }
//     }


//     /**
//      * レビュー情報を投稿する
//      *
//      * @param  \Illuminate\Http\StorePurchaseRequest  $request
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function storeReview(StorePurchaseRequest $request)
//     {
//         $request->validate([
//             'purchase_id' => 'required|exists:purchases,id',
//             'review' => 'required|string',
//             'rating' => 'required|integer|min:1|max:5',
//         ]);

//         $purchase = Purchase::findOrFail($request->purchase_id);

//         // 認証ユーザーが購入者かどうかを確認
//         if ($purchase->buyer_id !== Auth::id()) {
//             return response()->json(['error' => 'Unauthorized'], 403);
//         }

//         // レビューと評価の登録
//         $purchase->update([
//             'review' => $request->review,
//             'rating' => $request->rating,
//             'reviewed_at' => now(),
//         ]);

//         return response()->json(['message' => 'レビューが投稿されました', 'purchase' => $purchase], 201);
//     }

//     /**
//      * レビュー情報を更新する
//      *
//      * @param  \App\Http\Requests\UpdatePurchaseRequest  $request
//      * @param  \App\Models\Purchase  $purchase
//      * @return \Illuminate\Http\JsonResponse
//      */
//     public function update(UpdatePurchaseRequest $request, Purchase $purchase)
//     {
//         // 認証ユーザーが購入者かどうかを確認
//         if ($purchase->buyer_id !== Auth::id()) {
//             return response()->json(['error' => 'Unauthorized'], 403);
//         }

//         // レビューと評価が共に入力されている場合(キーが存在し，空でない値)は登録
//         if ($request->filled(['review', 'rating'])) {
//             $purchase->update($request->only('review', 'rating'));
//             return response()->json($purchase);
//         } else {
//             // それ以外はエラー
//             return response()->json(['error' => 'Both review and rating must be provided'], 422);
//         }
//     }
// }



namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Models\Idea;
use App\Models\Purchase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    /**
     * 自身の購入リストを表示する
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function myPurchases()
    {
        $user = Auth::user();
        // ユーザーの購入履歴を取得
        $purchases = Purchase::where('buyer_id', $user->id)
            ->with(['idea:id,category_id,title,overview,updated_at']) // ideas テーブルからデータを取得
            ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at']); // 購入情報とレビューの詳細を取得

        return response()->json($purchases);
    }

    /**
     * 全ユーザーのレビュー履歴を表示する
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function allReviews()
    {
        // 全てのレビューを持つ購入レコードを取得
        $reviews = Purchase::whereNotNull('review')
            ->with(['idea:id,title,updated_at,user_id','buyer:id,name',]) // アイディアのIDとタイトルを取得
            ->get(['id', 'idea_id','buyer_id', 'review', 'rating', 'created_at', 'updated_at']); // 必要な購入情報を取得

        return response()->json($reviews);
    }

    /**
     * 自分がレビューした履歴のみを表示する
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function myReviewedPurchases()
    {
        $user = Auth::user();
        // レビュー履歴のみを取得
        $reviewedPurchases = Purchase::where('buyer_id', $user->id)
            ->whereNotNull('review')
            ->with(['idea:id,category_id,title,overview,updated_at'])
            ->get(['id', 'idea_id', 'review', 'rating', 'reviewed_at','created_at', 'updated_at']);

        return response()->json($reviewedPurchases);
    }

    /**
     * 購入を登録する
     *
     * @param  \App\Http\Requests\StorePurchaseRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StorePurchaseRequest $request)
    {
        DB::beginTransaction();

        try {
            // 購入レコードの作成
            $purchase = Purchase::create([
                'idea_id' => $request->idea_id,
                'buyer_id' => $request->user()->id,
            ]);

            // アイディアの purchased を true に変更
            $idea = Idea::findOrFail($request->idea_id);
            $idea->update(['purchased' => true]);

            DB::commit();
            return response()->json($purchase, 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Failed to process purchase', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * レビュー情報を投稿または更新する
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeOrUpdateReview(Request $request, Purchase $purchase) // 統合: レビューを投稿または更新するメソッド
    {
        $request->validate([
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        // 認証ユーザーが購入者かどうかを確認
        if ($purchase->buyer_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // レビューと評価の登録または更新
        $purchase->update([
            'review' => $request->review,
            'rating' => $request->rating,
            'reviewed_at' => now(),
        ]);

        return response()->json(['message' => 'レビューが投稿または更新されました', 'purchase' => $purchase], 201);
    }

        /**
     * 購入およびレビュー情報を取得する
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Purchase $purchase)
    {
        // 必要なデータを取得してレスポンス
        return response()->json($purchase);
    }
}
