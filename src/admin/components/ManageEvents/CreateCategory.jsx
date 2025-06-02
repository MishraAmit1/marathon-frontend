import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext"; // Importing the DarkModeContext
import { API_BASE_URL } from "../../../config/api.js";

const CreateCategory = () => {
  const { darkMode } = useDarkMode(); // Access darkMode state
  const [events, setEvents] = useState([]); // All events
  const [eventTypes, setEventTypes] = useState([]); // Unique event types
  const [filteredEvents, setFilteredEvents] = useState([]); // Events filtered by type
  const [categories, setCategories] = useState([]); // Categories for selected event
  const [selectedEventType, setSelectedEventType] = useState(""); // Selected event type
  const [selectedEvent, setSelectedEvent] = useState(""); // Selected event
  const [formData, setFormData] = useState({
    category_name: "",
    category_description: "",
    from_age: "",
    to_age: "",
    is_active: 1,
  });

  const [error, setError] = useState(""); // To track errors
  const [successMessage, setSuccessMessage] = useState(""); // To track success messages

  // Fetch all events and extract unique event types
  useEffect(() => {
    const fetchEvents = async () => {
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
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on selected event type
  useEffect(() => {
    if (selectedEventType) {
      const filtered = events.filter(
        (event) => event.event_type === selectedEventType
      );
      setFilteredEvents(filtered);
      setSelectedEvent(""); // Reset selected event when event type changes
    } else {
      setFilteredEvents([]);
    }
  }, [selectedEventType, events]);

  // Fetch categories based on selected event
  useEffect(() => {
    if (selectedEvent) {
      const fetchCategories = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/category/event/${selectedEvent}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setCategories(res.data);
          setError(""); // Clear error when fetch is successful
        } catch (error) {
          console.error("Error fetching categories:", error);
          setError("Error fetching categories. Please try again.");
        }
      };
      fetchCategories();
    } else {
      setCategories([]); // Clear categories when no event is selected
    }
  }, [selectedEvent]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    try {
      const formDataWithNumbers = {
        ...formData,
        from_age: Number(formData.from_age),
        to_age: Number(formData.to_age),
        event_id: selectedEvent, // Add event_id to form data
      };

      const res = await axios.post(
        `${API_BASE_URL}/category/create`,
        formDataWithNumbers,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setSuccessMessage("Category created successfully!");
      setFormData({
        category_name: "",
        category_description: "",
        from_age: "",
        to_age: "",
        is_active: 1,
      });
      setSelectedEventType("");
      setSelectedEvent("");
      setCategories([]); // Clear categories after new creation
    } catch (error) {
      console.error("Error creating category:", error);
      setError(
        error.response?.data?.message ||
          "Error creating category. Please try again."
      );
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69]" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-9 text-center ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Create Category
      </h2>

      {/* Error Message */}
      {error && (
        <div
          className={`p-4 mb-4 rounded-md ${
            darkMode ? "bg-red-700 text-white" : "bg-red-100 text-red-700"
          }`}
        >
          {error}
        </div>
      )}
      {successMessage && (
        <div
          className={`p-4 mb-4 rounded-md ${
            darkMode ? "bg-green-700 text-white" : "bg-green-100 text-green-700"
          }`}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Type Dropdown */}
        <div className="mb-4">
          <label htmlFor="event_type" className="block text-lg font-medium">
            Select Event Type:
          </label>
          <select
            id="event_type"
            value={selectedEventType}
            onChange={(e) => {
              setSelectedEventType(e.target.value);
              setSelectedEvent(""); // Reset selected event
              setCategories([]); // Clear existing categories
            }}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="">-- Select an Event Type --</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Event Name Dropdown */}
        {selectedEventType && (
          <div className="mb-4">
            <label htmlFor="event_name" className="block text-lg font-medium">
              Select Event Name:
            </label>
            <select
              id="event_name"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              required
              className={`w-full p-2 border border-gray-300 rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            >
              <option value="">-- Select an Event --</option>
              {filteredEvents.map((event) => (
                <option key={event.event_id} value={event.event_id}>
                  {event.event_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category Name */}
        <div className="mb-4">
          <label
            htmlFor="category_name"
            className="block text-lg font-medium mb-1"
          >
            Category Name:
          </label>
          <input
            type="text"
            id="category_name"
            name="category_name"
            value={formData.category_name}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        {/* Category Description */}
        <div className="mb-4">
          <label
            htmlFor="category_description"
            className="block text-lg font-medium mb-1"
          >
            Category Description:
          </label>
          <textarea
            id="category_description"
            name="category_description"
            value={formData.category_description}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          ></textarea>
        </div>

        {/* Age Range */}
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="from_age"
              className={`block text-lg font-medium mb-1 ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            >
              From Age:
            </label>
            <input
              type="number"
              id="from_age"
              name="from_age"
              value={formData.from_age}
              onChange={handleInputChange}
              required
              className={`w-full p-2 border border-gray-300 rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label htmlFor="to_age" className="block text-lg font-medium mb-1">
              To Age:
            </label>
            <input
              type="number"
              id="to_age"
              name="to_age"
              value={formData.to_age}
              onChange={handleInputChange}
              required
              className={`w-full p-2 border border-gray-300 rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
        </div>

        {/* Active Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active === 1}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  is_active: e.target.checked ? 1 : 0,
                }))
              }
              className="form-checkbox"
            />
            <span className="ml-2 text-lg">Active</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Create Category
        </button>
      </form>

      {/* Display Categories */}
      {categories.length === 0 && selectedEvent && (
        <div className="mt-5 bg-yellow-100 text-yellow-700 p-4 rounded-md">
          No categories added for this event yet.
        </div>
      )}

      {categories.length > 0 && (
        <div className="mt-5">
          <h3 className="text-2xl font-semibold mb-3">
            Categories for Selected Event:
          </h3>
          <ul className="space-y-3">
            {categories.map((category) => (
              <li
                key={category.category_id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <strong>{category.category_name}</strong> -{" "}
                {category.category_description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
