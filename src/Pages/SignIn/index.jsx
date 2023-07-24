import { Link, useNavigate } from 'react-router-dom'
import { useContext, useRef } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'


function SignIn() {
  const form = useRef(null);
  const navigateTo = useNavigate();

  const context = useContext(ShoppingCartContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		}
    if (data.email !== '' && data.password !== '') {
      axios.post('http://localhost:80/api/user/validate', data).then(function(response){
        if (response.data.status == 1) {
          localStorage.setItem('account', JSON.stringify(data));
          context.setAccount({email: data.email});
          navigateTo("/");
        } else {
          toast.error("Correo o contraseña incorrecta :( ¡Valida los datos!", {
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
    localStorage.setItem('sign-out', JSON.stringify(false));
    context.setSignOut(false);
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
          <div className='flex flex-col gap-1'>
              <label htmlFor="password" className='font-light text-sm'>Contraseña:</label>
              <input
                  type="text"
                  id="password"
                  name="password"
                  required
                  className='rounded-lg border border-black placeholder:font-light placeholder:text-sm
                  placeholder:text-black/60 focus:outline-none py-2 px-4'
              />
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