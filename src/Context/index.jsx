import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const initializeLocalStorage = () => {
    const accountInLocalStorage = localStorage.getItem('account');
    const signOutInLocalStorage = localStorage.getItem('sign-out');
    let parsedAccount;
    let parsedSignOut;

    if (!accountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}));
        parsedAccount = {};
    } else {
        parsedAccount = JSON.parse(accountInLocalStorage);
    }

    if (!signOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false));
        parsedSignOut = false;
    } else {
        parsedSignOut = JSON.parse(signOutInLocalStorage);
    }
}

export const ShoppingCartProvider = ({ children }) => {
    // My Account
    const [account, setAccount] = useState({});

    // Sign out
    const [signOut, setSignOut] = useState(false);

    // Product Detail · Open/Close
    const [detailOpen, setDetailOpen] = useState(false);
    const openProductDetail = () => setDetailOpen(true);
    const closeProductDetail = () => setDetailOpen(false);

    // Checkout Side Menu · Open/Close
    const [checkoutSideMenuOpen, setCheckoutSideMenuOpen] = useState(false);
    const openCheckoutSideMenu = () => setCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setCheckoutSideMenuOpen(false);

    // Product Detail · Show product
    const [productToShow, setProductToShow] = useState({});

    // Shopping Cart · Add products to cart
    const [cartProducts, setCartProducts] = useState([]);
    // Shopping Cart · Order
    const [order, setOrder] = useState([]);

    // Get Products by title
    const [searchByTitle, setSearchByTitle] = useState(null);
    // Get products by category
    const [searchByCategory, setSearchByCategory] = useState(null)

    // Get Products
    const [items, setItems] = useState(null);
    const [filteredItems, setFilteredItems] = useState(null);
    //PlatziFake: https://api.escuelajs.co/api/v1/products
    //FakeStoreApi; https://fakestoreapi.com/products
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(json=>setItems(json))
    }, []);

    const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
    }
    const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.toLowerCase() === (searchByCategory.toLowerCase()));
    }
    const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
        if (searchType === 'BY_TITLE') {
            return filteredItemsByTitle(items, searchByTitle);
        }
        if (searchType === 'BY_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory);
        }
        if (searchType === 'BY_TITLE_AND_CATEGORY') {
            return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()));
        }
        if (!searchType) {
            return items;
        }
    }

    useEffect(() => {
        if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
        if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
    }, [items, searchByTitle, searchByCategory])


    return (
    <ShoppingCartContext.Provider value={
        {
            openProductDetail,
            closeProductDetail,
            detailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            checkoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            items,
            setItems,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            searchByCategory,
            setSearchByCategory,
            account, 
            setAccount, 
            signOut, 
            setSignOut
        }
    }>
        {children}
    </ShoppingCartContext.Provider>
    );
}