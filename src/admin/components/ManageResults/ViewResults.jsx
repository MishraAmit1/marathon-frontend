import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ViewResults = () => {
  const [results, setResults] = useState([]);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),
    gender: "",
    eventId: "",
  });
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/event/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
    fetchResults();
  }, [filters.year, filters.gender, filters.eventId]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/results/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: filters,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString || timeString === "N/A") return "N/A";
    const [hours, minutes, seconds] = timeString.split(":");
    let date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const handleDelete = async (resultId) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      try {
        await axios.delete(`${API_BASE_URL}/results/delete/${resultId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchResults();
        alert("Result deleted successfully!");
      } catch (error) {
        console.error("Error deleting result:", error);
        alert("Error deleting result. Please try again.");
      }
    }
  };

  const handleEdit = (resultId) => {
    navigate(`/edit/${resultId}`);
  };

  return (
    <div
      className={`container mx-auto p-5 border rounded-lg shadow-md mt-5 ${
        darkMode ? "bg-[#081A51] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">View Results</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className={`p-2 border rounded w-full md:w-1/3 ${
            darkMode
              ? "bg-[#0f1a30] text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() - i
          ).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          className={`p-2 border rounded w-full md:w-1/4 ${
            darkMode
              ? "bg-[#0f1a30] text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <select
          value={filters.eventId}
          onChange={(e) => setFilters({ ...filters, eventId: e.target.value })}
          className={`p-2 border rounded w-full md:w-1/3 ${
            darkMode
              ? "bg-[#0f1a30] text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="">All Events</option>
          {events.map((event) => (
            <option key={event.event_id} value={event.event_id}>
              {event.event_name}
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
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left">Bib No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Race Time</th>
              <th className="p-3 text-left">City</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr
                key={result.resultId}
                className={
                  darkMode ? "hover:bg-[#1a2c56]" : "hover:bg-[#f1f5f9]"
                }
              >
                <td className="border-b p-3">
                  {new Date(result.entrydate).getFullYear()}
                </td>
                <td className="border-b p-3">{result.event_name || "N/A"}</td>
                <td className="border-b p-3">{result.bibno}</td>
                <td className="border-b p-3">{result.name}</td>
                <td className="border-b p-3">{result.gender}</td>
                <td className="border-b p-3">{formatTime(result.raceTime)}</td>
                <td className="border-b p-3">{result.city || "N/A"}</td>
                <td className="border-b p-3 flex items-center gap-2">
                  {new Date(result.entrydate).getFullYear() ===
                    new Date().getFullYear() && (
                    <>
                      <button
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm"
                        onClick={() => handleEdit(result.resultId)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                        onClick={() => handleDelete(result.resultId)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewResults;
