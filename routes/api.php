<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\PostController;

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

// creating hotel api
Route::post('create-hotel', [HotelController::class, 'createHotel']);
Route::get('hotels', [HotelController::class, 'fetchHotel']);

// creating place api
Route::post('create-place', [PlaceController::class, 'createPlace']);
Route::get('places', [PlaceController::class, 'fetchPlace']);

//
Route::post('create-post',[PostController::class, 'createPost']);
Route::get('allPost', [PostController::class, 'allPost']);