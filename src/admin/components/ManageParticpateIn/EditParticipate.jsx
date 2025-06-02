import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const EditParticipate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const participation = location.state; // Retrieve participation data
  const [formData, setFormData] = useState({
    event_id: participation.event_id,
    category_id: participation.category_id,
    km: participation.km,
    isactive: participation.isactive,
    starttime: participation.starttime,
  });
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const { darkMode } = useDarkMode(); // Get darkMode state from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/participatein/dropdown-data`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // Assuming the API returns `events` and `categories`
        setEvents(response.data.events);
        setCategories(response.data.categories);

        // Directly use the starttime received from the backend since it's in the right format
        const formattedStartTime = participation.starttime; // Already formatted as 'YYYY-MM-DDTHH:mm'

        setFormData({
          ...formData,
          starttime: formattedStartTime,
        });
      } catch (err) {
        setError("Failed to load dropdown data. Please try again.");
      }
    };

    fetchData();
  }, [participation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_BASE_URL}/participatein/update/${participation.participateinid}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.status === 200) {
        navigate("/view-participatein");
      }
    } catch (error) {
      setError("Error updating record. Please try again.");
    }
  };

  return (
    <div
      className={`max-w-xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Participation
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-bold mb-2">Event Type</label>
          <select
            name="event_id"
            value={formData.event_id}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value="">Select Event</option>
            {events.map((event) => (
              <option key={event.event_id} value={event.event_id}>
                {event.event_type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-bold mb-2">Distance (KM)</label>
          <input
            type="number"
            name="km"
            value={formData.km}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Start Time</label>
          <input
            type="datetime-local"
            name="starttime"
            value={formData.starttime}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Is Active</label>
          <select
            name="isactive"
            value={formData.isactive}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </select>
        </div>
        <button
          type="submit"
          className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
            darkMode ? "hover:bg-blue-700" : "hover:bg-blue-600"
          }`}
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate("/view-participatein")}
          className={`px-4 py-2 bg-gray-600 mx-4 text-white rounded-md ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-500"
          }`}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditParticipate;
