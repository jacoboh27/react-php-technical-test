import { PlusIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

const Card = ({ id, price, title, image, category, description}) => {
    const context = useContext(ShoppingCartContext);

    const showProduct = () =>{
        context.openProductDetail();
        context.setProductToShow({title, price, image, category, description});
        context.closeCheckoutSideMenu();
    };

    const addProductToCart = (event) => {
        event.stopPropagation();
        context.closeProductDetail();
        const productData = {
            id,
            title, 
            price,
            image,
            category           
        };
		context.setCartProducts([...context.cartProducts, productData]);
        context.openCheckoutSideMenu();
	}

    // const renderIcon = (id) => {
    //     const isInCard = context.cartProducts.filter(product => product.id === id).length > 0;
    //     if(isInCard){
    //         return (
    //             <div
    //                 className=" top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1">
    //                 <CheckIcon className='h-6 w-6 text-white'/>
    //             </div>
    //         )
    //     } else {
    //         return (
    //             <div 
    //                 onClick={(event) => addProductToCart(event)}
    //                 className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1">
    //                 <PlusIcon className='h-6 w-6 text-black'/>
    //             </div>
    //         )
    //     } 
    // };

    return (
        <div
            onClick={() => showProduct()} 
            className="bg-white cursor-pointer w-56 h-60 rounded-lg">
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">
                    {category}
                </span>
                <img className="w-full h-full object-cover rounded-lg" src={image} alt={title} />
                {/* {renderIcon(id)} */}
                {
                    context.cartProducts.filter((product) => product.id === id).length > 0 ? (
                        <div
                            className="absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1">
                            <CheckIcon className='h-6 w-6 text-white'/>
                        </div>
                    ) : (
                        <div 
                            onClick={(event) => addProductToCart(event)}
                            className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1">
                            <PlusIcon className='h-6 w-6 text-black'/>
                        </div>
                    )
                }
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light line-clamp-2">{title}</span>
                <span className="text-lg font-medium">${price}</span>
            </p>
        </div>
    );
}

export default Card;