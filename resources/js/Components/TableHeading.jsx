import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

export default function TableHeading({ name, onClickHandler = () => { }, sortable, sort_field, children, sort_direction, additional_styles }) {
    return (
        <th onClick={(e) => onClickHandler(name)}>
            <div className={"px-3 py-3 " + (additional_styles ? additional_styles + " " : "") + (sortable ? "flex items-center justify-between gap-1 cursor-pointer " : "")}>
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={"w-4 " + (sort_field == name && sort_direction == 'asc' ? 'text-white ' : '')} />
                        <ChevronDownIcon className={"w-4 -mt-2 " + (sort_field == name && sort_direction == 'desc' ? 'text-white ' : '')} />
                    </div>
                )}
            </div>
        </th>
    )
}
