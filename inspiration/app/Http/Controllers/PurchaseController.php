<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Models\Idea;
use App\Models\Purchase;
use App\Models\User;
use App\Mail\IdeaPurchased;
use Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Log;

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
        $purchases = Cache::remember("user_purchases_{$user->id}", 60, function () use ($user) {
            return Purchase::where('buyer_id', $user->id)
            ->with(['idea:id,category_id,title,overview,updated_at,price',]) // ideas テーブルからデータを取得
            ->get(['id', 'idea_id', 'review', 'rating', 'created_at', 'updated_at','buyer_id']) // 購入情報とレビューの詳細を取得
            ->map(function ($purchase) {
                // 関連する Idea のデータを整形
                $idea = $purchase->idea;

                // 必要なラベルデータを追加
                $ideaData = $idea->only(['id', 'category_id', 'title', 'overview', 'updated_at', 'price']);
                $ideaData['average_rating'] = $idea->average_rating;
                $ideaData['favorite_count'] = $idea->favorite_count;
                $ideaData['purchase_count'] = $idea->purchase_count;
                $ideaData['review_count'] = $idea->review_count;

                return [
                    'id' => $purchase->id,
                    'idea_id' => $purchase->idea_id,
                    'review' => $purchase->review,
                    'rating' => $purchase->rating,
                    'created_at' => $purchase->created_at,
                    'updated_at' => $purchase->updated_at,
                    'buyer_id' => $purchase->buyer_id,
                    'idea' => $ideaData,
                ];
            });
        });
        return response()->json($purchases);
    }

    /**
     * 全ユーザーのレビュー履歴を表示する
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function allReviews()
    // {
    //     // 全てのレビューを持つ購入レコードを取得
    //     $reviews = Purchase::whereNotNull('review')
    //         ->with(['idea:id,title,updated_at','buyer:id,name',]) // アイディアのIDとタイトルを取得
    //         ->get(['id', 'idea_id','buyer_id', 'review', 'rating', 'created_at', 'updated_at']); // 必要な購入情報を取得

    //     return response()->json($reviews);
    // }
    public function allReviews()
    {
        // 全てのレビューを持つ購入レコードを取得
        $reviews = Purchase::whereNotNull('review')
            ->with([
                'idea:id,title,updated_at,category_id,overview,content,price,purchased', // 必要なフィールドを取得
                'buyer:id,name',
            ])
            ->get(['id', 'idea_id', 'buyer_id', 'review', 'rating', 'created_at', 'updated_at']);

        // リレーションとアクセサを使って整形されたデータを返す
        $formattedReviews = $reviews->map(function ($review) {
            $idea = $review->idea;
            $buyer = $review->buyer;
            
            return [
                'id' => $review->id,
                'idea_id' => $review->idea_id,
                'buyer_id' => $review->buyer_id,
                'review' => $review->review,
                'rating' => $review->rating,
                'created_at' => $review->created_at,
                'updated_at' => $review->updated_at,
                'buyer_name' => $buyer ? $buyer->name : '不明',
                'idea' => [
                    'id' => $idea->id,
                    'category_id' => $idea->category_id,
                    'title' => $idea->title,
                    'overview' => $idea->overview,
                    'content' => $idea->content,
                    'price' => $idea->price,
                    'purchased' => $idea->purchased,
                    'created_at' => $idea->created_at,
                    'updated_at' => $idea->updated_at,
                    'average_rating' => $idea->average_rating,
                    'favorite_count' => $idea->favorite_count,
                    'purchase_count' => $idea->purchase_count,
                    'review_count' => $idea->review_count,
                ]
            ];
        });

        return response()->json($formattedReviews);
    }

    /**
     * 自分がレビューした履歴のみを表示する
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function myReviewedPurchases()
    // {
    //     $user = Auth::user();
    //     // レビュー履歴のみを取得
    //     $reviewedPurchases = Purchase::where('buyer_id', $user->id)
    //         ->whereNotNull('review')
    //         ->with(['idea:id,category_id,title,overview,updated_at'])
    //         ->get(['id', 'idea_id', 'review', 'rating', 'reviewed_at','created_at', 'updated_at','buyer_id']);

    //     return response()->json($reviewedPurchases);
    // }
    public function myReviewedPurchases()
    {
        $user = Auth::user();
        // レビュー履歴のみを取得
        $reviewedPurchases = Purchase::where('buyer_id', $user->id)
            ->whereNotNull('review')
            ->with(['idea:id,category_id,title,overview,content,price,purchased,updated_at']) // 必要なフィールドを取得
            ->get(['id', 'idea_id', 'review', 'rating', 'reviewed_at', 'created_at', 'updated_at', 'buyer_id']);

        // リレーションとアクセサを使って整形されたデータを返す
        $formattedReviewedPurchases = $reviewedPurchases->map(function ($purchase) {
            $idea = $purchase->idea;

            return [
                'id' => $purchase->id,
                'idea_id' => $purchase->idea_id,
                'review' => $purchase->review,
                'rating' => $purchase->rating,
                'reviewed_at' => $purchase->reviewed_at,
                'created_at' => $purchase->created_at,
                'updated_at' => $purchase->updated_at,
                'buyer_id' => $purchase->buyer_id,
                'buyer_name' => $purchase->buyer->name,
                'idea' => [
                    'id' => $idea->id,
                    'category_id' => $idea->category_id,
                    'title' => $idea->title,
                    'overview' => $idea->overview,
                    'content' => $idea->content,
                    'price' => $idea->price,
                    'purchased' => $idea->purchased,
                    'created_at' => $idea->created_at,
                    'updated_at' => $idea->updated_at,
                    'average_rating' => $idea->average_rating,
                    'favorite_count' => $idea->favorite_count,
                    'purchase_count' => $idea->purchase_count,
                    'review_count' => $idea->review_count,
                ]
            ];
        });

        return response()->json($formattedReviewedPurchases);
    }


    /**
     * 購入を登録する
     *
     * @param  \App\Http\Requests\StorePurchaseRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StorePurchaseRequest $request)
    {
        
        $user = Auth::user();
        $ideaId = $request->idea_id;

        // 重複購入のチェック
        $existingPurchase = Purchase::where('idea_id', $ideaId)
            ->where('buyer_id', $user->id)
            ->first();
        if ($existingPurchase) {
            return response()->json(['error' => 'このアイデアは既に購入済みです。'], 400);
        }

        // 自身の投稿アイディアのチェック
        $idea = Idea::findOrFail($ideaId);
        if ($idea->user_id == $user->id) {
            return response()->json(['error' => '自分の投稿したアイディアは購入できません。'], 400);
        }

        // DB::beginTransaction();

        // try {
        //     // 購入レコードの作成
        //     $purchase = Purchase::create([
        //         'idea_id' => $ideaId,
        //         'buyer_id' => $user->id,
        //     ]);

        //     // アイディアの purchased を true に変更
        //     $idea->update(['purchased' => true]);

        //     // 購入後に投稿者へ通知
        //     $ideaOwner = User::find($idea->user_id);
        //     if ($ideaOwner) {
        //         Mail::to($ideaOwner->email)->send(new IdeaPurchased($idea, $user));
        //     }

        //     DB::commit();
        //     return response()->json($purchase, 201);
        // } catch (\Exception $e) {
        //     DB::rollback();
        //     return response()->json(['error' => '購入処理に失敗しました。', 'message' => $e->getMessage()], 500);
        // }

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

            // 購入後に投稿者へ通知
            $ideaOwner = User::find($idea->user_id);

                        //＊＊＊＊＊＊変更：ideaOwnerの情報をログに出力＊＊＊＊＊＊
                        Log::info('Idea Owner Details:', [
                            'id' => $ideaOwner->id,
                            'name' => $ideaOwner->name,
                            'email' => $ideaOwner->email,
                        ]);

            // if ($ideaOwner) {
            //     Mail::to($ideaOwner->email)->send(new IdeaPurchased($idea, $user));
            // }

            if ($ideaOwner) {
                try {
                    Mail::to($ideaOwner->email)->send(new IdeaPurchased($idea));
                } catch (\Exception $e) {
                    Log::error('Error sending email:', ['error' => $e->getMessage()]);
                }
            }

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
    // public function storeOrUpdateReview(Request $request, Purchase $purchase) // 統合: レビューを投稿または更新するメソッド
    // {
    //     $request->validate([
    //         'review' => 'required|string',
    //         'rating' => 'required|integer|min:1|max:5',
    //     ]);

    //     // 認証ユーザーが購入者かどうかを確認
    //     if ($purchase->buyer_id !== Auth::id()) {
    //         return response()->json(['error' => 'Unauthorized'], 403);
    //     }

    //     // レビューと評価の登録または更新
    //     $purchase->update([
    //         'review' => $request->review,
    //         'rating' => $request->rating,
    //         'reviewed_at' => now(),
    //     ]);

    //     return response()->json(['message' => 'レビューが投稿または更新されました', 'purchase' => $purchase], 201);
    // }
    /**
     * 自身の特定のレビューを取得する
     *
     * @param  int  $ideaId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMyReview($ideaId)
    {
        $user = Auth::user();
        $review = Purchase::where('idea_id', $ideaId)
            ->where('buyer_id', $user->id)
            ->first(['review', 'rating']);

        return response()->json(['review' => $review]);
    }

    /**
     * レビュー情報を投稿または更新する
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $ideaId
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeOrUpdateReview(Request $request, $ideaId)
    {
        $request->validate([
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $user = Auth::user();
        $purchase = Purchase::where('idea_id', $ideaId)
            ->where('buyer_id', $user->id)
            ->first();

        if (!$purchase) {
            return response()->json(['error' => '購入情報が見つかりません。'], 404);
        }

        // レビューと評価を新規作成または更新
        $purchase->update([
            'review' => $request->review,
            'rating' => $request->rating,
            'reviewed_at' => now(),
        ]);

        return response()->json(['message' => 'レビューが投稿または更新されました', 'purchase' => $purchase], 200);
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
