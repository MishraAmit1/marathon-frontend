import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const BrowseEvents = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const eventTypeFromQuery = queryParams.get("type") || "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/event/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEvents(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (eventTypeFromQuery) setEventType(eventTypeFromQuery.toLowerCase());
    else setEventType("");
  }, [eventTypeFromQuery]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "long" }),
      year: date.getFullYear(),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const formatTime = (timeString) => {
    if (!timeString || timeString === "N/A") return "9:00 AM"; // Default to 9:00 AM
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

  const getEventTypeColor = (type) => {
    const typeToLower = type.toLowerCase();
    if (typeToLower.includes("marathon")) return "bg-blue-500";
    if (typeToLower.includes("walk")) return "bg-green-600";
    if (typeToLower.includes("fun")) return "bg-green-600";
    if (typeToLower.includes("run")) return "bg-green-600";
    if (typeToLower.includes("sprint")) return "bg-yellow-500";
    if (typeToLower.includes("half")) return "bg-purple-500";
    if (typeToLower.includes("ultra")) return "bg-red-500";
    if (typeToLower.includes("trail")) return "bg-emerald-500";
    return "bg-gray-500";
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and register for upcoming running events in your area
          </p>
        </div>
        {loading && (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
          </div>
        )}
        {error && (
          <div className="p-4 mb-8 text-red-700 bg-red-100 rounded-lg text-center max-w-2xl mx-auto">
            <p className="font-medium">{error}</p>
          </div>
        )}
        {!loading && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 w-full md:w-auto">
                <span className="text-gray-700 font-medium">Filter By:</span>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white w-full md:w-56"
                >
                  <option value="">All Event Types</option>
                  {[...new Set(events.map((event) => event.event_type))].map(
                    (type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    )
                  )}
                </select>
              </div>
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by Event Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => {
                  const formattedDate = formatDate(event.event_date);
                  return (
                    <div
                      key={event.event_id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                      <div className="flex">
                        <div className="flex-none w-24 bg-green-600 text-white flex flex-col items-center justify-center p-4">
                          <span className="text-4xl font-bold leading-none">
                            {formattedDate.day}
                          </span>
                          <span className="text-sm uppercase font-medium">
                            {formattedDate.month}
                          </span>
                          <span className="text-sm">{formattedDate.year}</span>
                        </div>
                        <div className="flex-grow h-40 relative">
                          <img
                            src={
                              event.event_image
                                ? `${API_BASE_URL}${event.event_image}`
                                : "/api/placeholder/600/400"
                            }
                            alt={event.event_name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2">
                            <span
                              className={`text-xs font-bold uppercase text-white px-2 py-1 rounded-full ${getEventTypeColor(
                                event.event_type
                              )}`}
                            >
                              {event.event_type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {event.event_name}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <svg
                            className="h-5 w-5 mr-2 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{formatTime(event.time)}</span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <svg
                            className="h-5 w-5 mr-2 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>
                            {event.location || "Location not specified"}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6 line-clamp-2">
                          {event.event_description ||
                            "No description available."}
                        </p>
                      </div>
                      <div className="px-6 pb-6">
                        <button
                          onClick={() =>
                            navigate(`/user/register/${event.event_id}`)
                          }
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                          <span>Register Now</span>
                          <svg
                            className="ml-2 h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No events found
                </h3>
                <p className="mt-2 text-gray-600">
                  No events match your current search criteria. Try adjusting
                  your filters.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseEvents;
