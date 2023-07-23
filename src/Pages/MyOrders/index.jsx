import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import Layout from '../../Components/Layout';
import OrdersCard from '../../Components/OrdersCard';

function MyOrders() {
    const context = useContext(ShoppingCartContext);

    return (
        <Layout className='bg-red-100'>
            <div className="relative flex justify-center w-80 items-center mb-4">
                <h1 className='font-medium text-2xl'>Mis Ordenes</h1>
            </div>            
            {
                context.order.map((order, index) => (
                    <Link key={index} to={`/my-orders/${index}`}>
                        <OrdersCard  
                            date={order.date}
                            totalPrice={order.totalPrice}
                            totalProducts={order.totalProducts}
                        />
                    </Link>
                ))
            }
        </Layout>
    )
  }
  
  export default MyOrders