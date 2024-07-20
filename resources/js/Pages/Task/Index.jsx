import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router, Link } from '@inertiajs/react';
import TasksTable from "./TasksTable";


export default function Index({ auth, tasks, queryParams = null, success = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("task.index"), queryParams);
    }

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    }

    const sortChanged = (name) => {
        if (queryParams.sort_field == name) {
            queryParams.sort_direction = queryParams.sort_direction == 'asc' ? 'desc' : 'asc';
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route("task.index"), queryParams);
    }
    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>
                    <Link href={route('task.create')} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600" >Add Task</Link>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {success && (<div className="bg-emerald-500 py-2 px-4 text-white mb-4 rounded">
                        {success}
                    </div>)}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable
                                tasks={tasks}
                                queryParams={queryParams}
                                searchFieldChanged={searchFieldChanged}
                                onKeyPress={onKeyPress}
                                sortChanged={sortChanged}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated >
    )
}
