import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/icons/assets";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";

const Wishlist = () => {
  const { wishlist, setWishlist, allProducts, setCartItems, backendUrl } =
    useContext(StoreContext);
  const handleRemoveItem = (_id) => {
    setWishlist((prevItem) => prevItem.filter((item) => item != _id));
  };
  const placeOrderBtn = () => {
    setCartItems((prevItems) => {
      const newItem = wishlist.filter((item) => !prevItems.includes(item));
      return [...prevItems, ...newItem];
    });
    toast.success("Wishlist items added to cart!");
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
      <div className="w-full bg-white">
        <div className="w-[70%]  m-auto">
          <div className="container mt-6 max-h-full flex overflow-hidden">
            <div className="sidebar side-bar w-[18vw] flex flex-col gap-4">
              <div className="profile border flex px-4 py-2 gap-4 rounded-md">
                <img src={assets.avtar} className="w-10" />
                <div>
                  <p>Hello,</p>
                  <h5>Arghyadeep</h5>
                </div>
              </div>
              <div className="menus">
                <div className="border">
                  <div className="order flex justify-between p-4">
                    <h4 className="text-[#3D4750] font-semibold">MY ORDERS</h4>
                    <p>&gt;</p>
                  </div>
                </div>
                <div className="border pb-5">
                  <div className="order flex justify-between p-4">
                    <h4 className="text-[#3D4750] font-semibold">
                      ACCOUNT SETTINGS
                    </h4>
                    <p>&gt;</p>
                  </div>
                  <ul className="px-8 flex flex-col gap-3 text-sm text-[#777777] font-medium">
                    <li>Profile Information</li>
                    <li>Manage Addresses</li>
                    <li>PAN Card Information</li>
                  </ul>
                </div>
                <div className="mt-5">
                  <button
                    className="bg-[#FF954D] w-full rounded-lg p-3 text-white hover:bg-[#ff944dcb]"
                    onClick={placeOrderBtn}
                  >
                    PLACE ORDER TO CART
                  </button>
                </div>
              </div>
            </div>
            <div className="rounded-xl px-6 w-full">
              <div className="mx-4 w-full border rounded-md">
                <div className="heading p-4  border-b">
                  <h4 className="font-bold text-xl text-[#3D4750]">
                    My Wishlist ({wishlist.length})
                  </h4>
                </div>

                {foodList
                  .filter((item) => wishlist.includes(item._id))
                  .map((item, index) => {
                    return (
                      <div
                        className="data p-2 border-b flex justify-between"
                        key={index}
                      >
                        <div className="flex gap-6 items-center">
                          <div>
                            <img
                              src={item.image[0].url}
                              className="w-[8vw]"
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <h4 className="text-lg font-medium text-[#3D4750]">
                              {item.description}
                            </h4>
                            <h5 className="text-[#686E7D]">{item.category}</h5>
                            <span className="flex gap-4 text-[#3D4750]">
                              <p>${item.actualPrice}</p>
                              <p className="line-through">$ {item.price}</p>
                            </span>
                          </div>
                        </div>
                        <div className="delete mt-3 mr-4">
                          <img
                            src={assets.trash}
                            className="w-5 cursor-pointer"
                            onClick={() => handleRemoveItem(item._id)}
                          />
                        </div>
                      </div>
                    );
                  })}
                {wishlist.length === 0 && (
                  <p className="text-center text-[#686E7D] p-3 col-span-4">
                    Your wishlist is empty.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
