import { Link, Navigate } from 'react-router-dom'
import { useContext, useRef } from 'react'
import { ShoppingCartContext } from '../../Context'
import axios from 'axios'
import Layout from '../../Components/Layout'

function SignUp() {
    const context = useContext(ShoppingCartContext);
    //const [view, setView] = useState('user-info');
    const form = useRef(null);

    // Account
    const parsedAccount = JSON.parse(localStorage.getItem('account'));
    // Has an account
    //const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    //const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    //const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;

    const createAnAccount = () => {
		const formData = new FormData(form.current);
		const data = {
			name: formData.get('name'),
			lastName: formData.get('last-name'),
			email: formData.get('email'),
			password: formData.get('password')
		}
        axios.post('http://localhost:80/api/user/save', data).then(function(response){
            if (response.data.status == 1) {
                console.log("exitoo");
            } else {
                console.log("algo fallo pa");
            }
        });
        // Create account
        localStorage.setItem('account', JSON.stringify(data));
        context.setAccount(data);
        // Sign In
        return <Navigate replace to={'/sign-in'} />
	}

  return (
    <Layout>
        <h1 className="font-medium text-xl text-center mb-6 w-80">Crea tu cuenta</h1>
        <form ref={form} className='flex flex-col gap-4 w-80'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="name" className='font-light text-sm'>Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={parsedAccount?.name}
                    placeholder="Carlos"
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
                    defaultValue={parsedAccount?.name}
                    placeholder="Henao"
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
                    defaultValue={parsedAccount?.email}
                    placeholder="carloshenao@gmail.com"
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
                    defaultValue={parsedAccount?.password}
                    placeholder="******"
                    className='rounded-lg border border-black
                    placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
                />
            </div>
            <Link to="/">
                <button
                    className='bg-black text-white w-full rounded-lg py-3 mt-1'
                    onClick={() => createAnAccount()}>
                    Crear
                </button>
            </Link>
        </form>
    </Layout>
  )
}

export default SignUp