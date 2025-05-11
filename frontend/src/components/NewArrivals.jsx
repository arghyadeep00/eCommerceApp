import React, { useState, useContext, useEffect } from "react";

import ItemCard from "./ItemCard";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const NewArrivals = () => {
  const [category, setCategory] = useState("");
  const { backendUrl } = useContext(StoreContext);
  const [foodList, setFoodList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(`${backendUrl}/api/user/get-food-items`, {
        withCredentials: true,
      });
      setFoodList(result.data.response);
    };
    getData();
  }, []);

  return (
    <div className="w-full mt-10">
      <div className="w-[70%] m-auto">
        <div className="heading flex justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="text-[#3D4750] text-xl font-bold">
              New <span className="text-[#6C7FD8]">Arrivals</span>
            </h4>
            <p className="text-[11px] text-[#686E7D]">
              Shop online for new arrivals and get free shipping!
            </p>
          </div>
          <div>
            <span className="text-sm px-3 py-1 rounded-md font-medium">
              <ul className="flex gap-5 text-[#686E7D]">
                <li
                  className={`cursor-pointer ${
                    category === "" ? "text-[#6C7FD8] font-bold" : ""
                  }`}
                  onClick={() => setCategory("")}
                >
                  All
                </li>
                <li>/</li>
                <li
                  className={`cursor-pointer ${
                    category === "Spices" ? "text-[#6C7FD8] font-bold" : ""
                  }`}
                  onClick={() => setCategory("Spices")}
                >
                  Spices
                </li>
                <li>/</li>
                <li
                  className={`cursor-pointer ${
                    category === "Snacks" ? "text-[#6C7FD8] font-bold" : ""
                  }`}
                  onClick={() => setCategory("Snacks")}
                >
                  Snack
                </li>
                <li>/</li>
                <li
                  className={`cursor-pointer ${
                    category === "Juice" ? "text-[#6C7FD8] font-bold" : ""
                  }`}
                  value={"fruits&juics"}
                  onClick={() => setCategory("Juice")}
                >
                  Juice
                </li>
                <li>/</li>
                <li
                  className={`cursor-pointer ${
                    category === "vegetables" ? "text-[#6C7FD8] font-bold" : ""
                  }`}
                  value={"vegetables"}
                  onClick={() => setCategory("vegetables")}
                >
                  Vegetables
                </li>
              </ul>
            </span>
          </div>
        </div>
        <div className="cards mt-8 mb-6 grid grid-cols-4 gap-6">
          {foodList
            .filter((i) => i.newarrive === true)
            .filter((item) => category === "" || item.category === category)
            .map((item, index) => {
              return <ItemCard key={index} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
