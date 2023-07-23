import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import ShoppingCart from '../ShoppingCart';

const Navbar = () => {
    const context = useContext(ShoppingCartContext);
    const activeStyle = 'underline underline-uffset-4';

    // Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut
    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        localStorage.setItem('sign-out', JSON.stringify(true));
        context.setSignOut(true);
    }

    const renderView = () => {
        if (hasUserAnAccount && !isUserSignOut) {
            return (
                <>
                    <li className="text-black/60">
                        {parsedAccount?.email}
                    </li>
                    <li>
                        <NavLink 
                            to='/my-orders'
                            className={ ({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            Mis ordenes
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/my-account'
                            className={ ({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            Mi cuenta
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/sign-in'
                            onClick={() => handleSignOut()}
                            className={ ({ isActive }) => isActive ? activeStyle : undefined}
                        >
                            Cerrar sesión
                        </NavLink>
                    </li>
                    <li className='flex items-center'>
                        <ShoppingCart />
                    </li>
                </>
            ) 
        } else {
            return (
                <li>
                    <NavLink 
                        to='/sign-in'
                        onClick={() => handleSignOut()}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Iniciar sesión
                    </NavLink>
                </li>
            )
        }
    }

    return (
        <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white">
            <ul className="flex items-center gap-4">
                <li className="font-semibold text-lg">
                    <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                        Jacob&apos;s shop
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/'
                        onClick={() => context.setSearchByCategory()}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Inicio
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/mens-clothing'
                        onClick={() => context.setSearchByCategory("men's clothing")}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Ropa Hombre
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/womens-clothing'
                        onClick={() => context.setSearchByCategory("women's clothing")}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Ropa Mujer
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/electronics'
                        onClick={() => context.setSearchByCategory("electronics")}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Electrónica
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to='/jewelery'
                        onClick={() => context.setSearchByCategory("jewelery")}
                        className={ ({ isActive }) => isActive ? activeStyle : undefined}
                    >
                        Joyería
                    </NavLink>
                </li>
            </ul>

            <ul className="flex items-center gap-3">
                {renderView()}
            </ul>
        </nav>
    )
}

export default Navbar;