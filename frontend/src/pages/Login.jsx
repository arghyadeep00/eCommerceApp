import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const { backendUrl } = useContext(StoreContext);
  const navigateTo = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevItem) => ({ ...prevItem, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, data, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);

        navigateTo("/");
      } else {
        toast.error(response.data.message || "login failed, please try again ");
      }
    } catch (error) {
      console.log("Login failed:", error);
      toast.error(
        error.response?.data?.message || "login failed please try again"
      );
    }
  };
  return (
    <>
      <div className="w-full bg-[#f8f8fb] ">
        <div className="w-[70%] m-auto">
          <div className="heading flex justify-between p-4">
            <h5 className="text-[#3D4750] font-semibold">Login</h5>
            <p className="text-[#686E7D] text-sm">
              {" "}
              <span className="font-semibold text-[#3D4750]">Home</span> &gt;
              login
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-6">
        <div className="container w-[70%] m-auto flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <div className="heading text-center flex flex-col gap-2">
              <h4 className="text-[#3D4750] font-bold text-2xl">
                Log <span className="text-[#FF954D]">In</span>
              </h4>
              <p className="text-sm text-[#686E7D]">
                Best places to buy products
              </p>
            </div>
            <div className="flex flex-col gap-8 border rounded-lg p-9 mt-10 w-[25vw]">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#686E7D]">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="Enter Your Email"
                  className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="passowrd" className="text-[#686E7D]">
                  Password*
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="Enter Your Password"
                  className="border p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
              </div>
              <p className="text-[#686E7D] font-medium text-sm">
                Forgot passowrd?
              </p>
              <div className="buttons flex justify-between">
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="bg-[#6c7fd8] rounded-md px-3 py-1 text-[#FFFFFF] "
                >
                  Login
                </button>
                <NavLink to="register">
                  <button
                    type="submit"
                    className="bg-white border rounded-md px-3 py-1 text-[#686E7D]"
                  >
                    Register
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
