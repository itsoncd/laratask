import React from 'react';
import { HomeIcon, Settings2, ListTodo } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';

export default function NavMain() {
    const { url } = usePage();

    const isActive = (path: string) => {
        return url.startsWith(path);
    };

    return (
        <nav className="w-full" aria-label="Main">
            <p className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-4 mb-2">Menu</p>

            <ul className="grid gap-1 px-2">
                <li>
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive('/dashboard')
                                ? 'bg-accent text-foreground'
                                : 'hover:bg-muted text-muted-foreground'
                        }`}
                    >
                        <HomeIcon className="h-4 w-4" />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        href="/tareas"
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive('/tareas')
                                ? 'bg-accent text-foreground'
                                : 'hover:bg-muted text-muted-foreground'
                        }`}
                    >
                        <ListTodo className="h-4 w-4" />
                        Mis tareas
                    </Link>
                </li>
                <li>
                    <Link
                        href="/settings/profile"
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive('/settings')
                                ? 'bg-accent text-foreground'
                                : 'hover:bg-muted text-muted-foreground'
                        }`}
                    >
                        <Settings2 className="h-4 w-4" />
                        Ajustes
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
