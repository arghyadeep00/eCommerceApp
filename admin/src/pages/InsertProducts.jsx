import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
const InsertProducts = () => {
  const { backendUrl } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    price: "",
    actualPrice: "",
    weight: "",
    image: null,
    rating: "",
    about: "",
    daydeal: false,
    newarrive: true,
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct Content-Type
          },
        }
      );
      if (response.data.success) {
        alert("Item added database");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Failed to upload product. Please try again.");
    } finally {
      setLoading(false);
      setFormData({
        category: "",
        description: "",
        price: "",
        actualPrice: "",
        weight: "",
        image: null,
        rating: "",
        about: "",
        daydeal: false,
        newarrive: true,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-3"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Chips">Chips</option>
            <option value="Juice">Juice</option>
            <option value="Snacks">Snacks</option>
            <option value="Spices">Spices</option>
            <option value="Sauces">Sauces</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-3"
            placeholder="e.g., Tomato Ketchup"
          />
        </div>

        {/* Price and Actual Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Actual Price ($)
            </label>
            <input
              type="number"
              name="actualPrice"
              value={formData.actualPrice}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-3"
            />
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight
          </label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-3"
            placeholder="e.g., 250g"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <input
            type="number"
            min="1"
            max="5"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-3"
            placeholder="e.g., 4.5"
          />
        </div>

        {/* About */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            About
          </label>
          <textarea
            name="about"
            rows={4}
            value={formData.about}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-3"
            placeholder="Details about the product"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Day Deal Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="daydeal"
            checked={formData.daydeal}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="daydeal"
            className="text-sm font-medium text-gray-700"
          >
            Day Deal
          </label>
        </div>

        {/* New Arrive Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="newarrive"
            checked={formData.newarrive}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="newarrive"
            className="text-sm font-medium text-gray-700"
          >
            New Arrival
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-md text-white transition duration-300 cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default InsertProducts;
