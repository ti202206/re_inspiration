<?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
// // use App\Http\Controllers\Auth\LoginController;
// // use App\Http\Controllers\Auth\RegisterController;
// use App\Http\Controllers\FavoriteController;
// use App\Http\Controllers\IdeaController;
// use App\Http\Controllers\PurchaseController;
// use App\Http\Controllers\Auth\AuthenticatedSessionController;
// use App\Http\Controllers\Auth\RegisteredUserController;
// use App\Http\Controllers\CategoryController;

// /*
// |--------------------------------------------------------------------------
// | API Routes
// |--------------------------------------------------------------------------
// |
// | Here is where you can register API routes for your application. These
// | routes are loaded by the RouteServiceProvider within a group which
// | is assigned the "api" middleware group. Enjoy building your API!
// |
// */

// // Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
// //     return $request->user();
// // });

// // Route::get('/user', function (Request $request) {
// //     return $request->user();
// // })->name('user');

// // 認証ルート
// // Route::post('/register', [RegisterController::class, 'register']);
// // Route::post('login', [LoginController::class, 'login']);
// // Route::post('logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');;


// Route::post('/login', [AuthenticatedSessionController::class, 'store']);
// Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');
// Route::post('/register', [RegisteredUserController::class, 'store']);
// Route::get('/categories', [CategoryController::class, 'index']); //カテゴリー情報を取得
//     //userへのルート
//     // Route::get('/user', [LoginController::class, 'user'])->middleware('auth:sanctum');
// Route::group(['middleware'=>'auth:sanctum'],function(){
//     // Ideaへのルート
//     Route::get('/ideas', [IdeaController::class, 'index'])->name('ideas.index');
//     Route::get('/my-ideas', [IdeaController::class, 'myIdeas'])->name('ideas.my-ideas');
//     Route::post('/ideas', [IdeaController::class, 'store'])->name('ideas.store');
//     Route::get('/ideas/{idea}', [IdeaController::class, 'show'])->name('ideas.show');
//     Route::put('/ideas/{idea}', [IdeaController::class, 'update'])->name('ideas.update');
//     Route::delete('/ideas/{idea}', [IdeaController::class, 'destroy'])->name('ideas.destroy');

//     // Favoriteへのルート
//     Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
//     Route::post('/favorites/toggle', [FavoriteController::class, 'toggleFavorite'])->name('favorites.toggle');

//     // Purchaseのルート
//     Route::post('/purchases', [PurchaseController::class, 'store'])->name('purchases.store');
//     Route::get('/mypurchases', [PurchaseController::class, 'myPurchases'])->name('purchases.index');
//     Route::patch('/purchases/{purchase}', [PurchaseController::class, 'update'])->name('purchases.update');
    
//     // レビューに関するルート
//     Route::get('/reviewed-purchases', [PurchaseController::class, 'myReviewedPurchases'])->name('purchases.reviewed');
//     Route::get('/reviews', [PurchaseController::class, 'allReviews'])->name('reviews.index');
//     Route::post('/reviews/{purchase}', [PurchaseController::class, 'storeOrUpdateReview'])->name('reviews.storeOrUpdate');
    
//     //認証されたユーザー情報の取得
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });
// });



use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CategoryController;

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
    Route::get('/reviewed-purchases', [PurchaseController::class, 'myReviewedPurchases'])->name('purchases.reviewed');
    Route::get('/reviews', [PurchaseController::class, 'allReviews'])->name('reviews.index');
    
    // レビューを投稿および更新するルート
    Route::post('/reviews/{purchase}', [PurchaseController::class, 'storeOrUpdateReview'])->name('reviews.storeOrUpdate');
    
    // 認証されたユーザー情報の取得
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
