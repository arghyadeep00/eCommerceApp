import React from "react";
import { assets } from "../assets/icons/assets";
import DayDeals from "../components/DayDeals";
import NewArrivals from "../components/NewArrivals";

const Home = () => {
  return (
    <>
      {/* hero section  */}
      <div className="w-full">
        <div className="hero p-8">
          <img src={assets.hero1} className="rounded-md" />
        </div>
      </div>
      {/* explore section  */}
      <div className="explore bg-[#f8f8fb] w-full p-4 relative">
        <div className="w-[70%] m-auto flex gap-9 ">
          <img src={assets.category} />
          <p className="text-[5.2vw] font-extrabold text-[#dde0e0]">
            Explore Categories
          </p>
          
        </div>
        <div className="items absolute bottom-0 left-[28vw] z-10 flex gap-7 bg-white  px-10 p-5 rounded-t-2xl">
          <div className="box bg-[#f4f1fe]">
            <img src={assets.coldDrink} />
            <p>Cold Drinks</p>
          </div>
          <div className="box bg-[#fbf9e4]">
            <img src={assets.bakery} />
            <p>Bakery</p>
          </div>
          <div className="box bg-[#fef1f1]">
            <img src={assets.vegetable} />
            <p>Vegetables</p>
          </div>
          <div className="box bg-[#e1fcf2]">
            <img src={assets.fruits} />
            <p>Fruits</p>
          </div>
        </div>
      </div>
      <DayDeals />
      {/* hero 2 section  */}
      <div className="w-full mt-16 relative">
        <img src={assets.hero2} />
        <div className="bg-white absolute bottom-0 right-36 p-5 rounded-t-3xl ">
          <p className="text-[#6C7FD8]">25% Off</p>
          <h5 className="text-[#3D4750] text-2xl font-bold mt-3">
            Fresh & Organic vegetables
          </h5>
          <button className="border p-3 rounded-lg mt-5">Shop Now</button>
        </div>
      </div>
      {/* new arrival items  */}
      <NewArrivals />
      {/* about purchase  */}
      <div className="w-full bg-[#f8f8fb] mt-8">
        <div className="w-[70%]  m-auto grid grid-cols-4 gap-5 p-6">
          <div className="box border flex flex-col gap-3 justify-center items-center text-center p-6 rounded-xl">
            <img src={assets.bus} />
            <h5 className="font-bold text-[#3D4750]">Free Shipping</h5>
            <p className="text-sm text-[#686E7D]">
              Free shipping on all us order or above $200
            </p>
          </div>
          <div className="box border flex flex-col gap-3 justify-center items-center text-center p-6 rounded-xl">
            <img src={assets.support} />
            <h5 className="font-bold text-[#3D4750]">24x7 Support</h5>
            <p className="text-sm text-[#686E7D]">
              Contact us 24 hours a day, 7 days a week
            </p>
          </div>
          <div className="bbox border flex flex-col gap-3 justify-center items-center text-center p-6 rounded-xl">
            <img src={assets.returnBox} />
            <h5 className="font-bold text-[#3D4750]">30 Days Return</h5>
            <p className="text-sm text-[#686E7D]">
              Simply return it within 30 days for an exchange
            </p>
          </div>
          <div className="box border flex flex-col gap-3 justify-center items-center text-center p-6 rounded-xl">
            <img src={assets.securePayment} />
            <h5 className="font-bold text-[#3D4750]">Payment Secure</h5>
            <p className="text-sm text-[#686E7D]">
              Contact us 24 hours a day, 7 days a week
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
