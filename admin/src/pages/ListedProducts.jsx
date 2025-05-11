import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
const ListedProducts = () => {
  const { backendUrl } = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `${backendUrl}/api/admin/get-food-items`
        );
        setProducts(result.data.response);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Please try again later.");
      }
    };
    getData();
  }, [backendUrl]);

  const handleEdit = (productId) => {
    const product = products.find((p) => p._id === productId);
    setEditProduct(product);
    setFormData({
      category: product.category,
      description: product.description,
      price: product.price,
      actualPrice: product.actualPrice,
      details: product.details,
      rating: product.rating,
      about: product.about,
      daydeal: product.daydeal || false,
      newarrive: product.newarrive || false,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `${backendUrl}/api/admin/update-item/${editProduct._id}`,
        formData
      );
      if (res.data.success) {
        setProducts((prev) =>
          prev.map((item) =>
            item._id === editProduct._id ? { ...item, ...formData } : item
          )
        );
        setEditProduct(null);
      } else {
        toast.success("Update filed");
      }
    } catch (err) {
      toast.error("Server error while updating");
    }
  };

  const deleteFoodItem = async (_id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/admin/delete-item/${_id}`
      );
      if (response.data.success) {
        toast.success("Item deleted");
        setProducts((prevItem) => prevItem.filter((item) => item._id !== _id));
      }
    } catch (error) {
      toast.error("Server problem");
    }
  };

  return (
    <>
      <div className="relative max-w-7xl mx-auto p-4 bg-white rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Product List
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Others</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Actual Price</th>
                <th className="px-4 py-3 text-left">Weight</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">About</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={
                        product.image?.[0]?.url ||
                        "https://via.placeholder.com/80"
                      }
                      alt={product.description || "Product Image"}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-3">{product._id.slice(5, 10)}</td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">{product.description}</td>
                  <td className="px-4 py-3">
                    {product.daydeal && (
                      <p className="text-xs text-orange-600">DayDeal</p>
                    )}
                    {product.newarrive && (
                      <p className="text-xs text-green-600">NewArrive</p>
                    )}
                  </td>
                  <td className="px-4 py-3">$ {product.price}</td>
                  <td className="px-4 py-3">$ {product.actualPrice}</td>
                  <td className="px-4 py-3">{product.details}</td>
                  <td className="px-4 py-3">{product.rating}</td>
                  <td className="px-4 py-3">
                    {product.about.split(" ").slice(0, 5).join(" ")}
                    {product.about.split(" ").length > 5 && "..."}
                  </td>
                  <td className="px-4 py-3 space-x-2 flex">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      onClick={() => {
                        if (
                          window.confirm("Are you sure to delete this item?")
                        ) {
                          deleteFoodItem(product._id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="12" className="text-center py-4 text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {editProduct && (
          <div className="edit-field fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Edit Product</h3>

              {[
                "category",
                "description",
                "price",
                "actualPrice",
                "details",
                "rating",
                "about",
              ].map((field) => (
                <div key={field} className="mb-4 flex gap-5 items-center">
                  <label className="block  text-sm font-medium mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    type={
                      field.includes("price") || field === "rating"
                        ? "number"
                        : "text"
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              ))}

              {/* Checkbox for daydeal */}
              <div className="mb-4">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="daydeal"
                    checked={formData.daydeal}
                    onChange={handleChange}
                  />
                  Day Deal
                </label>
              </div>

              {/* Checkbox for newarrive */}
              <div className="mb-4">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="newarrive"
                    checked={formData.newarrive}
                    onChange={handleChange}
                  />
                  New Arrive
                </label>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEditProduct(null)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ListedProducts;
