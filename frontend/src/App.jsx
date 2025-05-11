import { Routes, Route } from "react-router-dom";
import DayDeals from "./components/DayDeals";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Pages from "./pages/Pages";
import Blog from "./pages/Blog";
import Offers from "./pages/Offers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import { ToastContainer } from "react-toastify";
import Page404 from "./pages/Page404";
import ProtectedRoute from "./protectedRout/ProtectedRoute";
function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<Products />} />
        <Route path="/pages" element={<Pages />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/register" element={<Register />} />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
