<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard with task statistics
    Route::get('dashboard', function () {
        $user = auth()->user();
        $recentTasks = $user->tasks()->latest()->take(5)->get();

        $stats = [
            'totalTasks' => $user->tasks()->count(),
            'completedTasks' => $user->tasks()->where('completed', true)->count(),
            'pendingTasks' => $user->tasks()->where('completed', false)->count(),
        ];

        return Inertia::render('dashboard', [
            'recentTasks' => $recentTasks,
            'stats' => $stats,
        ]);
    })->name('dashboard');

    // Task routes
    Route::resource('tareas', TaskController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
