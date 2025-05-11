import React, { useEffect, useState, useContext } from "react";

import ItemCard from "./ItemCard";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const DayDeals = () => {
  const { backendUrl } = useContext(StoreContext);
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
    <div className="w-full bg-white mt-7">
      <div className="max-w-[70%] m-auto">
        <div className="heading flex justify-between">
          <div className="flex flex-col gap-2">
            <h4 className="text-[#3D4750] text-xl font-bold">
              Day Of The <span className="text-[#6C7FD8]">Deal</span>
            </h4>
            <p className="text-[11px] text-[#686E7D]">
              Dont't wait The time will never be just right.
            </p>
          </div>
          <div>
            <span className="text-sm bg-[#EEEEEE] px-3 py-1 rounded-md font-medium">
              891 Days 3 : 25 : 10
            </span>
          </div>
        </div>
        {/* food items */}

        <div className="cards mt-8 mb-6 flex gap-10">
          {foodList
            .filter((i) => i.daydeal === true)
            .map((item, index) => {
              return <ItemCard key={index} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default DayDeals;
