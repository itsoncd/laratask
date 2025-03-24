import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarIcon, Edit } from 'lucide-react';
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

interface ShowPageProps {
    task: Task;
}

export default function Show({ task }: PageProps<ShowPageProps>) {
    return (
        <AppLayout>
            <Head title={task.title} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/tareas" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a la lista de tareas
                        </Link>
                    </div>

                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">{task.title}</CardTitle>
                                    <div className="flex items-center space-x-2 mt-2">
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
                                </div>
                                <Link href={`/tareas/${task.id}/edit`}>
                                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                                        <Edit className="h-4 w-4" />
                                        Editar
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {task.description ? (
                                <div className="prose dark:prose-invert max-w-none">
                                    <p>{task.description}</p>
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 italic">Sin descripción</p>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="block text-gray-500 dark:text-gray-400">Creada el</span>
                                        <span>{format(new Date(task.created_at), 'PPpp', { locale: es })}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 dark:text-gray-400">Última actualización</span>
                                        <span>{format(new Date(task.updated_at), 'PPpp', { locale: es })}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Link href="/tareas">
                                <Button variant="outline">Volver</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
