import { useContext } from 'react';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card/Index';
import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from "../../Context";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map(item => (
          <Card key={item.id} {...item} />
        ))
      )
    } else {
      return (
        <div>We don't have anything :(</div>
      )
    }
  }
  
  return (
      <Layout className='bg-red-100'>
        <div className="relative flex justify-center w-80 items-center mb-4">
            <h1 className='font-medium text-2xl'>Exclusive Products</h1>
        </div>
        <input
          type="text"
          placeholder='Search a product'
          className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
          onChange={(event) => context.setSearchByTitle(event.target.value)} 
        />
        <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {
          renderView()
        }
        </div>
        { context.detailOpen && (
          <ProductDetail />
        )}
      </Layout>
  )
}

export default Home