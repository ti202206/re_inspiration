<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->name('user');

Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout']);
Route::post('/register', [RegisterController::class, 'register']);
//userへのルート
// Route::get('/user', [LoginController::class, 'user'])->middleware('auth:sanctum');
Route::group(['middleware'=>'auth:sanctum'],function(){
    // Ideaへのルート
    Route::get('/ideas', [IdeaController::class, 'index'])->name('ideas.index');
    Route::get('/my-ideas', [IdeaController::class, 'myIdeas'])->name('ideas.my-ideas');
    Route::post('/ideas', [IdeaController::class, 'store'])->name('ideas.store');
    Route::get('/ideas/{idea}', [IdeaController::class, 'show'])->name('ideas.show');
    Route::put('/ideas/{idea}', [IdeaController::class, 'update'])->name('ideas.update');
    Route::delete('/ideas/{idea}', [IdeaController::class, 'destroy'])->name('ideas.destroy');

    // Favoriteへのルート
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('/favorites/toggle', [FavoriteController::class, 'toggleFavorite'])->name('favorites.toggle');

    // Purchaseのルート
    Route::post('/purchases', [PurchaseController::class, 'store'])->name('purchases.store');
    Route::get('/purchases', [PurchaseController::class, 'myPurchases'])->name('purchases.index');
    Route::get('/reviewed-purchases', [PurchaseController::class, 'myReviewedPurchases'])->name('purchases.reviewed');
    Route::get('/reviews', [PurchaseController::class, 'allReviews'])->name('reviews.index');
    Route::patch('/purchases/{purchase}', [PurchaseController::class, 'update'])->name('purchases.update');
    
    Route::get('user', function (Request $request) {
        return $request->user();
    });
});