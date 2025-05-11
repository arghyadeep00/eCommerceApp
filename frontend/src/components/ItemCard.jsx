import React, { useContext, useEffect } from "react";
import { assets } from "../assets/icons/assets";
import { StoreContext } from "../context/StoreContext";
import { redirect, useNavigate } from "react-router-dom";
import axios from "axios";
const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(StoreContext);
  const { wishlist, setWishlist, setProductPreview } = useContext(StoreContext);

  const handelOnClick = async () => {
    if (wishlist.includes(item._id)) {
      setWishlist((prevItems) => prevItems.filter((i) => i != item._id));
    } else {
      setWishlist((prevItems) => [...prevItems, item._id]);
    }
  };

  const itemOnClicked = (_id) => {
    setProductPreview(_id);
    navigate("/products");
  };

  return (
    <div className="card border rounded-lg cursor-pointer">
      <div className="image border-b overflow-hidden flex justify-center relative">
        <img
          src={item.image[0].url}
          className="w-[10vw] transition-transform duration-300 ease-in-out hover:scale-110"
          onClick={() => itemOnClicked(item._id)}
        />
        <div>
          <img
            src={wishlist.includes(item._id) ? assets.redLove : assets.love}
            className="w-5 absolute right-2 top-2"
            onClick={() => handelOnClick(item._id)}
          />
        </div>
      </div>
      <div
        className="description p-3 flex flex-col gap-2"
        onClick={() => itemOnClicked(item._id)}
      >
        <div className="flex justify-between">
          <h5 className="text-[#777777]">{item.category}</h5>
          <span>****</span>
        </div>
        <p className="text-[#3D4750] text-sm font-medium">{item.description}</p>
        <div className="flex justify-between">
          <span className="flex gap-3">
            <p className="font-bold text-[#686E7D]">$ {item.actualPrice}</p>
            <p className="text-[#686E7D] text-sm line-through">
              $ {item.price}
            </p>
          </span>
          <p className="text-[#686E7D] text-sm">{item.details}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
