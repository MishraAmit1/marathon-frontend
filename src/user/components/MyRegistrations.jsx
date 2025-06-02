import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api.js";

const MyRegistrations = ({ onClose }) => {
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/event-registration/my-registrations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setRegistrations(response.data.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
        setError("Error fetching registrations. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  // Format date in local timezone (IST)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Function to check if user is already registered for an event on a specific date
  const isAlreadyRegistered = (eventName, eventDate) => {
    return registrations.some(
      (reg) =>
        reg.event_name === eventName &&
        formatDate(reg.event_date) === formatDate(eventDate)
    );
  };

  if (loading) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Loading your registrations...</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded text-center">
          {error}
        </div>
      )}
      {registrations.length === 0 ? (
        <p className="text-center text-gray-600">
          You have not registered for any events yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 text-left font-semibold">BIB Number</th>
                <th className="p-4 text-left font-semibold">Event Name</th>
                <th className="p-4 text-left font-semibold">Event Date</th>
                <th className="p-4 text-left font-semibold">Category</th>
                <th className="p-4 text-left font-semibold">Distance</th>
                <th className="p-4 text-left font-semibold">DOB</th>
                <th className="p-4 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((reg) => (
                <tr
                  key={reg.registrationid}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border-b p-4 text-gray-800">{reg.bibno}</td>
                  <td className="border-b p-4 text-gray-800">
                    {reg.event_name}
                  </td>
                  <td className="border-b p-4 text-gray-600">
                    {formatDate(reg.event_date)}
                  </td>
                  <td className="border-b p-4 text-gray-600">
                    {reg.category_name}
                  </td>
                  <td className="border-b p-4 text-gray-600">
                    {reg.participatein} KM
                  </td>
                  <td className="border-b p-4 text-gray-600">
                    {formatDate(reg.dob)}
                  </td>
                  <td className="border-b p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        reg.isactive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {reg.isactive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Example message if checking registration (to be used in RegisterEvent) */}
      {isAlreadyRegistered("Swimming", "2025-02-15") && (
        <p className="text-center text-red-600 mt-4">
          You are already registered for this event.
        </p>
      )}
    </div>
  );
};

export default MyRegistrations;
