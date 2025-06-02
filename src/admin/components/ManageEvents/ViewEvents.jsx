import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ViewEvent = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/event/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString || timeString === "N/A") return "N/A";
    // Convert time string (e.g., "15:24:00") to Date object
    const [hours, minutes] = timeString.split(":");
    let date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredEvents = events.filter(
    (event) =>
      event.event_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (eventType === "" ||
        event.event_type.toLowerCase() === eventType.toLowerCase())
  );

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${API_BASE_URL}/event/delete/${eventId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(events.filter((event) => event.event_id !== eventId));
        alert("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Error deleting event. Please try again.");
      }
    }
  };

  return (
    <div
      className={`container mx-auto p-5 border rounded-lg shadow-md mt-5 ${
        darkMode ? "bg-[#081A51] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">All Events</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Event Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`p-2 border rounded w-full md:w-1/3 ${
            darkMode
              ? "bg-[#0f1a30] text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        />
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className={`p-2 border rounded w-full md:w-1/4 ${
            darkMode
              ? "bg-[#0f1a30] text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="">All Event Types</option>
          {[...new Set(events.map((event) => event.event_type))].map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table
          className={`min-w-full table-auto border-collapse ${
            darkMode ? "bg-[#112c65] text-white" : "bg-[#f9fafb] text-black"
          } rounded-lg overflow-hidden`}
        >
          <thead
            className={
              darkMode ? "bg-[#071c3f] text-white" : "bg-[#f3f4f6] text-black"
            }
          >
            <tr>
              <th className="p-3 text-left">Event ID</th>
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left">Event Date</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Event Type</th>
              <th className="p-3 text-left">Event Image</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr
                key={event.event_id}
                className={
                  darkMode ? "hover:bg-[#1a2c56]" : "hover:bg-[#f1f5f9]"
                }
              >
                <td className="border-b p-3">{event.event_id}</td>
                <td className="border-b p-3">{event.event_name}</td>
                <td className="border-b p-3">{formatDate(event.event_date)}</td>
                <td className="border-b p-3">{event.event_year}</td>
                <td className="border-b p-3">{event.location || "N/A"}</td>
                <td className="border-b p-3">{formatTime(event.time)}</td>
                <td className="border-b p-3">{event.event_description}</td>
                <td className="border-b p-3">{event.event_type}</td>
                <td className="border-b p-3">
                  {event.event_image ? (
                    <img
                      src={`${API_BASE_URL}${event.event_image}`}
                      alt={event.event_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span
                      className={`${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      } italic`}
                    >
                      No image
                    </span>
                  )}
                </td>
                <td className="border-b p-3 flex items-center gap-2">
                  <button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm"
                    onClick={() => navigate(`/edit-event/${event.event_id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                    onClick={() => handleDelete(event.event_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEvent;
