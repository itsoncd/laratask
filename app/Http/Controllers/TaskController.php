<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(): Response
    {
        $tasks = auth()->user()->tasks()->latest()->get();

        return Inertia::render('tareas/index', [
            'tasks' => $tasks,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('tareas/create');
    }

    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $request->user()->tasks()->create($request->validated());

        return redirect()->route('tareas.index')->with('message', 'Tarea creada correctamente');
    }

    public function show(Task $tarea): Response
    {
        if (auth()->id() !== $tarea->user_id) {
            abort(403);
        }

        return Inertia::render('tareas/show', [
            'task' => $tarea,
        ]);
    }

    public function edit(Task $tarea): Response
    {
        return Inertia::render('tareas/edit', [
            'task' => $tarea,
        ]);
    }

    public function update(UpdateTaskRequest $request, Task $tarea): RedirectResponse
    {
        $tarea->update($request->validated());

        return redirect()->route('tareas.index')->with('message', 'Tarea actualizada correctamente');
    }

    public function destroy(Task $tarea): RedirectResponse
    {
        $tarea->delete();

        return redirect()->route('tareas.index')->with('message', 'Tarea eliminada correctamente');
    }
}
