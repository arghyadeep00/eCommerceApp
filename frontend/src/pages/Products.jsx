import React, { useContext, useEffect, useState } from "react";
import DayDeals from "../components/DayDeals";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Products = () => {
  const {
    allProducts,
    productPreview,
    setProductPreview,
    cartItems,
    setCartItems,
    backendUrl,
  } = useContext(StoreContext);

  const handleOnCart = (_id) => {
    if (cartItems.includes(_id)) {
      setCartItems((prevItem) => prevItem.filter((p) => _id != p));
    } else {
      setCartItems((prevItem) => [...prevItem, _id]);
    }
  };

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(`${backendUrl}/api/user/get-food-items`,{
        withCredentials:true
      });
      setFoodList(result.data.response);
    };
    getData();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-[70%] m-auto  mt-7">
          <div className="container flex gap-4">
            <div className="left bg-[#f8f8fb] max-h-[70vh] min-w-[18vw] border rounded-md p-3 overflow-scroll custom-scrollbar">
              <h4 className="text-xl font-semibold text-center text-[#3D4750]">
                All Products
              </h4>
              {foodList.map((item, index) => (
                <div
                  className="flex mt-4 items-center border bg-white rounded-md cursor-pointer"
                  key={index}
                  onClick={() => setProductPreview(item._id)}
                >
                  <img src={item.image[0].url} className="w-[5vw]" />
                  <div className="flex flex-col gap-2 text-[#777777]">
                    <h4 className="text-sm ">{item.description}</h4>
                    <p className="font-semibold">${item.actualPrice}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="main-contents">
              {foodList
                .filter((item) => item._id === productPreview)
                .map((product, index) => {
                  return (
                    <div key={index}>
                      <div className="details p-10 flex gap-5 justify-between items-center">
                        <div className="image">
                          <img
                            src={product.image[0].url}
                            className="w-[30vw]"
                          />
                        </div>
                        <div className="product-details flex gap-3 flex-col">
                          <h5 className="text-[#3D4750] font-semibold text-xl">
                            {product.description}
                          </h5>
                          <p>****</p>
                          <p className="text-[#686E7D] text-sm">
                            {product.about}
                          </p>
                          <p className="text-[#3D4750] font-semibold">
                            M.R.P ${product.actualPrice}
                          </p>
                          <p className="line-through text-[#3D4750]">
                            ${product.price}
                          </p>
                          <p className="text-[#3D4750]">{product.category}</p>
                        </div>
                      </div>
                      <div className="buttons flex gap-4 justify-center">
                        <button
                          className="px-3 py-2 bg-[#FF954D] rounded-md"
                          onClick={() => handleOnCart(product._id)}
                        >
                          {cartItems.includes(product._id)
                            ? "Remove from Cart"
                            : "Add to Cart"}
                        </button>
                        <Link to="/cart">
                          <button
                            id="cartBtn"
                            className="px-3 py-2 border bg-[#f8f8fb] rounded-md text-black"
                          >
                            View Cart
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <DayDeals />
      </div>
    </>
  );
};

export default Products;
