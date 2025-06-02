import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const EditCategory = () => {
  const { categoryId } = useParams(); // Get categoryId from URL
  const navigate = useNavigate(); // For navigation after update
  const { darkMode } = useDarkMode(); // Get darkMode state from context

  const [categoryData, setCategoryData] = useState({
    category_name: "",
    category_description: "",
    from_age: "",
    to_age: "",
    is_active: 1,
    event_id: "",
  });
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch category details by ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/category/category/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategoryData(res.data); // Pre-fill the form
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch category details."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [categoryId]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
    setError(""); // Clear errors when user modifies inputs
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure from_age < to_age
    if (parseInt(categoryData.from_age) >= parseInt(categoryData.to_age)) {
      setError("From Age must be less than To Age.");
      return;
    }

    try {
      await axios.put(
        `${API_BASE_URL}/category/update/${categoryId}`,
        categoryData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuccessMessage("Category updated successfully!");
      setTimeout(() => {
        navigate("/category-views");
      }, 2000); // Redirect after 3 seconds
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update category. Please try again."
      );
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5">Edit Category</h2>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-md">
          {error}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium mb-2">
            Category Name:
          </label>
          <input
            type="text"
            name="category_name"
            value={categoryData.category_name}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Description:</label>
          <textarea
            name="category_description"
            value={categoryData.category_description}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">From Age:</label>
          <input
            type="number"
            name="from_age"
            value={categoryData.from_age}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">To Age:</label>
          <input
            type="number"
            name="to_age"
            value={categoryData.to_age}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Event ID:</label>
          <input
            type="number"
            name="event_id"
            disabled
            value={categoryData.event_id}
            onChange={handleChange}
            className={`hover:disabled disabled:cursor-not-allowed w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium mb-2">Is Active:</label>
          <select
            name="is_active"
            value={categoryData.is_active}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Update Category
        </button>
        <button
          type="button"
          onClick={() => navigate("/category-views")}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
