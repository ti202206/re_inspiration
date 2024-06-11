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

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::get('/categories', [CategoryController::class, 'index']); //カテゴリー情報を取得

Route::group(['middleware' => 'auth:sanctum'], function() {
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

    // Purchase関連のルート
    Route::post('/purchases', [PurchaseController::class, 'store'])->name('purchases.store');
    Route::get('/mypurchases', [PurchaseController::class, 'myPurchases'])->name('purchases.index');
    Route::get('/purchases/{id}', [PurchaseController::class, 'show'])->name('purchases.show');
    Route::get('/reviewed-purchases', [PurchaseController::class, 'myReviewedPurchases'])->name('purchases.reviewed');
    Route::get('/reviews', [PurchaseController::class, 'allReviews'])->name('reviews.index');
    Route::post('/reviews/{purchase}', [PurchaseController::class, 'storeOrUpdateReview'])->name('reviews.storeOrUpdate');
    
        // profile関連のルート
        Route::get('/user', [ProfileController::class, 'getUser']);
        Route::post('/profile/image', [ProfileController::class, 'updateProfileImage']);


    // 認証されたユーザー情報の取得
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });



});
