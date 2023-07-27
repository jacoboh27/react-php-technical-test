import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Layout from '../../Components/Layout'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

function SignUp() {
    const form = useRef(null);
    const navigateTo = useNavigate();
    const [showPassword, setShowPassword ] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const createAnAccount = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const data = {
            name: formData.get('name'),
            lastName: formData.get('last-name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        }
        if (data.confirmPassword == data.password) {
            axios.post(`${import.meta.env.VITE_API_URL}/user/save`, data).then(function(response){
                if (response.data.status == 2) {
                    toast.warning("¡Este correo ya está asociado a una cuenta existente!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else if (response.data.status == 1) {
                    toast.success("¡Tu cuenta se ha creado con éxito, ahora puedes iniciar sesión!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    navigateTo("/sign-in");
                } else {
                    toast.error("No se pudo crear tu cuenta :(", {
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
        } else {
            toast.error("Las contraseñas no coinciden :(", {
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
	}

  return (
    <Layout>
        <h1 className="font-medium text-xl text-center mb-6 w-80">Crea tu cuenta</h1>
        <form onSubmit={createAnAccount} ref={form} method="post" className='flex flex-col gap-4 w-80'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name" className='font-light text-sm'>Nombre(s):</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className='rounded-lg border border-black placeholder:font-light
                    placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name" className='font-light text-sm'>Apellidos:</label>
                <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    required
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
                    required
                    className='rounded-lg border border-black
                    placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                />
            </div>
            <div className='relative flex flex-col gap-1'>
                <label htmlFor="password" className='font-light text-sm'>Contraseña:</label>
                <input
                    type={ showPassword ? "text" : "password" }
                    id="password"
                    name="password"
                    required
                    className='rounded-lg border border-black
                    placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                />
                <div className='absolute cursor-pointer bottom-2 right-3' onClick={() => setShowPassword(!showPassword)}>
                    { showPassword ? 
                    <EyeIcon className='h-6 w-6'  stroke="currentColor"/>
                    : 
                    <EyeSlashIcon className='h-6 w-6'   stroke="currentColor"/>
                    }
                </div>
            </div>
            <div className='relative flex flex-col gap-1'>
                <label htmlFor="confirmPassword" className='font-light text-sm'>Confirmar contraseña:</label>
                <input
                    type={ showConfirmPassword ? "text" : "password" }
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className='rounded-lg border border-black
                    placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                />
                <div className='absolute cursor-pointer bottom-2 right-3' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    { showConfirmPassword ? 
                    <EyeIcon className='h-6 w-6'  stroke="currentColor"/>
                    : 
                    <EyeSlashIcon className='h-6 w-6'   stroke="currentColor"/>
                    }
                </div>
            </div>
            <button
                type="submit"
                className='bg-black text-white w-full rounded-lg py-3 mt-1'>
                Crear cuenta
            </button>
        </form>

        <div className='flex flex-col w-80'>
            <p className='text-center font-light text-xs mt-10'>¿Ya tienes una cuenta?</p>
            <Link to='/sign-in'>
            <button
                className='w-full border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-2 py-3'
            >
                Iniciar sesión
            </button>
            </Link>
        </div>
    </Layout>
  )
}

export default SignUp