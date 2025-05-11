import React, { useContext } from "react";
import { assets } from "../assets/icons/assets";
import { NavLink } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
const Navbar = () => {
  const { wishlist, cartItems, isAuthenticated } = useContext(StoreContext);
  const handleLogOut = () => {};
  return (
    <nav className="w-full border-b">
      <div className="bg-[#f8f8fb]">
        <div className="items w-[80%] p-4 m-auto flex justify-between items-center">
          <div className="logo">
            <div className="flex">
              <img src={assets.logo} width={40} />
              <span className="mx-1 leading-3 flex flex-col justify-center">
                <p className="text-[9px] font-bold text-yellow-500">YELLOW</p>
                <p className="font-bold">Berry</p>
              </span>
            </div>
          </div>
          <div className="search-bar bg-white w-[40%] flex justify-start rounded-md">
            <div className="search border-solid flex w-full">
              <select
                name=""
                id=""
                className="px-5 py-2 appearance-none rounded-lg outline-none opacity-50 border-r-2"
              >
                <option value="">Vagetable</option>
                <option value="">Vagetable</option>
                <option value="">Vagetable</option>
                <option value="">Vagetable</option>
              </select>
              <input
                type="text"
                className="w-[70%] outline-none px-4"
                name=""
                id="search"
                placeholder="Search products .."
              />
              <label htmlFor="search">
                <img
                  src={assets.searchIcon}
                  alt=""
                  className="h-5 mt-2 ml-5 cursor-pointer"
                />
              </label>
            </div>
          </div>
          <div className="right">
            <ul className="flex gap-8 text-[#3D4750]">
              <NavLink to="/login">
                <li className="flex items-center cursor-pointer">
                  <img src={assets.men} />
                  <span className="mx-1 flex flex-col justify-center">
                    <p className="text-[9px] font-medium ">Account</p>

                    {isAuthenticated ? (
                      <p className="font-normal" onClick={handleLogOut}>
                        Logout
                      </p>
                    ) : (
                      <p className="font-normal">Login</p>
                    )}
                  </span>
                </li>
              </NavLink>
              <NavLink to="/wishlist">
                <li className="flex items-center cursor-pointer">
                  <img src={assets.star} />
                  <span className="mx-1 flex flex-col justify-center">
                    <p className="text-[9px] font-medium">
                      {wishlist.length} Items
                    </p>
                    <p className="font-normal ">Wishlist</p>
                  </span>
                </li>
              </NavLink>
              <NavLink to="/cart">
                <li className="flex items-center cursor-pointer">
                  <img src={assets.cart} />
                  <span className="mx-1 flex flex-col justify-center">
                    <p className="text-[9px] font-medium">
                      {cartItems.length} Items
                    </p>
                    <p className="font-normal">Cart</p>
                  </span>
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      <hr className="w-full" />
      <div className="nav-items bg-white items w-[80%] p-3 m-auto flex justify-between items-center">
        <ul className="flex gap-10">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#6C7FD8] font-bold" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? "text-[#6C7FD8] font-bold" : ""
              }
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-[#6C7FD8] font-bold" : ""
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pages"
              className={({ isActive }) =>
                isActive ? "text-[#6C7FD8] font-bold" : ""
              }
            >
              Pages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "text-[#6C7FD8] font-bold" : ""
              }
            >
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/offers"
              className={({ isActive }) =>
                isActive ? "text-[#6C7FD8] font-bold" : ""
              }
            >
              Offers
            </NavLink>
          </li>
        </ul>
        <div className="location flex gap-3 border px-4 py-1 rounded-md cursor-pointer">
          <img src={assets.locationIcon} />
          <p>Kolkata</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
