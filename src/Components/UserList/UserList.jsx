const UserList = ({ list }) => {

    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Número telefonico
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
                    {list.map(props.render)}
                </tbody>
            </table>
        </div>
    );
}

export {UserList};