import React, { useState } from "react";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const CreateEvent = () => {
  const { darkMode } = useDarkMode();
  const [eventname, setEventname] = useState("");
  const [eventdate, setEventdate] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [eventtype, setEventtype] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [eventImage, setEventImage] = useState(null);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !eventname ||
      !eventdate ||
      !year ||
      !description ||
      !eventtype ||
      !location ||
      !time
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("event_name", eventname);
    formData.append("event_date", eventdate);
    formData.append("event_year", year);
    formData.append("event_description", description);
    formData.append("event_type", eventtype);
    formData.append("is_active", isActive);
    formData.append("location", location);
    formData.append("time", time);
    if (eventImage) formData.append("event_image", eventImage);

    console.log("Form Data:", {
      event_name: eventname,
      event_date: eventdate,
      event_year: year,
      event_description: description,
      event_type: eventtype,
      is_active: isActive,
      location,
      time,
      event_image: eventImage,
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/event/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage(response.data.message);
      setEventname("");
      setEventdate("");
      setYear("");
      setDescription("");
      setEventtype("");
      setIsActive(false);
      setEventImage(null);
      setLocation("");
      setTime("");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  const eventTypes = ["Running", "Swimming", "Cycling", "Triathlon"];

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
        Create New Event
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Event Name
            </label>
            <input
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
              placeholder="Enter event name"
              value={eventname}
              onChange={(e) => setEventname(e.target.value)}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Event Date
            </label>
            <input
              type="date"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
              value={eventdate}
              onChange={(e) => setEventdate(e.target.value)}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Year
            </label>
            <input
              type="number"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
              placeholder="Enter year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Event Type
            </label>
            <select
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
              value={eventtype}
              onChange={(e) => setEventtype(e.target.value)}
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Location
            </label>
            <input
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Time
            </label>
            <input
              type="time"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Event Description
            </label>
            <textarea
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Event Image
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
              onChange={(e) => setEventImage(e.target.files[0])}
            />
          </div>
          <div className="md:col-span-2 flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="mr-2"
            />
            <label
              className={`font-semibold ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Is Active
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className={`py-3 px-6 rounded-lg focus:outline-none transition duration-200 ${
              darkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-900 text-white hover:bg-blue-700"
            }`}
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
