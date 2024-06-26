<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\Cors;

// // 認証なしでアクセス可能なルート
// Route::post('/login', [AuthenticatedSessionController::class, 'store']);
// Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
// Route::post('/register', [RegisteredUserController::class, 'store']);
// Route::get('/categories', [CategoryController::class, 'index']);

// // すべてのルートでOPTIONSメソッドを許可
// Route::options('{any}', function () {
//     return response()->json([], 200);
// })->where('any', '.*');


// Route::group(['middleware' => 'auth:sanctum'], function () {
//     // Idea関連のルート
//     Route::get('/ideas', [IdeaController::class, 'index'])->name('ideas.index');
//     Route::get('/my-ideas', [IdeaController::class, 'myIdeas'])->name('ideas.my-ideas');
//     Route::post('/ideas', [IdeaController::class, 'store'])->name('ideas.store');
//     Route::get('/ideas/{idea}', [IdeaController::class, 'show'])->name('ideas.show');
//     Route::put('/ideas/{idea}', [IdeaController::class, 'update'])->name('ideas.update');
//     Route::delete('/ideas/{idea}', [IdeaController::class, 'destroy'])->name('ideas.destroy');

//     // Favorite関連のルート
//     Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
//     Route::post('/favorites/toggle', [FavoriteController::class, 'toggleFavorite'])->name('favorites.toggle');
//     Route::get('/favorites/idea/{idea_id}', [FavoriteController::class, 'getFavoriteByIdeaId']);

//     // Purchase関連のルート
//     Route::post('/purchases', [PurchaseController::class, 'store'])->name('purchases.store');
//     Route::get('/mypurchases', [PurchaseController::class, 'myPurchases'])->name('purchases.index');
//     Route::get('/purchases/{id}', [PurchaseController::class, 'show'])->name('purchases.show');
//     Route::get('/reviewed-purchases', [PurchaseController::class, 'myReviewedPurchases'])->name('purchases.reviewed');
//     Route::get('/reviews', [PurchaseController::class, 'allReviews'])->name('reviews.index');
//     Route::put('/reviews/{ideaId}', [PurchaseController::class, 'storeOrUpdateReview'])->name('reviews.storeOrUpdate');
//     Route::get('/reviews/{ideaId}/my-review', [PurchaseController::class, 'getMyReview'])->name('reviews.MyReview');

//     // profile関連のルート
//     Route::get('/user', [ProfileController::class, 'getUser']);
//     Route::post('/profile/image', [ProfileController::class, 'updateProfileImage']);
//     Route::post('/profile/update', [ProfileController::class, 'updateProfile']);
//     Route::delete('/profile', [ProfileController::class, 'deleteAccount']);

//     //他のユーザーの情報を取得するルート
//     Route::get('/user/{usrId}', [ProfileController::class, 'showUserProfile']);
// });

// CORSミドルウェアをグローバルに適用
Route::middleware([Cors::class])->group(function () {
    // 認証なしでアクセス可能なルート
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::get('/categories', [CategoryController::class, 'index']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        // Idea関連のルート
        Route::get('/ideas', [IdeaController::class, 'index'])->name('ideas.index');
        Route::get('/my-ideas', [IdeaController::class, 'myIdeas'])->name('ideas.my-ideas');
        Route::post('/ideas', [IdeaController::class, 'store'])->name('ideas.store');
        Route::get('/ideas/{idea}', [IdeaController::class, 'show'])->name('ideas.show');
        Route::put('/ideas/{idea}', [IdeaController::class, 'update'])->name('ideas.update');
        Route::delete('/ideas/{idea}', [IdeaController::class, 'destroy'])->name('ideas.destroy');

        // Favorite関連のルート
        Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
        Route::post('/favorites/toggle', [FavoriteController::class, 'toggleFavorite'])->name('favorites.toggle');
        Route::get('/favorites/idea/{idea_id}', [FavoriteController::class, 'getFavoriteByIdeaId']);

        // Purchase関連のルート
        Route::post('/purchases', [PurchaseController::class, 'store'])->name('purchases.store');
        Route::get('/mypurchases', [PurchaseController::class, 'myPurchases'])->name('purchases.index');
        Route::get('/purchases/{id}', [PurchaseController::class, 'show'])->name('purchases.show');
        Route::get('/reviewed-purchases', [PurchaseController::class, 'myReviewedPurchases'])->name('purchases.reviewed');
        Route::get('/reviews', [PurchaseController::class, 'allReviews'])->name('reviews.index');
        Route::put('/reviews/{ideaId}', [PurchaseController::class, 'storeOrUpdateReview'])->name('reviews.storeOrUpdate');
        Route::get('/reviews/{ideaId}/my-review', [PurchaseController::class, 'getMyReview'])->name('reviews.MyReview');

        // profile関連のルート
        Route::get('/user', [ProfileController::class, 'getUser']);
        Route::post('/profile/image', [ProfileController::class, 'updateProfileImage']);
        Route::post('/profile/update', [ProfileController::class, 'updateProfile']);
        Route::delete('/profile', [ProfileController::class, 'deleteAccount']);

        //他のユーザーの情報を取得するルート
        Route::get('/user/{usrId}', [ProfileController::class, 'showUserProfile']);
    });
});
