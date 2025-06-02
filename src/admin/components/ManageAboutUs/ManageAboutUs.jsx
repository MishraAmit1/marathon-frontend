import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManageAboutUs = () => {
  const { darkMode } = useDarkMode();
  const [aboutUs, setAboutUs] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/about/about-us`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAboutUs(response.data || {});
      } catch (error) {
        setError("Error fetching About Us.");
      }
    };
    fetchAboutUs();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/about/about-us/${aboutUs.about_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setAboutUs({});
      }
    } catch (error) {
      setError("Error deleting About Us.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage About Us</h2>
        <div>
          {!aboutUs.about_id && (
            <button
              onClick={() => navigate("/create-about-us")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
            >
              Add
            </button>
          )}
          {aboutUs.about_id && (
            <button
              onClick={() => navigate(`/edit-about-us/${aboutUs.about_id}`)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          {aboutUs.about_id && (
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
      {aboutUs.about_id ? (
        <div>
          <p>
            <strong>Subheading:</strong> {aboutUs.subheading}
          </p>
          <p>
            <strong>Heading:</strong> {aboutUs.heading}
          </p>
          <p>
            <strong>Description:</strong> {aboutUs.description}
          </p>
          <p>
            <strong>Button Text:</strong> {aboutUs.button_text}
          </p>
          <p>
            <strong>Button Link:</strong> {aboutUs.button_link}
          </p>
          <p>
            <strong>Image 1 URL:</strong>{" "}
            <a href={aboutUs.image1_url} target="_blank">
              {aboutUs.image1_url}
            </a>
          </p>
          <p>
            <strong>Image 2 URL:</strong>{" "}
            <a href={aboutUs.image2_url} target="_blank">
              {aboutUs.image2_url}
            </a>
          </p>
        </div>
      ) : (
        <p>No About Us data available.</p>
      )}
    </div>
  );
};

export default ManageAboutUs;
