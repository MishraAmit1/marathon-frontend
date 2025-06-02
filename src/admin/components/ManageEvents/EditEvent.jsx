import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const EditEvent = () => {
  const [event, setEvent] = useState({
    eventname: "",
    eventdate: "",
    year: "",
    description: "",
    isActive: false,
    eventType: "",
    eventImage: null,
    location: "",
    time: "",
  });
  const [newEventImage, setNewEventImage] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { eventId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const eventTypes = [
    "Running",
    "Swimming",
    "Cycling",
    "Triathlon",
    "Aquathon",
  ];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/event/event/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const fetchedEvent = response.data;
        if (fetchedEvent.event_date) {
          const eventDate = new Date(fetchedEvent.event_date);
          eventDate.setMinutes(
            eventDate.getMinutes() - eventDate.getTimezoneOffset()
          );
          fetchedEvent.event_date = eventDate.toISOString().split("T")[0];
        }
        fetchedEvent.isActive = fetchedEvent.isActive === 1;
        setEvent({
          eventname: fetchedEvent.event_name,
          eventdate: fetchedEvent.event_date,
          year: fetchedEvent.event_year,
          description: fetchedEvent.event_description,
          isActive: fetchedEvent.isActive,
          eventType: fetchedEvent.event_type,
          eventImage: fetchedEvent.event_image,
          location: fetchedEvent.location || "",
          time: fetchedEvent.time ? fetchedEvent.time.slice(0, 5) : "", // Extract HH:mm
        });
      } catch (error) {
        setError("Error fetching event details. Please try again.");
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (
      !event.year ||
      event.year.toString().length !== 4 ||
      isNaN(event.year)
    ) {
      setError("Please enter a valid 4-digit year.");
      return;
    }
    if (!event.location) {
      setError("Location is required.");
      return;
    }
    // Simple time validation using native JavaScript
    if (!event.time || !/^\d{2}:\d{2}$/.test(event.time)) {
      setError("Time must be a valid time (e.g., 14:30).");
      return;
    }

    const formData = new FormData();
    formData.append("event_name", event.eventname);
    formData.append("event_date", event.eventdate);
    formData.append("event_year", Number(event.year));
    formData.append("event_description", event.description);
    formData.append("is_active", event.isActive);
    formData.append("event_type", event.eventType);
    formData.append("location", event.location);
    formData.append("time", event.time); // Already in HH:mm format
    if (newEventImage) formData.append("event_image", newEventImage);

    try {
      const response = await axios.put(
        `${API_BASE_URL}/event/update/${eventId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage(response.data.message);
      setTimeout(() => navigate("/events"), 3000);
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message ||
            "Error updating event. Please try again."
        );
      } else {
        setError("Network error: Unable to update event.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]:
        name === "year"
          ? Number(value)
          : name === "isActive"
          ? value === "true"
          : value,
    });
  };

  const handleImageChange = (e) => {
    setNewEventImage(e.target.files[0]);
  };

  return (
    <div
      className={`container mx-auto mt-5 p-6 rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69]" : "bg-white"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-4 ${
          darkMode ? "text-white" : "text-gray-700"
        }`}
      >
        Edit Event
      </h2>

      {error && (
        <div
          className={`bg-red-100 text-red-700 p-4 mb-4 rounded-md ${
            darkMode ? "bg-red-700 text-white" : ""
          }`}
        >
          {error}
        </div>
      )}

      {successMessage && (
        <div
          className={`bg-green-100 text-green-700 p-4 mb-4 rounded-md ${
            darkMode ? "bg-green-700 text-white" : ""
          }`}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Event Name
          </label>
          <input
            type="text"
            name="eventname"
            value={event.eventname}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Event Date
          </label>
          <input
            type="date"
            name="eventdate"
            value={event.eventdate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Year
          </label>
          <input
            type="number"
            name="year"
            value={event.year}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Time
          </label>
          <input
            type="time"
            name="time"
            value={event.time}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Description
          </label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Current Event Image
          </label>
          {event.eventImage ? (
            <img
              src={`${API_BASE_URL}${event.eventImage}`}
              alt="Current Event"
              className="w-32 h-32 object-cover mb-2"
            />
          ) : (
            <p
              className={`${darkMode ? "text-white" : "text-gray-500"} italic`}
            >
              No image available
            </p>
          )}
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            New Image (Optional)
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e) => setNewEventImage(e.target.files[0])}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Status
          </label>
          <select
            name="isActive"
            value={event.isActive}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Event Type
          </label>
          <select
            name="eventType"
            value={event.eventType}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value="">Select Event Type</option>
            {eventTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            darkMode ? "hover:bg-blue-600" : "hover:bg-blue-700"
          }`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
