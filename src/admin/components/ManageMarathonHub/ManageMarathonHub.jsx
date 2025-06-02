import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManageMarathonHub = () => {
  const { darkMode } = useDarkMode();
  const [marathonHub, setMarathonHub] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMarathonHub = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/marathon-hub/marathon-hub`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMarathonHub(response.data || {});
      } catch (error) {
        setError("Error fetching Marathon Hub.");
      }
    };
    fetchMarathonHub();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/marathon-hub/marathon-hub/${marathonHub.hub_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setMarathonHub({});
      }
    } catch (error) {
      setError("Error deleting Marathon Hub.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Marathon Hub</h2>
        <div>
          {!marathonHub.hub_id && (
            <button
              onClick={() => navigate("/create-marathon-hub")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
            >
              Add
            </button>
          )}
          {marathonHub.hub_id && (
            <button
              onClick={() =>
                navigate(`/edit-marathon-hub/${marathonHub.hub_id}`)
              }
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          {marathonHub.hub_id && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      {error && (
        <div
          className={`p-4 mb-4 rounded-md ${
            darkMode ? "bg-red-700 text-white" : "bg-red-100 text-red-700"
          }`}
        >
          {error}
        </div>
      )}
      {marathonHub.hub_id ? (
        <div>
          <p>
            <strong>Heading:</strong> {marathonHub.heading}
          </p>
          <p>
            <strong>Location Title:</strong> {marathonHub.location_title}
          </p>
          <p>
            <strong>Location Details:</strong> {marathonHub.location_details}
          </p>
          <p>
            <strong>Timings Title:</strong> {marathonHub.timings_title}
          </p>
          <p>
            <strong>Timings Text:</strong> {marathonHub.timings_text}
          </p>
          <p>
            <strong>Image URL:</strong>{" "}
            <a href={marathonHub.image_url} target="_blank">
              {marathonHub.image_url}
            </a>
          </p>
        </div>
      ) : (
        <p>No Marathon Hub data available.</p>
      )}
    </div>
  );
};

export default ManageMarathonHub;
