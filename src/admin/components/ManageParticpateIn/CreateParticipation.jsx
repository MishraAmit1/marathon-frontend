import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const CreateParticipation = () => {
  const { darkMode } = useDarkMode();
  const [events, setEvents] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    distance: "",
    category_id: "",
    event_id: "",
    starttime: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [existingData, setExistingData] = useState([]);

  // Fetch events and event types
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/event/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvents(res.data);

        const uniqueTypes = [
          ...new Set(res.data.map((event) => event.event_type)),
        ];
        setEventTypes(uniqueTypes);
      } catch (error) {
        setError("Error fetching events. Please try again.");
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (selectedEventType) {
      const fetchEvents = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/event/events/${selectedEventType}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setEvents(res.data);
        } catch (err) {
          setError("Error fetching events.");
        }
      };
      fetchEvents();
    }
  }, [selectedEventType]);

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
        } catch (error) {
          setError("Error fetching categories. Please try again.");
        }
      };
      fetchCategories();
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (selectedCategory) {
      const fetchExistingData = async () => {
        try {
          const res = await axios.get(
            `${API_BASE_URL}/participatein/entries/${selectedCategory}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("Fetched Existing Data: ", res.data);

          const combinedData = res.data.events.map((event) => {
            return {
              ...event,
              participationOptions: res.data.participationOptions.map(
                (option) => option.km
              ),
            };
          });

          setExistingData(combinedData);
        } catch (error) {
          setError(
            "Error fetching existing participation data. Please try again."
          );
        }
      };
      fetchExistingData();
    }
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.distance ||
      !formData.starttime ||
      !selectedCategory ||
      !selectedEvent
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const isDuplicate = existingData.some((data) =>
      data.participationOptions.includes(parseInt(formData.distance))
    );

    if (isDuplicate) {
      setError(
        `A participation option with ${formData.distance} KM already exists for this category.`
      );
      return;
    }

    const eventObj = events.find(
      (event) => event.event_id === parseInt(selectedEvent)
    );

    if (!eventObj) {
      alert("Invalid event selection.");
      return;
    }

    const formDataWithNumbers = {
      event_id: parseInt(selectedEvent),
      event_type: selectedEventType, // Add event_type
      category_id: parseInt(selectedCategory),
      km: parseInt(formData.distance),
      starttime: formData.starttime,
      isactive: 1, // Add isactive with default value
    };

    console.log("Form Data to be sent: ", formDataWithNumbers);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/participatein/create`,
        formDataWithNumbers,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log("Server response:", response.data); // Add this for debugging

      setSuccessMessage("Participation option created successfully!");
      setFormData({
        distance: "",
        category_id: "",
        event_id: "",
        starttime: "",
      });
      setSelectedEvent("");
      setSelectedEventType("");
      setSelectedCategory("");
      setError("");
    } catch (error) {
      console.error("Full error object:", error); // Add this for debugging
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Error creating participation option. Please try again.");
      }
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
        Create Participation Option
      </h2>

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
        <div className="mb-4">
          <label htmlFor="event_type" className="block text-lg font-medium">
            Select Event Type:
          </label>
          <select
            id="event_type"
            value={selectedEventType}
            onChange={(e) => {
              console.log("Selected event type:", e.target.value);
              setSelectedEventType(e.target.value);
              setCategories([]);
              setSelectedCategory("");
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

        <div className="mb-4">
          <label htmlFor="event_name" className="block text-lg font-medium">
            Select Event Name:
          </label>
          <select
            id="event_name"
            value={selectedEvent}
            onChange={(e) => {
              console.log("New selected event:", e.target.value);
              setSelectedEvent(e.target.value);
              setCategories([]);
              setSelectedCategory("");
            }}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="">-- Select Event --</option>
            {events.map((event) => (
              <option key={event.event_id} value={event.event_id}>
                {event.event_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-lg font-medium">
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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

        <div className="mb-4">
          <label htmlFor="distance" className="block text-lg font-medium">
            Select Distance (KM):
          </label>
          <select
            id="distance"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="">-- Select Distance --</option>
            <option value="5">5 KM</option>
            <option value="10">10 KM</option>
            <option value="21">21 KM</option>
            <option value="42">42 KM</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="starttime" className="block text-lg font-medium">
            Start Time:
          </label>
          <input
            type="datetime-local"
            id="starttime"
            name="starttime"
            value={formData.starttime}
            onChange={handleInputChange}
            required
            className={`w-full p-2 border border-gray-300 rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className={`w-full p-2 text-white rounded-lg ${
              darkMode ? "bg-[#1c64d4]" : "bg-[#4CAF50]"
            }`}
          >
            Create Participation Option
          </button>
        </div>

        {selectedCategory && existingData.length === 0 && (
          <div className="mt-5 bg-yellow-100 text-yellow-700 p-4 rounded-md">
            No participation data available for this category.
          </div>
        )}

        {selectedCategory && existingData.length > 0 && (
          <div className="mt-5">
            <h3 className="text-2xl font-semibold mb-3">
              Existing Participation Data:
            </h3>
            <ul className="space-y-3">
              {existingData.map((data) => (
                <li
                  key={data.event_id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="font-semibold">{data.event_name}</div>
                  <div className="text-gray-500">{data.event_type}</div>
                  <div className="mt-2">
                    <strong>Available Distances:</strong>
                    <ul className="list-disc ml-5">
                      {data.participationOptions.map((km, index) => (
                        <li key={index} className="text-gray-600">
                          {km} KM
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateParticipation;
