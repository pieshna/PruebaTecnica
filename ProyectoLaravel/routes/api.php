<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ReportesController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(UsuarioController::class)->group(function () {
        Route::get('usuario',  'index');
        Route::post('register',  'store')->withoutMiddleware('auth:sanctum');
        Route::post('login',  'login')->withoutMiddleware('auth:sanctum');
        Route::get('usuario/{id}',  'show');
        Route::put('usuario/change/{id}',  'changeStatus');
        Route::put('usuario/{id}',  'update');
        Route::delete('usuario/{id}',  'destroy');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(ReportesController::class)->group(function () {
        Route::get('reportes',  'index');
        Route::post('reportes',  'store');
        Route::get('reportes/{id}',  'show');
        Route::put('reportes/change/{id}',  'changeStatus');
        Route::put('reportes/{id}',  'update');
        Route::delete('reportes/{id}',  'destroy');
    });
});
