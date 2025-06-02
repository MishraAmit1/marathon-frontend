import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ViewSponsors = () => {
  const { darkMode } = useDarkMode();
  const [sponsors, setSponsors] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/sponsor/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSponsors(res.data);
      } catch (error) {
        setError("Error fetching sponsors. Please try again.");
      }
    };
    fetchSponsors();
  }, []);

  const handleEdit = (sponsor) => {
    navigate(`/sponsors/edit/${sponsor.sponsor_id}`, { state: sponsor });
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/sponsor/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.status === 200) {
        setSponsors(sponsors.filter((s) => s.sponsor_id !== id));
      }
    } catch (error) {
      setError("Error deleting sponsor. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="flex justify-end">
        <Link to="/sponsors/create">
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Add Sponsor
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
          View Sponsors
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
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Website</th>
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Is Active</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sponsors.length > 0 ? (
                sponsors.map((sponsor) => (
                  <tr key={sponsor.sponsor_id} className="border-b">
                    <td className="p-2">{sponsor.sponsor_name}</td>
                    <td className="p-2">{sponsor.sponsor_description}</td>
                    <td className="p-2">
                      <a
                        href={sponsor.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sponsor.website_url}
                      </a>
                    </td>
                    <td className="p-2">
                      {sponsor.sponsor_image && (
                        <img
                          src={`${API_BASE_URL}${sponsor.sponsor_image}`}
                          alt={sponsor.sponsor_name}
                          className="w-16 h-16 object-cover"
                        />
                      )}
                    </td>
                    <td className="p-2">
                      {sponsor.is_active ? "Active" : "Inactive"}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleEdit(sponsor)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sponsor.sponsor_id)}
                        className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-2 text-center">
                    No sponsors found.
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

export default ViewSponsors;
