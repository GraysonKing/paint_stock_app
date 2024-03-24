import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import KanbanBoard from '@/Components/KanbanBoard';

export default function ManagePaints({ auth, paints }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Paints</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-4 px-2 sm:py-12">
                <div className="max-w-full overflow-x-auto">
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <KanbanBoard paintData={paints} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
