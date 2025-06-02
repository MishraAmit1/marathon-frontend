import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManageHowToReach = () => {
  const { darkMode } = useDarkMode();
  const [howToReach, setHowToReach] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHowToReach = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/how-to-reach/how-to-reach`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHowToReach(response.data || {});
      } catch (error) {
        setError("Error fetching How to Reach.");
      }
    };
    fetchHowToReach();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/how-to-reach/how-to-reach/${howToReach.reach_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setHowToReach({});
      }
    } catch (error) {
      setError("Error deleting How to Reach.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage How to Reach</h2>
        <div>
          {!howToReach.reach_id && (
            <button
              onClick={() => navigate("/create-how-to-reach")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
            >
              Add
            </button>
          )}
          {howToReach.reach_id && (
            <button
              onClick={() =>
                navigate(`/edit-how-to-reach/${howToReach.reach_id}`)
              }
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          {howToReach.reach_id && (
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
      {howToReach.reach_id ? (
        <div>
          <p>
            <strong>Heading:</strong> {howToReach.heading}
          </p>
          <p>
            <strong>Intro Text:</strong> {howToReach.intro_text}
          </p>
          <p>
            <strong>Option 1 Title:</strong> {howToReach.option1_title}
          </p>
          <p>
            <strong>Option 1 Description:</strong>{" "}
            {howToReach.option1_description}
          </p>
          <p>
            <strong>Option 1 Details:</strong>{" "}
            {JSON.stringify(howToReach.option1_details)}
          </p>
          <p>
            <strong>Option 2 Title:</strong> {howToReach.option2_title}
          </p>
          <p>
            <strong>Option 2 Description:</strong>{" "}
            {howToReach.option2_description}
          </p>
          <p>
            <strong>Option 2 Details:</strong>{" "}
            {JSON.stringify(howToReach.option2_details)}
          </p>
          <p>
            <strong>Option 3 Title:</strong> {howToReach.option3_title}
          </p>
          <p>
            <strong>Option 3 Description:</strong>{" "}
            {howToReach.option3_description}
          </p>
          <p>
            <strong>Option 3 Details:</strong>{" "}
            {JSON.stringify(howToReach.option3_details)}
          </p>
          <p>
            <strong>Note Text:</strong> {howToReach.note_text}
          </p>
        </div>
      ) : (
        <p>No How to Reach data available.</p>
      )}
    </div>
  );
};

export default ManageHowToReach;
