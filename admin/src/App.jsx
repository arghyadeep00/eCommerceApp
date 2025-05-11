import React from "react";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import { Route, Routes } from "react-router-dom";
import InsertProducts from "./pages/InsertProducts";
import ListedProducts from "./pages/ListedProducts";
import ManageOrders from "./pages/ManageOrders";
import OfferPorducts from "./pages/OfferPorducts";
import UserList from "./pages/UserList";
import { ToastContainer} from 'react-toastify';
const App = () => {
  return (
    <>
    <ToastContainer/>
      <Navbar />
      <div className="flex">
        {/* Left Menu Bar */}
        <div className="w-1/4 bg-gray-100 h-screen p-4">
          <Menubar />
        </div>

        {/* Right Content Area */}
        <div className="w-3/2 bg-white h-screen p-6 overflow-y-auto">
          <Routes>
            <Route path="/listed-products" element={<ListedProducts />} />
            <Route path="/insert-products" element={<InsertProducts />} />
            <Route path="/manage-orders" element={<ManageOrders />} />
            <Route path="/offer-products" element={<OfferPorducts />} />
            <Route path="/user-list" element={<UserList />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
