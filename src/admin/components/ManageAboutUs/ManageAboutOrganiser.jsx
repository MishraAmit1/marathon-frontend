import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManageAboutOrganiser = () => {
  const { darkMode } = useDarkMode();
  const [aboutOrganiser, setAboutOrganiser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAboutOrganiser = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/about/about-organiser`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAboutOrganiser(response.data || {});
      } catch (error) {
        setError("Error fetching About Organiser.");
      }
    };
    fetchAboutOrganiser();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/about/about-organiser/${aboutOrganiser.organiser_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setAboutOrganiser({});
      }
    } catch (error) {
      setError("Error deleting About Organiser.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage About Organiser</h2>
        <div>
          {!aboutOrganiser.organiser_id && (
            <button
              onClick={() => navigate("/create-about-organiser")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
            >
              Add
            </button>
          )}
          {aboutOrganiser.organiser_id && (
            <button
              onClick={() =>
                navigate(`/edit-about-organiser/${aboutOrganiser.organiser_id}`)
              }
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          {aboutOrganiser.organiser_id && (
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
      {aboutOrganiser.organiser_id ? (
        <div>
          <p>
            <strong>Heading:</strong> {aboutOrganiser.heading}
          </p>
          <p>
            <strong>Content:</strong> {aboutOrganiser.content}
          </p>
          <p>
            <strong>Image 1 URL:</strong>{" "}
            <a href={aboutOrganiser.image1_url} target="_blank">
              {aboutOrganiser.image1_url}
            </a>
          </p>
          <p>
            <strong>Image 2 URL:</strong>{" "}
            <a href={aboutOrganiser.image2_url} target="_blank">
              {aboutOrganiser.image2_url}
            </a>
          </p>
        </div>
      ) : (
        <p>No About Organiser data available.</p>
      )}
    </div>
  );
};

export default ManageAboutOrganiser;
