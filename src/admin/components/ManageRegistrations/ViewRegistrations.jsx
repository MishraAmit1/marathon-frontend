import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ViewRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const contentClass = darkMode
    ? "bg-[#081A51] text-white"
    : "bg-white text-black";
  const tableClass = darkMode
    ? "bg-[#112c65] text-white border-gray-600"
    : "bg-[#f9fafb] text-black border-gray-300";
  const theadClass = darkMode
    ? "bg-[#071c3f] text-white border-2 border-[#0e2a55]"
    : "bg-[#f3f4f6] text-black border-2 border-[#d1d5db]";
  const trHoverClass = darkMode ? "hover:bg-[#1a2c56]" : "hover:bg-[#f1f5f9]";
  const selectClass = darkMode
    ? "md:w-[20%] w-full p-2 border border-gray-600 bg-[#071C3F] text-white rounded-lg"
    : "md:w-[20%] w-full p-2 border border-gray-300 bg-white text-black rounded-lg";

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/event-registration/all-registrations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRegistrations(res.data.data);
      } catch (error) {
        console.error(
          "Error fetching registrations:",
          error.response?.data || error.message
        );
        setError("Unable to fetch registrations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleDelete = async (registrationId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/event-registration/delete/${registrationId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRegistrations(
        registrations.filter((reg) => reg.registrationid !== registrationId)
      );
    } catch (error) {
      setError("Error deleting registration.");
    }
  };

  const handleEdit = (registrationId) => {
    navigate(`/edit-event-registrations/${registrationId}`);
  };

  // Filter registrations based on search query and selected event name
  const filteredRegistrations = registrations
    .filter((reg) => reg.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((reg) =>
      selectedEventName ? reg.event_name === selectedEventName : true
    );

  // Extract unique event names for the dropdown
  const uniqueEventNames = [
    ...new Set(registrations.map((reg) => reg.event_name)),
  ];

  return (
    <div className={`container mx-auto p-5 ${contentClass}`}>
      <h2 className="text-3xl font-bold mb-5">View Registrations</h2>

      {/* Search and Dropdown */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by Name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full md:w-1/3 p-2 border ${
            darkMode
              ? "border-gray-600 bg-[#071C3F] text-white"
              : "border-gray-400 bg-white text-black"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />

        {/* Dropdown to filter by event name */}
        <select
          value={selectedEventName}
          onChange={(e) => setSelectedEventName(e.target.value)}
          className={selectClass}
        >
          <option value="">Select Event Name</option>
          {uniqueEventNames.map((eventName) => (
            <option key={eventName} value={eventName}>
              {eventName}
            </option>
          ))}
        </select>
      </div>

      {/* Error and Success Messages */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded-md">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 text-green-700 p-4 mb-4 rounded-md">
          {successMessage}
        </div>
      )}

      {loading ? (
        <div className="bg-blue-100 text-blue-700 p-4 mb-4 rounded-md">
          Loading Registration details, please wait...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table
            className={`table-auto w-full mt-5 border-collapse ${tableClass} shadow-lg rounded-lg overflow-hidden`}
          >
            <thead
              className={`${theadClass} bg-gradient-to-r from-blue-600 to-blue-500`}
            >
              <tr>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Name
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Email
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Gender
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  D-O-B
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  City
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Contact no
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Emergencyno
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Tshirtsize
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Bookingreference
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Participatein
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Event Type
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Event Name
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Category
                </th>
                {/* <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Distance
                </th> */}
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Status
                </th>
                <th className="border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map((registration, index) => (
                <tr
                  key={`${registration.registrationid}-${index}`}
                  className={`${trHoverClass} transition-colors duration-300`}
                >
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.name}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.email}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.gender}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {new Date(registration.dob).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.city}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.contactno}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.emergencyno}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.tshirtsize}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.bookingreference}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.participatein} km
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.event_type}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.event_name}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {registration.category_name}
                  </td>

                  <td className="border-b border-gray-300 px-4 py-3 text-sm">
                    {Number(registration.isactive) === 1
                      ? "Active"
                      : "Inactive"}
                  </td>
                  <td className="border-b p-3 flex items-center gap-2">
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:bg-gradient-to-l hover:from-blue-700 hover:to-blue-600 transition-all duration-200 px-3 py-1 rounded-lg shadow-md text-sm"
                      onClick={() => handleEdit(registration.registrationid)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-gradient-to-r from-red-500 to-red-400 text-white hover:bg-gradient-to-l hover:from-red-700 hover:to-red-600 transition-all duration-200 px-3 py-1 rounded-lg shadow-md text-sm"
                      onClick={() => handleDelete(registration.registrationid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewRegistrations;
