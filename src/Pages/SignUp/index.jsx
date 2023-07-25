import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Layout from '../../Components/Layout'

function SignUp() {
    const form = useRef(null);
    const navigateTo = useNavigate();

    const createAnAccount = () => {
		const formData = new FormData(form.current);
		const data = {
			name: formData.get('name'),
			lastName: formData.get('last-name'),
			email: formData.get('email'),
			password: formData.get('password')
		}
        if (data.name !== '' && data.lastName !== '' && data.email !== '' && data.password !== '') {
            axios.post(`${import.meta.env.VITE_API_URL}/user/save`, data).then(function(response){
                if (response.data.status == 1) {
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
                } else {
                    toast.warning("No se pudo crear tu cuenta :(", {
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
            navigateTo("/sign-in");
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
                    placeholder="Carlos"
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
                    placeholder="Henao"
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
                    placeholder="carloshenao@gmail.com"
                    required
                    className='rounded-lg border border-black
                    placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-light text-sm'>Contraseña:</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    placeholder="********"
                    required
                    className='rounded-lg border border-black
                    placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                />
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