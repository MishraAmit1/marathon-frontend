import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const EditRegistration = () => {
  const { registrationId } = useParams(); // Get registration ID from URL
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

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
    event_name: "", // Updated field
    category_name: "", // Updated field
    distance: "",
    isactive: true,
  });

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [distances, setDistances] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
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

  // Fetch registration details
  // Fetch registration details - only runs once at component mount
  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/event-registration/${registrationId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const formattedData = {
          ...response.data,
          dob: formatDate(response.data.dob),
          isactive: response.data.isactive === 1,
          event_type: response.data.event_type || "", // Handle new field
          distance: response.data.distance || "", // Handle new field
        };

        setFormData(formattedData);

        // Find the event that matches the registration
        const event = events.find((e) => e.event_id === response.data.event_id);
        if (event) {
          setSelectedEventType(event.event_type);
          setSelectedEvent(event.event_id.toString());
        }

        setSelectedCategory(response.data.category_id.toString());
        setInitialDataLoaded(true);
      } catch (err) {
        setError("Failed to fetch registration details.");
      } finally {
        setLoading(false);
      }
    };

    if (events.length > 0 && !initialDataLoaded) {
      fetchRegistration();
    }
  }, [registrationId, events, initialDataLoaded]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero
    const day = d.getDate().toString().padStart(2, "0"); // Add leading zero
    return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEventTypeChange = (e) => {
    const value = e.target.value;
    setSelectedEventType(value);
    setSelectedEvent(""); // Reset selected event
    setSelectedCategory(""); // Reset selected category
    setFormData((prev) => ({
      ...prev,
      event_name: "",
      category_name: "",
      participatein: "",
      event_type: value,
    }));
  };

  const handleEventChange = (e) => {
    const value = e.target.value;
    setSelectedEvent(value);
    setSelectedCategory(""); // Reset selected category
    setFormData((prev) => ({
      ...prev,
      event_name: value,
      category_name: "",
      participatein: "",
    }));
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setFormData((prev) => ({
      ...prev,
      category_name: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find the event name from the selected event ID
      const selectedEventObj = events.find(
        (event) => event.event_id.toString() === selectedEvent
      );
      const payload = {
        ...formData,
        event_name: selectedEventObj?.event_name, // Send event_name instead of event_id
        category_name: categories.find(
          (cat) => cat.category_id.toString() === selectedCategory
        )?.category_name, // Send category_name instead of category_id
        event_type: selectedEventType,
        distance: formData.participatein,
      };
      await axios.put(
        `${API_BASE_URL}/event-registration/update/${registrationId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Registration updated successfully!");
      setTimeout(() => {
        navigate("/views-event-registrations"); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Error updating registration:", error.response?.data);
      setError("Failed to update registration. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold mb-5">Edit Registration</h2>
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
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-lg font-medium mb-2">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Date of Birth:
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-lg font-medium mb-2">City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>

        {/* Contact No */}
        <div>
          <label className="block text-lg font-medium mb-2">Contact No:</label>
          <input
            type="number"
            name="contactno"
            value={formData.contactno}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>

        {/* Emergency No */}
        <div>
          <label className="block text-lg font-medium mb-2">
            Emergency No:
          </label>
          <input
            type="number"
            name="emergencyno"
            value={formData.emergencyno}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>

        {/* T-Shirt Size */}
        <div>
          <label className="block text-lg font-medium mb-2">
            T-Shirt Size:
          </label>
          <select
            name="tshirtsize"
            value={formData.tshirtsize}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
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
        <div>
          <label className="block text-lg font-medium mb-2">
            Booking Reference:
          </label>
          <input
            type="text"
            name="bookingreference"
            value={formData.bookingreference}
            onChange={handleChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          />
        </div>

        {/* Event Type Dropdown */}
        <div>
          <label className="block text-lg font-medium mb-2">Event Type:</label>
          <select
            value={selectedEventType}
            onChange={handleEventTypeChange}
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69]" : "bg-white"
            }`}
            required
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Event Name Dropdown */}
        {selectedEventType && (
          <div>
            <label className="block text-lg font-medium mb-2">
              Event Name:
            </label>
            <select
              value={selectedEvent}
              onChange={handleEventChange}
              className={`w-full p-2 border border-gray-300 rounded-lg ${
                darkMode ? "bg-[#132D69]" : "bg-white"
              }`}
              required
            >
              <option value="">Select Event</option>
              {filteredEvents.map((event) => (
                <option key={event.event_id} value={event.event_id}>
                  {event.event_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Category Dropdown */}
        {selectedEvent && (
          <div>
            <label className="block text-lg font-medium mb-2">Category:</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className={`w-full p-2 border border-gray-300 rounded-lg ${
                darkMode ? "bg-[#132D69]" : "bg-white"
              }`}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Distance Dropdown */}
        {selectedCategory && (
          <div>
            <label className="block text-lg font-medium mb-2">
              Distance (KM):
            </label>
            <select
              name="participatein"
              value={formData.participatein}
              onChange={handleChange}
              className={`w-full p-2 border border-gray-300 rounded-lg ${
                darkMode ? "bg-[#132D69]" : "bg-white"
              }`}
              required
            >
              <option value="">Select Distance</option>
              {distances.map((distance) => (
                <option key={distance} value={distance}>
                  {distance} KM
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Active Checkbox */}
        <div>
          <label>
            Active:
            <input
              type="checkbox"
              checked={formData.isactive}
              onChange={(e) =>
                setFormData({ ...formData, isactive: e.target.checked })
              }
            />
          </label>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Update Registration
          </button>
          <button
            type="button"
            onClick={() => navigate("/views-event-registrations")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRegistration;
