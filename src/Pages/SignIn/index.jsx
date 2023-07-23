import { Link, Navigate } from 'react-router-dom'
import { useContext, useState, useRef } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function SignIn() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');
  const form = useRef(null);

  // Account
  const parsedAccount = JSON.parse(localStorage.getItem('account'));
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

  const handleSignIn = () => {
    localStorage.setItem('sign-out', JSON.stringify(false))
    context.setSignOut(false)
    // Redirect
    return <Navigate replace to={'/'} />
  }

  const createAnAccount = () => {
		const formData = new FormData(form.current);
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password')
		}
    // Create account
    localStorage.setItem('account', JSON.stringify(data));
    context.setAccount(data);
    // Sign In
    handleSignIn();
	}

  const renderLogIn = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Correo: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Contraseña: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link
          to="/">
          <button
            onClick={() => handleSignIn()}
            disabled={!hasUserAnAccount}
            className='bg-black disabled:bg-black/40 text-white  w-full rounded-lg py-3 mt-4 mb-2'
          >
            Iniciar sesión
          </button>
        </Link>
        <div className='text-center'>
          <a className='font-light text-xs underline underline-offset-4' href='/'>Olvidé mi contraseña</a>
        </div>
        <Link to='/sign-up'>
          <button
            onClick={() => setView('create-user-info')}
            className='w-full border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3'
          >
            Registrarse
          </button>
        </Link>
      </div>
    )
  }
  const renderCreateUserInfo = () => {
    return(
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Your name:</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="Peter"
            className='rounded-lg border border-black placeholder:font-light
            placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Your email:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="hi@helloworld.com"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-light text-sm'>Your password:</label>
          <input
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount?.password}
            placeholder="******"
            className='rounded-lg border border-black
            placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <Link to="/">
          <button
            className='bg-black text-white w-full rounded-lg py-3'
            onClick={() => createAnAccount()}>
            Create
          </button>
        </Link>
      </form>
    )
  }

  const renderView = () => {
    if (view === 'create-user-info') {
      return renderCreateUserInfo();
    } else {
      return renderLogIn();
    } 
  }
  //const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">Inicia sesión</h1>
      {renderView()}
    </Layout>
  )
}

export default SignIn