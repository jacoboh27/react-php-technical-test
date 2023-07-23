import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/24/solid';

const UserListItem = ({id, name, lastName, email, phoneNumber, address, createdAt}) => {
    return (
        <tr key={id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {name}
            </th>
            <td className="px-6 py-4">
                {lastName}
            </td>
            <td className="px-6 py-4">
                {email}
            </td>
            <td className="px-6 py-4">
                {phoneNumber}
            </td>
            <td className="px-6 py-4">
                {address}
            </td>
            <td className="px-6 py-4">
                {createdAt}
            </td>
            <td className="px-6 py-4">
                <PencilSquareIcon className='h-6 w-6 cursor-pointer' />
            </td>
            <td className="px-6 py-4">
                <TrashIcon className='h-6 w-6 cursor-pointer' />
            </td>
        </tr>
    );
}

export {UserListItem};