<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\PostController;
use App\Models\PostComment;
use PHPUnit\Framework\Attributes\PostCondition;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

// Protected routes
Route::middleware(['api', 'auth:api'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('profile', [AuthController::class, 'profile']);
    Route::post('me', [AuthController::class, 'me']);
});

// all hotel related api
Route::post('create-hotel', [HotelController::class, 'createHotel']);
Route::get('hotels', [HotelController::class, 'fetchHotel']);
Route::post('update-hotels', [HotelController::class, 'updateHotel']);
Route::get('delete-hotels', [HotelController::class, 'deleteHotel']);

// all place related api
Route::post('create-place', [PlaceController::class, 'createPlace']);
Route::get('places', [PlaceController::class, 'fetchPlace']);
Route::get('update-places', [PlaceController::class, 'updatePlace']);
Route::get('delete-places', [PlaceController::class, 'deletePlace']);

// all post related api
Route::post('create-post',[PostController::class, 'createPost']);
Route::get('allPost', [PostController::class, 'allPost']);
Route::get('update-Post', [PostController::class, 'updatePost']);
Route::get('delete-Post', [PostController::class, 'deletePost']);

// all comment related api
Route::post('create-comment', [PostController::class, 'createComment']);
Route::get('comments', [PostController::class, 'allComments']);