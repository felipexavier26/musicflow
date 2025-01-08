<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MusicaController;

Route::get('/musicas', [MusicaController::class, 'index']);
Route::get('/musicas/{musica}', [MusicaController::class, 'show']);
Route::post('/musicas', [MusicaController::class, 'store']);
Route::put('/musicas/{id}', [MusicaController::class, 'update']);
Route::delete('/musicas/{id}', [MusicaController::class, 'destroy']);
