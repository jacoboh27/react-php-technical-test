import { Link } from "react-router-dom";
import { useContext } from "react";
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from "../../Context";
import OrderCard from '../../Components/OrderCard';

function MyOrder() {
    const context = useContext(ShoppingCartContext);
    const currentPath = window.location.pathname;
    let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    if (index === 'last') index = context.order?.length - 1

    return (
        <Layout className='bg-red-100'>
            <div className="relative flex justify-center w-80 items-center mb-6">
                <Link to='/my-orders' className='absolute left-0 cursor-pointer'>
                    <ChevronLeftIcon className='h-6 w-6 text-black' />
                </Link>
                <h1>Mi Orden</h1>
            </div>
            <div className='flex flex-col w-80'>
                {
                    context.order?.[index].products.map(product => (
                        <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        price={product.price}
                        />
                    ))
                }
            </div>
        </Layout>
    )
  }
  
  export default MyOrder