import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const CreateRegistration = () => {
  const { darkMode } = useDarkMode();
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [distances, setDistances] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    city: "",
    email: "",
    contactno: "",
    emergencyno: "",
    tshirtsize: "",
    bookingreference: "",
    participatein: "",
    selected_category: "",
    event_id: "",
    isactive: 1,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  // Fetch participation options (distances) based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const fetchParticipationOptions = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/participatein/entries/${selectedCategory}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("API Response:", res.data); // Log the API response

          // Extract unique distances from participation options
          if (
            res.data.participationOptions &&
            res.data.participationOptions.length > 0
          ) {
            const availableDistances = [
              ...new Set(
                res.data.participationOptions.map((option) => option.km)
              ),
            ];
            setDistances(availableDistances);
          } else {
            setDistances([]); // No distances available
          }
        } catch (error) {
          console.error("Error fetching distance options:", error);
          setError("Error fetching distance options. Please try again.");
        }
      };
      fetchParticipationOptions();
    } else {
      setDistances([]); // Clear distances when no category is selected
    }
  }, [selectedCategory]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedEvent ||
      !formData.selected_category ||
      !formData.participatein
    ) {
      alert("Please select event, category, and distance.");
      return;
    }

    // Add event_id and category_id to form data
    const registrationData = {
      ...formData,
      event_id: selectedEvent,
      category_id: formData.selected_category,
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/event-registration/register`,
        registrationData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setSuccessMessage("Registration successful!");
      setFormData({
        name: "",
        gender: "",
        dob: "",
        city: "",
        email: "",
        contactno: "",
        emergencyno: "",
        tshirtsize: "",
        bookingreference: "",
        participatein: "",
        selected_category: "",
        event_id: "",
      });
      setSelectedEventType("");
      setSelectedEvent("");
      setCategories([]);
    } catch (error) {
      console.error("Error creating registration:", error);
      setError(
        error.response?.data?.message ||
          "Error creating registration. Please try again."
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
        Create Registration
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
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-medium mb-1">
            Full Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-lg font-medium mb-1">
            Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dob" className="block text-lg font-medium mb-1">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="block text-lg font-medium mb-1">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label htmlFor="contactno" className="block text-lg font-medium mb-1">
            Contact Number:
          </label>
          <input
            type="text"
            id="contactno"
            name="contactno"
            value={formData.contactno}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        {/* Emergency Number */}
        <div className="mb-4">
          <label
            htmlFor="emergencyno"
            className="block text-lg font-medium mb-1"
          >
            Emergency Contact Number:
          </label>
          <input
            type="text"
            id="emergencyno"
            name="emergencyno"
            value={formData.emergencyno}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        {/* T-Shirt Size */}
        <div className="mb-4">
          <label
            htmlFor="tshirtsize"
            className="block text-lg font-medium mb-1"
          >
            T-Shirt Size:
          </label>
          <select
            id="tshirtsize"
            name="tshirtsize"
            value={formData.tshirtsize}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="">Select Size</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">X-Large</option>
            <option value="XXL">XX-Large</option>
          </select>
        </div>

        {/* Booking Reference */}
        <div className="mb-4">
          <label
            htmlFor="bookingreference"
            className="block text-lg font-medium mb-1"
          >
            Booking Reference:
          </label>
          <input
            type="text"
            id="bookingreference"
            name="bookingreference"
            value={formData.bookingreference}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

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

        {/* Category Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="selected_category"
            className="block text-lg font-medium mb-1"
          >
            Select Category:
          </label>
          <select
            id="selected_category"
            name="selected_category"
            value={formData.selected_category}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              handleInputChange(e);
            }}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="">-- Select a Category --</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="participatein"
            className="block text-lg font-medium mb-1"
          >
            Select Distance (KM):
          </label>
          <select
            id="participatein"
            name="participatein"
            value={formData.participatein}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="">-- Select Distance --</option>
            {distances.map((distance) => (
              <option key={distance} value={distance}>
                {distance} KM
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-3 mt-4 rounded-lg text-white font-bold ${
            darkMode ? "bg-blue-600" : "bg-blue-500"
          }`}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default CreateRegistration;
