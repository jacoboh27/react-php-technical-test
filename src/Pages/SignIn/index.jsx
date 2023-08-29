import { Link, useNavigate } from 'react-router-dom'
import { useContext, useRef, useState } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

function SignIn() {
  const form = useRef(null);
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword ] = useState(false);

  const context = useContext(ShoppingCartContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		}
    axios.post(`${import.meta.env.VITE_API_URL}/user/validate`, data).then(function(response){
      if (response.data.status == 1) {
        const userInfo = {
          id: response.data.info_user['id'],
          name: response.data.info_user['name'],
          lastName: response.data.info_user['last_name'],
          email: response.data.info_user['email'],
          phoneNumber: response.data.info_user['phone_number'],
          address: response.data.info_user['address'],
        }
        context.setSignOut(false);
        localStorage.setItem('sign-out', JSON.stringify(false));
        localStorage.setItem('account', JSON.stringify(userInfo));
        navigateTo("/");
      } else if (response.data.status == 0) {
        toast.error("¡Este correo no está asociado con ninguna cuenta existente!", {
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
        toast.error("Contraseña incorrecta :(", {
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
      <h1 className="font-medium text-xl text-center mb-6 w-80">Inicia sesión</h1>

      <form onSubmit={handleSignIn} ref={form} method="post" className='flex flex-col gap-4 w-80'>
          <div className='flex flex-col gap-1'>
              <label htmlFor="email" className='font-light text-sm'>Correo:</label>
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
                  className='rounded-lg border border-black placeholder:font-light placeholder:text-sm
                  placeholder:text-black/60 focus:outline-none py-2 px-4'
              />
              <div className='absolute cursor-pointer bottom-2 right-3' onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? 
                  <EyeIcon className='h-6 w-6'  stroke="currentColor"/>
                 : 
                  <EyeSlashIcon className='h-6 w-6'   stroke="currentColor"/>
                }
              </div>
          </div>
          <button
            type="submit"
            className='bg-black text-white w-full rounded-lg py-3 mt-1'>
              Confirmar
          </button>
      </form>

      <div className='flex flex-col w-80'>
        <p className='text-center font-light text-xs mt-10'>¿Aún no tienes una cuenta?</p>
        <Link to='/sign-up'>
          <button
            className='w-full border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-2 py-3'
          >
            Registrarse
          </button>
        </Link>
      </div>
    </Layout>
  )
}

export default SignIn