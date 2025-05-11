import React from "react";
import { assets } from "../assets/icons/assets";

const Footer = () => {
  return (
    <div className="w-full mt-14 mb-14">
      <hr className="h-1" />
      <div className="w-[80%] mt-16 m-auto">
        <div className="grid grid-cols-6 gap-3">
          <div className="box col-span-2">
            <div className="logo flex ">
              <img src={assets.logo} width={40} />
              <span className="mx-1 leading-3 flex flex-col justify-center">
                <p className="text-[9px] font-bold text-yellow-500">YELLOW</p>
                <p className="font-bold">Berry</p>
              </span>
            </div>
            <p className="p-3 text-[#686E7D] text-sm">
              BlueBerry is the biggest market of grocery products. Get your
              daily needs from our store.
            </p>
            <div className="mobile-links flex gap-10 mt-5">
              <img src={assets.android} />
              <img src={assets.appleos} />
            </div>
          </div>
          <div className="box">
            <h6 className="font-bold">Category</h6>
            <ul className="text-[#686E7D] text-sm flex flex-col gap-2 mt-6">
              <li>Dairy & Milk</li>
              <li>Snack & Spice</li>
              <li>Fast Food</li>
              <li>Juice & Drinks</li>
              <li>Bakery</li>
              <li>Seafood</li>
            </ul>
          </div>
          <div className="box">
            <h6 className="font-bold">Company</h6>
            <ul className="text-[#686E7D] text-sm flex flex-col gap-2 mt-6">
              <li>About us</li>
              <li>Delivery</li>
              <li>Legal Notice</li>
              <li>Terms & Conditions</li>
              <li>Secure Payment</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className="box">
            <h6 className="font-bold">Account</h6>
            <ul className="text-[#686E7D] text-sm flex flex-col gap-2 mt-6">
              <li>Sign in</li>
              <li>View Cart</li>
              <li>Return Plolicy</li>
              <li>Become a Vendor</li>
              <li>Affiliate Program</li>
              <li>Payments</li>
            </ul>
          </div>
          <div className="box">
            <h6 className="font-bold">Contact</h6>
            <ul className="text-[#686E7D] text-sm flex flex-col gap-2 mt-6">
              <li>971 Kolkata</li>
              <li>+91 9999999999</li>
              <li>example@yello.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
