import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/icons/assets";
import ItemCard from "../components/ItemCard";
import { StoreContext } from "../context/StoreContext";

import axios from "axios";


const Categories = () => {
  const [category, setCategory] = useState([]);
  const { backendUrl } = useContext(StoreContext);
  const [foodList, setFoodList] = useState([]);

  const itemClick = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory((items) => items.filter((item) => item !== value));
    } else {
      setCategory((items) => [...items, value]);
    }
  };

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
    <div className="w-full mt-8 bg-white">
      <div className="w-[85%] m-auto">
        <div className="container max-h-full flex overflow-hidden">
          <div className="side-bar w-[18vw]">
            <div className="contants bg-[#f8f8fb] rounded-xl p-6">
              <h5 className="text-[#3D4750] font-semibold">Category</h5>
              <ul className="mt-4 text-[#777777] flex flex-col gap-1">
                {["chips", "juice", "snacks", "spices", "sauces"].map((cat) => (
                  <li key={cat}>
                    <input
                      type="checkbox"
                      value={cat}
                      id={cat}
                      onClick={itemClick}
                    />
                    <label htmlFor={cat}>
                      {" "}
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </label>
                  </li>
                ))}
              </ul>
              <hr className="mt-4" />
              <h5 className="mt-4 text-[#3D4750] font-semibold">Weight</h5>
              <ul className="mt-4 text-[#777777] flex flex-col gap-1">
                {["200g", "500g", "1kg", "5kg", "10kg"].map((weight) => (
                  <li key={weight}>
                    <input
                      type="checkbox"
                      value={weight}
                      id={weight}
                      onClick={itemClick}
                    />
                    <label htmlFor={weight}> {weight} Pack</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="main-containe max-h-[100vh] overflow-y-scroll w-full">
            <div className="ml-5 grid gap-4 grid-cols-4 bg-white">
              {foodList.map((item, index) => (
                <ItemCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
