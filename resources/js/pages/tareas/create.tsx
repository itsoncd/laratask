import React, { FormEventHandler, useState } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function Create({ errors }: PageProps<{}>) {
    const [values, setValues] = useState({
        title: '',
        description: '',
        due_date: '',
        completed: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const key = e.target.id;
        const value = e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        setValues(values => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post('/tareas', values);
    };

    return (
        <AppLayout>
            <Head title="Crear tarea" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/tareas" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver a la lista de tareas
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Crear nueva tarea</CardTitle>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Título</Label>
                                    <Input
                                        id="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-600">{errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea
                                        id="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="due_date" className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Fecha límite
                                    </Label>
                                    <Input
                                        id="due_date"
                                        type="datetime-local"
                                        value={values.due_date}
                                        onChange={handleChange}
                                    />
                                    {errors.due_date && (
                                        <p className="text-sm text-red-600">{errors.due_date}</p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-2">
                                <Link href="/tareas">
                                    <Button variant="outline" type="button">Cancelar</Button>
                                </Link>
                                <Button type="submit">Guardar tarea</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
