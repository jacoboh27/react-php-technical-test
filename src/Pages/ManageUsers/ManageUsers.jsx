import Layout from '../../Components/Layout';
import axios from "axios";
import { useEffect, useState } from "react";
import { UserList } from '../../Components/UserList/UserList.jsx';
import { UserListItem } from '../../Components/UserListItem/UserListItem.jsx';

function ManageUsers() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/users/').then(function(response) {
            console.log(response.data);
            setUsers(response.data);
        });
    }

    return (
        <Layout className='bg-red-100'>
            <div className="relative flex justify-center w-80 items-center mb-6">
                <h2 className='font-medium text-2xl mt-10'>Lista de usuarios</h2>
            </div>
            <UserList
                list={users}
            >               
                {item => (
                    <UserListItem 
                        id={item.id}
                        name={item.name}
                        lastName={item.last_name}
                        email={item.email}
                        phoneNumber={item.phone_number}
                        address={item.address}
                        createdAd={item.created_ad}
                    />
                )}
            </UserList>
        </Layout>
    )
  }
  
export {ManageUsers};