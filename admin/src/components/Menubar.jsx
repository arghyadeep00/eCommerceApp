import React from "react";
import { NavLink } from "react-router-dom";

const Menubar = () => {
  return (
    <div className="max-w-[15vw] h-[91vh] bg-blue-300 flex justify-center">
      <ul className="mt-10 text-xl flex flex-col gap-10">
        <NavLink
          to="/listed-products"
          className={({ isActive }) =>
            isActive ? "text-blue-700" : "hover:text-blue-700"
          }
        >
          <li>Listed Products</li>
        </NavLink>
        <NavLink
          to="/insert-products"
          className={({ isActive }) =>
            isActive ? "text-blue-700" : "hover:text-blue-700"
          }
        >
          <li>Insert Products</li>
        </NavLink>
        <NavLink
          to="/manage-orders"
          className={({ isActive }) =>
            isActive ? "text-blue-700" : "hover:text-blue-700"
          }
        >
          <li>Manage Orders</li>
        </NavLink>
        <NavLink
          to="/offer-products"
          className={({ isActive }) =>
            isActive ? "text-blue-700" : "hover:text-blue-700"
          }
        >
          <li>Offer Products</li>
        </NavLink>
        <NavLink
          to="/user-list"
          className={({ isActive }) =>
            isActive ? "text-blue-700" : "hover:text-blue-700"
          }
        >
          <li>List Users</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Menubar;
