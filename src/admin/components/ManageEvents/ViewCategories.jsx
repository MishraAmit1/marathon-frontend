import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ViewsCategory = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [eventTypes, setEventTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { darkMode } = useDarkMode();

  const contentClass = darkMode
    ? "bg-[#081A51] text-white"
    : "bg-white text-black";
  const tableClass = darkMode
    ? "bg-[#112c65] text-white border-gray-600"
    : "bg-[#f9fafb] text-black border-gray-300";
  const theadClass = darkMode
    ? "bg-[#071c3f] text-white border-2 border-[#0e2a55]"
    : "bg-[#f3f4f6] text-black border-2 border-[#d1d5db]";
  const trHoverClass = darkMode ? "hover:bg-[#1a2c56]" : "hover:bg-[#f1f5f9]"; // Hover effect for rows
  const selectClass = darkMode
    ? "w-full p-2 border border-gray-600 bg-[#071C3F] text-white rounded-lg"
    : "w-full p-2 border border-gray-300 bg-white text-black rounded-lg"; // For dropdown

  // Fetch all events and extract unique event types
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(`${API_BASE_URL}/event/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setEvents(res.data);
        // Extract unique event types
        const uniqueTypes = [
          ...new Set(res.data.map((event) => event.event_type)),
        ];
        setEventTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Error fetching events. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchEvents();
  }, []);

  // Fetch all categories by default or filtered categories based on event type
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Start loading
      try {
        const url =
          selectedEventType === ""
            ? `${API_BASE_URL}/category/all` // All categories
            : `${API_BASE_URL}/category/categories/${selectedEventType}`; // Filtered categories

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCategories(res.data);
        setError(""); // Clear error
        setSuccessMessage(""); // Reset success message
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchCategories();
  }, [selectedEventType]);

  // Handle Delete Action
  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`${API_BASE_URL}/category/delete/${categoryId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategories(categories.filter((cat) => cat.category_id !== categoryId));
      setSuccessMessage("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Error deleting category. Please try again.");
    }
  };

  // Handle Edit Action
  const handleEdit = (categoryId) => {
    navigate(`/edit-category/${categoryId}`);
  };

  return (
    <div className={`container mx-auto p-5 ${contentClass}`}>
      <h2 className="text-3xl font-bold mb-5">View Categories</h2>

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

      {/* Event Type Dropdown */}
      <div className="mb-4">
        <label htmlFor="event_type" className="block text-lg font-medium">
          Select Event Type:
        </label>
        <select
          id="event_type"
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value)}
          required
          className={selectClass}
        >
          <option value="">-- All Categories --</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-blue-100 text-blue-700 p-4 mb-4 rounded-md">
          Loading categories, please wait...
        </div>
      )}

      {/* Display Categories */}
      {categories.length === 0 ? (
        <div className="mt-5 bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow-md">
          No categories available.
        </div>
      ) : (
        <table
          className={`table-auto w-full mt-5 border-collapse ${tableClass} shadow-lg rounded-lg overflow-hidden`}
        >
          <thead
            className={`${theadClass} bg-gradient-to-r from-blue-600 to-blue-500`}
          >
            <tr>
              <th className="border-b-2 border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Category Name
              </th>
              <th className="border-b-2 border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Description
              </th>
              <th className="border-b-2 border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                From Age
              </th>
              <th className="border-b-2 border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                To Age
              </th>
              <th className="border-b-2 border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Is Active
              </th>
              <th className="border-b-2 border-gray-300 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category.category_id}
                className={`${trHoverClass} transition-colors duration-300`}
              >
                <td className="border-b border-gray-300 px-6 py-4 text-sm">
                  {category.category_name}
                </td>
                <td className="border-b border-gray-300 px-6 py-4 text-sm">
                  {category.category_description}
                </td>
                <td className="border-b border-gray-300 px-6 py-4 text-sm">
                  {category.from_age}
                </td>
                <td className="border-b border-gray-300 px-6 py-4 text-sm">
                  {category.to_age}
                </td>
                <td className="border-b border-gray-300 px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-4 py-2 rounded-lg text-white font-semibold ${
                      category.is_active ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {category.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="border-b border-gray-300 px-6 py-4 text-sm flex space-x-4">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-600 transition-all duration-200 px-5 py-2 rounded-lg shadow-md"
                    onClick={() => handleEdit(category.category_id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-500 to-red-400 text-white hover:bg-gradient-to-l hover:from-red-700 hover:to-red-600 transition-all duration-200 px-5 py-2 rounded-lg shadow-md"
                    onClick={() => handleDelete(category.category_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Message for category count */}
      {categories.length > 0 && (
        <div className="mt-5 bg-gradient-to-r from-gray-800 to-gray-700 text-white p-4 rounded-lg shadow-md text-lg">
          Total Categories: {categories.length}
        </div>
      )}
    </div>
  );
};

export default ViewsCategory;
