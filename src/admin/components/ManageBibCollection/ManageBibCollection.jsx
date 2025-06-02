import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManageBibCollection = () => {
  const { darkMode } = useDarkMode();
  const [bibCollection, setBibCollection] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBibCollection = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/bib-collection/bib-collection`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBibCollection(response.data || {});
      } catch (error) {
        setError("Error fetching Bib Collection.");
      }
    };
    fetchBibCollection();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/bib-collection/bib-collection/${bibCollection.bib_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setBibCollection({});
      }
    } catch (error) {
      setError("Error deleting Bib Collection.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Bib Collection</h2>
        <div>
          {!bibCollection.bib_id && (
            <button
              onClick={() => navigate("/create-bib-collection")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
            >
              Add
            </button>
          )}
          {bibCollection.bib_id && (
            <button
              onClick={() =>
                navigate(`/edit-bib-collection/${bibCollection.bib_id}`)
              }
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          {bibCollection.bib_id && (
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
      {bibCollection.bib_id ? (
        <div>
          <p>
            <strong>Heading:</strong> {bibCollection.heading}
          </p>
          <p>
            <strong>Intro Text:</strong> {bibCollection.intro_text}
          </p>
          <p>
            <strong>Instructions Title:</strong>{" "}
            {bibCollection.instructions_title}
          </p>
          <p>
            <strong>Instructions List:</strong>{" "}
            {JSON.stringify(bibCollection.instructions_list)}
          </p>
          <p>
            <strong>Safety Notice Title:</strong>{" "}
            {bibCollection.safety_notice_title}
          </p>
          <p>
            <strong>Safety Notice Text:</strong>{" "}
            {bibCollection.safety_notice_text}
          </p>
          <p>
            <strong>Image URL:</strong>{" "}
            <a href={bibCollection.image_url} target="_blank">
              {bibCollection.image_url}
            </a>
          </p>
        </div>
      ) : (
        <p>No Bib Collection data available.</p>
      )}
    </div>
  );
};

export default ManageBibCollection;
