import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Link, router } from '@inertiajs/react';

export default function TasksTable({
    tasks,
    queryParams,
    searchFieldChanged,
    onKeyPress,
    sortChanged,
    hideTaskColumn = false }) {
    const deleteTask = (id) => {
        if (!window.confirm('Do you want to delete this task?')) {
            return;
        }

        router.delete(route('task.destroy', id))
    }
    return (
        <>
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-ts text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name='id'
                                onClickHandler={sortChanged}
                                sortable
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >ID</TableHeading>
                            <TableHeading
                                name='image'
                                sortable={false}
                            >Image</TableHeading>
                            {!hideTaskColumn && (<TableHeading
                                name='task_name'
                                sortable={false}
                            >Task Name</TableHeading>)}
                            <TableHeading
                                name='name'
                                onClickHandler={sortChanged}
                                sortable
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >Name</TableHeading>
                            <TableHeading
                                name='status'
                                onClickHandler={sortChanged}
                                sortable
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >Status</TableHeading>
                            <TableHeading
                                name='priority'
                                onClickHandler={sortChanged}
                                sortable
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >Priority</TableHeading>
                            <TableHeading
                                name='created_at'
                                onClickHandler={sortChanged}
                                sortable
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >Created At</TableHeading>
                            <TableHeading
                                name='due_date'
                                onClickHandler={sortChanged}
                                sortable
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                            >Due Date</TableHeading>
                            <TableHeading
                                name='created_by'
                                sortable={false}
                            >Created By</TableHeading>
                            <TableHeading
                                name='action'
                                sortable={false}
                                additional_styles='text-right'
                            >Actions</TableHeading>
                        </tr>
                    </thead>
                    <thead className="text-ts text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            {!hideTaskColumn && (<th className="px-3 py-3"></th>)}
                            <th className="px-3 py-3">
                                <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="Project Name"
                                    onBlur={e => searchFieldChanged("name", e.target.value)}
                                    onKeyPress={e => onKeyPress('name', e)}
                                />
                            </th>
                            <th className="px-3 py-3">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={e => searchFieldChanged("status", e.target.value)} >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.priority}
                                    onChange={e => searchFieldChanged("priority", e.target.value)} >
                                    <option value="">Select Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                            <th className="px-3 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.data.map(task => (
                            <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-3 py-2">{task.id}</td>
                                <td className="px-3 py-2">
                                    <img src={task.image_path} style={{ width: 60 }} />
                                </td>
                                {!hideTaskColumn && (<td className="px-3 py-2">{task.project.name}</td>)}
                                <td className="px-3 py-2">{task.name}</td>
                                <td className="px-3 py-2">
                                    <span className={
                                        "px-3 py-1 rounded text-white " +
                                        TASK_STATUS_CLASS_MAP[task.status]
                                    }>
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </td>
                                <td className="px-3 py-2">
                                    <span className={
                                        "px-3 py-1 rounded text-white " +
                                        TASK_PRIORITY_CLASS_MAP[task.priority]
                                    }>
                                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                                <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                <td className="px-3 py-2">{task.createdBy.name}</td>
                                <td className="px-3 py-2 text-nowrap text-right">
                                    <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1" href={route('task.edit', task.id)}>
                                        Edit
                                    </Link>
                                    <button
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                        onClick={e => deleteTask(task.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination links={tasks.meta.links} />
        </>
    )
}
