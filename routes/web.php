<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MusicaController;
use App\Http\Controllers\Admin\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rota pública para login
Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');

Route::redirect('/', '/login');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/musicas', [MusicaController::class, 'index'])->name('musicas.index');
});



Route::prefix('admin')->group(function (){
    Route::get('/login', [LoginController::class, 'showLoginForm'])->name('admin.login')->middleware();
    Route::post('/login', [LoginController::class, 'login'])->name('admin.login.submit');
    Route::get('/admin', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/sugestoes', [MusicaController::class, 'sugestoes'])->name('sugestoes.index');
    Route::put('/musica/{id}/approve', [MusicaController::class, 'approve'])->name('musica.approve');
    Route::put('/musica/{id}/disapprove', [MusicaController::class, 'disapprove'])->name('musica.disapprove');
    Route::get('/index', [MusicaController::class, 'admiindex'])->name('admin.index');
    Route::get('/create', [MusicaController::class, 'admicreate'])->name('admin.create');
    Route::get('/dashboard', [MusicaController::class, 'admindashboard'])->name('admin.dashboard');
    Route::get('/edit/{musica}', [MusicaController::class, 'edit'])->name('admin.edit');
    Route::get('/musicas/{id}/edit', [MusicaController::class, 'update']);
    Route::get('/view/{id}', [MusicaController::class, 'show'])->name('admin.show');
    Route::delete('songs/{id}', [MusicaController::class, 'destroy'])->name('id.destroy');
});

require __DIR__ . '/auth.php';
