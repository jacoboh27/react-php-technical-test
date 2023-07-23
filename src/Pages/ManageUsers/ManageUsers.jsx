import Layout from '../../Components/Layout';
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { UserList } from '../../Components/UserList/UserList.jsx';
import { UserListItem } from '../../Components/UserListItem/UserListItem.jsx';
import swal from 'sweetalert';

function ManageUsers() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users/').then(function(response) {
            setUsers(response.data);
        });
    }

    const deleteUser = (id) => {
        swal({
            title: "Confirmación",
            text: "¿Estás seguro que deseas eliminar el usuario?",
            icon: "warning",
            buttons: ["Cancelar", "Confirmar"],
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`http://localhost:80/api/user/${id}/delete`).then(function(response){
                    if (response.data.status == 1) {
                        toast.success("¡El usuario se ha eliminado con éxito!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    } else {
                        toast.warning("No fue posible eliminar el usuario :(", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    getUsers();
                });
            }
        });
        
    }

    return (
        <Layout className='bg-red-100'>
            <div className="relative flex justify-center w-80 items-center mb-6">
                <h2 className='font-medium text-2xl'>Lista de usuarios</h2>
            </div>
            <UserList
                list={users}
            >               
                {(item) => (
                    <UserListItem
                        key={item.id} 
                        id={item.id}
                        name={item.name}
                        lastName={item.last_name}
                        email={item.email}
                        phoneNumber={item.phone_number}
                        address={item.address}
                        createdAd={item.created_ad}
                        onDeleteUser={() => deleteUser(item.id)}
                    />
                )}
            </UserList>
        </Layout>
    )
  }
  
export {ManageUsers};