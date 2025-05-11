import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {
  const backendUrl = "http://localhost:3001";
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });
  
  const [productPreview, setProductPreview] = useState([]);
  const [cartItems, setCartItems] = useState([]);
 

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const contextValue = {
    wishlist,
    setWishlist,
    productPreview,
    setProductPreview,
    cartItems,
    setCartItems,
    backendUrl,
   
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};