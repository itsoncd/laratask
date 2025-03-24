import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CalendarIcon, Check, Edit, Plus, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

interface TasksPageProps extends PageProps {
    tasks: Task[];
    message?: string;
}

export default function Index({ tasks, message }: TasksPageProps) {
    const handleDelete = (id: number) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
            router.delete(`/tareas/${id}`);
        }
    };

    const toggleComplete = (id: number, completed: boolean) => {
        router.put(`/tareas/${id}`, {
            completed: !completed,
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // hacer algo (o nada)
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Mis tareas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mis tareas</h1>
                        <Link href="/tareas/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Crear nueva tarea
                            </Button>
                        </Link>
                    </div>

                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                            {message}
                        </div>
                    )}

                    {tasks.length === 0 ? (
                        <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No tienes tareas</h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Comienza creando una nueva tarea con el botón de arriba.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {tasks.map((task) => (
                                <Card key={task.id} className={task.completed ? 'bg-gray-50 dark:bg-gray-800/50' : ''}>
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                                {task.title}
                                            </CardTitle>
                                            <div className="flex space-x-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => toggleComplete(task.id, task.completed)}
                                                    className={`h-8 w-8 ${task.completed ? 'bg-green-100 text-green-700' : ''}`}
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Link href={`/tareas/${task.id}/edit`}>
                                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => handleDelete(task.id)}
                                                    className="h-8 w-8 text-red-500 hover:text-white hover:bg-red-500"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <Badge variant={task.completed ? 'outline' : 'default'}>
                                                {task.completed ? 'Completada' : 'Pendiente'}
                                            </Badge>
                                            {task.due_date && (
                                                <Badge variant="secondary" className="flex items-center gap-1">
                                                    <CalendarIcon className="h-3 w-3" />
                                                    {format(new Date(task.due_date), 'PPP', { locale: es })}
                                                </Badge>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {task.description && <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
