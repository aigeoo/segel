<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/documents', [DocumentController::class, 'index'])->name('documents.index')->middleware(['auth']);

Route::post('/documents', [DocumentController::class, 'store'])->name('documents.store')->middleware(['auth']);

Route::delete('/documents/{id}', [DocumentController::class, 'destroy'])->name('documents.destroy')->middleware(['auth']);

Route::get('/documents/{id}/download', [DocumentController::class, 'download'])->name('documents.download')->middleware(['auth']);


Route::resource('users', UserController::class)->middleware(['auth']);
Route::resource('industries', IndustryController::class)->middleware(['auth']);
Route::resource('companies', CompanyController::class)->middleware(['auth']);
Route::resource('tasks', TaskController::class)->middleware(['auth']);
Route::resource('events', EventController::class)->middleware(['auth']);
Route::resource('deals', DealController::class)->middleware(['auth']);
Route::resource('contacts', ContactController::class)->middleware(['auth']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
