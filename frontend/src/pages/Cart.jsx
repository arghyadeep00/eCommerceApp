import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/icons/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, setCartItems, backendUrl } = useContext(StoreContext);
  const [quantities, setQuantities] = useState({});
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const result = await axios.get(`${backendUrl}/api/user/get-food-items`, {
        withCredentials: true,
      });
      setFoodList(result.data.response);
    };
    getData();
  }, []);

  useEffect(() => {
    const newQuantities = { ...quantities };
    cartItems.forEach((_id) => {
      if (!newQuantities[_id]) {
        newQuantities[_id] = 1;
      }
    });
    setQuantities(newQuantities);
  }, [cartItems]);

  const handleItemRemove = (_id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item !== _id));
    setQuantities((prev) => {
      const updated = { ...prev };
      delete updated[_id];
      return updated;
    });
  };

  const handleIncreaseQuantity = (_id) => {
    setQuantities((prev) => ({
      ...prev,
      [_id]: (prev[_id] || 1) + 1,
    }));
  };

  const handleDecreaseQuantity = (_id) => {
    setQuantities((prev) => ({
      ...prev,
      [_id]: Math.max((prev[_id] || 1) - 1, 1),
    }));
  };

  const subtotal = foodList.reduce((total, item) => {
    if (cartItems.includes(item._id)) {
      const price = parseFloat(item.price) || 0;
      const quantity = quantities[item._id] || 1;
      return total + price * quantity;
    }
    return total;
  }, 0);

  const deliveryCharge = 20;
  const totalAmount = subtotal + deliveryCharge;

  // ====== Object: itemId -> quantity ======
  const cartData = cartItems.reduce((acc, itemId) => {
    if (quantities[itemId]) {
      acc[itemId] = quantities[itemId];
    }
    return acc;
  }, {});

  // ====== Object: itemId -> { quantity, description, price } ======
  const cartDetails = cartItems.reduce((acc, itemId) => {
    const item = foodList.find((f) => f._id === itemId);
    if (item) {
      acc[itemId] = {
        quantity: quantities[itemId],
        description: item.description,
        price: parseFloat(item.price),
      };
    }
    return acc;
  }, {});

  const handleOnCartData = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/cart-data`,
        cartDetails,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="w-full">
      <div className="w-[80%] m-auto">
        <div className="flex mt-5 gap-4 items-stretch">
          {/* Summary Section */}
          <div className="summary w-[25vw] rounded-md border p-4 h-full">
            <h5 className="font-bold text-center border-b pb-2">Summary</h5>
            <div className="p-3 flex flex-col gap-4">
              <div className="flex justify-between">
                <h5>Sub-Total</h5>
                <div>${subtotal.toFixed(2)}</div>
              </div>
              <hr />
              <div className="flex justify-between">
                <h5>Delivery Charges</h5>
                <div>${deliveryCharge.toFixed(2)}</div>
              </div>
              <hr />
              <div className="flex justify-between font-bold">
                <h5>Total Amount</h5>
                <div>${totalAmount.toFixed(2)}</div>
              </div>
              <hr />
              <button
                className="px-3 py-3 bg-[#ff954d] font-semibold rounded-md"
                onClick={handleOnCartData}
              >
                Place Order
              </button>
            </div>
          </div>

          {/* Products Section */}
          <div className="products w-full border rounded-md p-4 h-full overflow-y-auto max-h-[80vh]">
            {cartItems.length === 0 ? (
              <p className="text-center text-2xl font-semibold">
                Cart is empty
              </p>
            ) : (
              <table className="text-sm w-full text-gray-500 text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {foodList
                    .filter((item) => cartItems.includes(item._id))
                    .map((item) => {
                      const quantity = quantities[item._id] || 1;
                      const price = parseFloat(item.price) || 0;
                      const total = price * quantity;

                      return (
                        <tr key={item._id} className="bg-white border-b">
                          <td className="px-4 py-3 flex items-center gap-2">
                            <img
                              src={item.image[0].url}
                              className="w-16 h-16 object-cover"
                              alt={item.description}
                            />
                            <span>{item.description}</span>
                          </td>
                          <td className="px-4 py-3">${price.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                className="px-2 py-1 bg-gray-200"
                                onClick={() => handleDecreaseQuantity(item._id)}
                              >
                                -
                              </button>
                              <span>{quantity}</span>
                              <button
                                className="px-2 py-1 bg-gray-200"
                                onClick={() => handleIncreaseQuantity(item._id)}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3">${total.toFixed(2)}</td>
                          <td className="px-4 py-3 text-red-600 cursor-pointer">
                            <img
                              src={assets.trash}
                              className="w-5 ml-4"
                              alt="Remove"
                              onClick={() => handleItemRemove(item._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
