import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ViewParticipate = () => {
  const { darkMode } = useDarkMode();
  const [participations, setParticipations] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Fetch all participation records
  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/participatein/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setParticipations(res.data);
      } catch (error) {
        setError("Error fetching participation records. Please try again.");
      }
    };
    fetchParticipations();
  }, []);

  // Navigate to EditParticipate page
  const handleEdit = (participation) => {
    navigate(`/edit-participatein/${participation.participateinid}`, {
      state: participation,
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/participatein/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.status === 200) {
        setParticipations(
          participations.filter((p) => p.participateinid !== id)
        );
      }
    } catch (error) {
      setError("Error deleting record. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="flex justify-end">
        <Link to="/create-participatein">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Add
          </button>
        </Link>
      </div>

      <div
        className={`mt-4 container mx-auto p-5 border rounded-lg shadow-md ${
          darkMode ? "bg-[#132D69]" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-9 text-center ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          View ParticipateIn Records
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
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Event Name</th>
                <th className="p-2 text-left">Event Type</th>
                <th className="p-2 text-left">Category Name</th>
                <th className="p-2 text-left">Distance (KM)</th>
                <th className="p-2 text-left">Start Time</th>
                <th className="p-2 text-left">Is Active</th>
                <th className="p-2 text-left">Entry By</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {participations.length > 0 ? (
                participations.map((participation) => (
                  <tr key={participation.participateinid} className="border-b">
                    <td className="p-2">{participation.event_name}</td>
                    <td className="p-2">{participation.event_type}</td>
                    <td className="p-2">{participation.category_name}</td>
                    <td className="p-2">{participation.km} km</td>
                    <td className="p-2">{participation.starttime}</td>
                    <td className="p-2">
                      {participation.isactive ? "Active" : "Inactive"}
                    </td>
                    <td className="p-2">{participation.entry_by}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(participation)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(participation.participateinid)
                        }
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-2 text-center">
                    No participation records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewParticipate;
