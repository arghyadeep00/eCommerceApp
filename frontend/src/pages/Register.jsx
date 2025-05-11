import React, { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
const Register = () => {
  const { backendUrl } = useContext(StoreContext);
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pin: "",
    country: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevItem) => ({ ...prevItem, [name]: value }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/api/user/register`,
        data
      );
      if (!response) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          fname: "",
          lname: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          pin: "",
          country: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  const inputStyle =
    "border p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-300";

  return (
    <>
      <div className="w-full bg-[#f8f8fb]">
        <div className="w-[70%] m-auto">
          <div className="heading flex justify-between p-4">
            <h5 className="text-[#3D4750] font-semibold">Register</h5>
            <p className="text-[#686E7D] text-sm">
              <span className="font-semibold text-[#3D4750]">Home</span> &gt;
              login &gt; register
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mt-4 bg-white">
        <div className="w-[70%] m-auto">
          <div className="inputs">
            <div className="heading text-center flex flex-col gap-2">
              <h4 className="text-[#3D4750] font-bold text-2xl">Register</h4>
              {/* <p className="text-sm text-[#686E7D]">
                Best places to buy products
              </p> */}
            </div>

            <div className="grid grid-cols-2 gap-6 mt-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="fname" className="text-[#3D4750]">
                  First Name*
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  placeholder="Enter your first name"
                  value={data.fname}
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lname" className="text-[#3D4750]">
                  Last Name*
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  value={data.lname}
                  placeholder="Enter your last name"
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#3D4750]">
                  Email*
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={data.email}
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[#3D4750]">
                  Phone Number*
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={data.phone}
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>

              <div className="col-span-2 flex flex-col gap-2">
                <label htmlFor="address" className="text-[#3D4750]">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address Line 1"
                  value={data.address}
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="city" className="text-[#3D4750]">
                  City*
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  value={data.city}
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pin" className="text-[#3D4750]">
                  Post Code*
                </label>
                <input
                  type="text"
                  name="pin"
                  id="pin"
                  placeholder="Post Code"
                  value={data.pin}
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="country" className="text-[#3D4750]">
                  Country*
                </label>
                <input
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  value={data.country}
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="region" className="text-[#3D4750]">
                  Enter Password*
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className={inputStyle}
                />
              </div>
              <div className="col-span-2">
                <button
                  type="submit"
                  onClick={handleOnSubmit}
                  className="bg-[#6c7fd8] rounded-md px-3 py-1 w-full text-[#FFFFFF]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
