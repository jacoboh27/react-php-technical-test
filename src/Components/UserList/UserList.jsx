import PropTypes from 'prop-types';

const UserList = ({ list, children }) => {

    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mb-10'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">  
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Apellidos
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Correo electrónico
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Número telefónico
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Dirección
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fecha de Creación
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Editar
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list.map(children)}
                </tbody>
            </table>
        </div>
    );
}

UserList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.any.isRequired
};

export {UserList};