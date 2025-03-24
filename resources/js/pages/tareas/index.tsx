import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function index() {
    return (
        <AppLayout>
            <Head title="Lista de tareas " />
            <div>
                Lista de tareas estará aquí.
            </div>
        </AppLayout>
    );
}
