import { useContext, useState, useRef } from 'react'
import { ShoppingCartContext } from '../../Context'
import { toast } from 'react-toastify';
import axios from "axios";
import Layout from '../../Components/Layout'

function MyAccount() {
  const context = useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');
  const account = localStorage.getItem('account');
  const parsedAccount = JSON.parse(account);
  const form = useRef(null);

  const editAccount = () => {
    const id = parsedAccount.id;
    const formData = new FormData(form.current);
		const data = {
      id: id,
			name: formData.get('name'),
			lastName: formData.get('lastName'),
			email: formData.get('email'),
			phoneNumber: formData.get('phoneNumber'),
			address: formData.get('address')
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
          const stringifiedAccount = JSON.stringify(data);
          localStorage.setItem('account', stringifiedAccount);
          context.setAccount(data);
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

  const renderUserInfo = () => {
    return (
      <div className='flex flex-col w-80'>
        <p>
          <span className='font-light text-sm'>Nombre: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Apellidos: </span>
          <span>{parsedAccount?.lastName}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Correo: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Número telefónico: </span>
          <span>{parsedAccount?.phoneNumber}</span>
        </p>
        <p>
          <span className='font-light text-sm'>Dirección: </span>
          <span>{parsedAccount?.address}</span>
        </p>
        <button
          className='border border-black rounded-lg mt-6 py-3'
          onClick={() => setView('edit-user-info')}>
          Editar
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return (
      <form ref={form} className='flex flex-col gap-4 w-80'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='font-light text-sm'>Nombre(s):</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount.name}
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="lastName" className='font-light text-sm'>Apellidos:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={parsedAccount.lastName}
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-light text-sm'>Correo:</label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount.email}
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="phoneNumber" className='font-light text-sm'>Número telefónico:</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={parsedAccount.phoneNumber}
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="address" className='font-light text-sm'>Dirección:</label>
          <input
            type="address"
            id="address"
            name="address"
            defaultValue={parsedAccount.address}
            className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
          />
        </div>
        <button
          className='bg-black text-white w-full rounded-lg py-3'
          onClick={() => {setView('user-info'), editAccount()}}>
          Confirmar cambios
        </button>
      </form>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">Mi cuenta</h1>
      {renderView()}
    </Layout>
  )
}

export default MyAccount