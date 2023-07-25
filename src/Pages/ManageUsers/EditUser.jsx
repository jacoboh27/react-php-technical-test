import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import Layout from '../../Components/Layout';

function EditUser() {
    const form = useRef(null);

    const [inputs, setInputs] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`${import.meta.env.VITE_API_URL}/user/${id}`).then(function(response) {
            setInputs(response.data);
        });
    }

    const editAnAccount = () => {
		const formData = new FormData(form.current);
		const data = {
            id: id,
			name: formData.get('name'),
			lastName: formData.get('last-name'),
			email: formData.get('email'),
			phoneNumber: formData.get('phone-number'),
			address: formData.get('address'),
		}
        axios.put(`${import.meta.env.VITE_API_URL}/user/${id}/edit`, data).then(function(response){
            if (response.data.status == 1) {
                toast.success("¡Los datos del usuario se han editado con éxito!", {
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
                toast.warning("No fue posible editar los datos del usuario :(", {
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
        });
	}

    return (
        <Layout>
            <h1 className="font-medium text-xl text-center mb-6 w-80">Editar usuario</h1>
            <form ref={form} className='flex flex-col gap-4 w-80'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="name" className='font-light text-sm'>Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={inputs.name}
                        className='rounded-lg border border-black placeholder:font-light
                        placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="lastName" className='font-light text-sm'>Apellidos:</label>
                    <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        defaultValue={inputs.last_name}
                        className='rounded-lg border border-black placeholder:font-light
                        placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-light text-sm'>Correo electrónico:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={inputs.email}
                        className='rounded-lg border border-black
                        placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="phoneNumber" className='font-light text-sm'>Número telenófico:</label>
                    <input
                        type="tel"
                        id="phone-number"
                        name="phone-number"
                        defaultValue={inputs.phone_number}
                        className='rounded-lg border border-black
                        placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="address" className='font-light text-sm'>Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        defaultValue={inputs.address}
                        className='rounded-lg border border-black
                        placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                    />
                </div>
                <Link to="/manage-users">
                    <button
                        className='bg-black text-white w-full rounded-lg py-3 mt-1'
                        onClick={() => editAnAccount()}>
                        Editar
                    </button>
                </Link>
            </form>
        </Layout>
    )
  }
  
export {EditUser};