import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps, BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CheckCircle, Clock, ListTodo, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Task {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    due_date: string | null;
}

interface DashboardProps {
    recentTasks: Task[];
    stats: {
        totalTasks: number;
        completedTasks: number;
        pendingTasks: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ recentTasks, stats }: PageProps<DashboardProps>) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total de tareas</CardTitle>
                            <ListTodo className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalTasks}</div>
                            <p className="text-xs text-muted-foreground">Tareas creadas</p>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tareas completadas</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completedTasks}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.totalTasks > 0
                                    ? `${Math.round((stats.completedTasks / stats.totalTasks) * 100)}% del total`
                                    : 'Sin tareas'}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-sidebar-border/70 dark:border-sidebar-border rounded-xl">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Tareas pendientes</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
                            <p className="text-xs text-muted-foreground">Por completar</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-sidebar-border/70 dark:border-sidebar-border flex-1 rounded-xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Tareas recientes</CardTitle>
                            <CardDescription>Tus últimas tareas creadas</CardDescription>
                        </div>
                        <Link href="/tareas/create">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Crear nueva tarea
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {recentTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                    <ListTodo className="h-6 w-6 text-gray-400" />
                                </div>
                                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No tienes tareas</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Comienza creando una nueva tarea con el botón de arriba.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`h-2.5 w-2.5 rounded-full ${
                                                    task.completed ? 'bg-green-500' : 'bg-amber-500'
                                                }`}
                                            />
                                            <div>
                                                <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                                    {task.title}
                                                </h3>
                                                {task.due_date && (
                                                    <div className="flex items-center text-xs text-gray-500">
                                                        <CalendarIcon className="mr-1 h-3 w-3" />
                                                        {format(new Date(task.due_date), 'd MMM yyyy', { locale: es })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={task.completed ? 'outline' : 'default'}>
                                                {task.completed ? 'Completada' : 'Pendiente'}
                                            </Badge>
                                            <Link href={`/tareas/${task.id}`} className="w-auto">
                                                <Button variant="ghost" size="sm">
                                                    Ver
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-center w-full">
                            <Link href="/tareas">
                                <Button variant="outline">Ver todas las tareas</Button>
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
