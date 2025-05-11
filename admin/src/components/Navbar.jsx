import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="w-full bg-red-300 p-4">
        <div className="navbar w-[80%] m-auto flex justify-between">
          <div className="log">
            <h4 className="font-bold text-xl">Products</h4>
          </div>
          <div className="menu flex gap-5">
            <div className="search">Search</div>
            <div className="">Notification</div>
            <div className="">Profile</div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
