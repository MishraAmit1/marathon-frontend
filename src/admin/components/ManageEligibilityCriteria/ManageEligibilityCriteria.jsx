import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManageEligibilityCriteria = () => {
  const { darkMode } = useDarkMode();
  const [criteria, setCriteria] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEligibilityCriteria = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/eligibility-criteria/eligibility-criteria`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCriteria(response.data || {});
      } catch (error) {
        setError("Error fetching Eligibility Criteria.");
      }
    };
    fetchEligibilityCriteria();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/eligibility-criteria/eligibility-criteria/${criteria.criteria_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setCriteria({});
      }
    } catch (error) {
      setError("Error deleting Eligibility Criteria.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Eligibility Criteria</h2>
        <div>
          {!criteria.criteria_id && (
            <button
              onClick={() => navigate("/create-eligibility-criteria")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
            >
              Add
            </button>
          )}
          {criteria.criteria_id && (
            <button
              onClick={() =>
                navigate(`/edit-eligibility-criteria/${criteria.criteria_id}`)
              }
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          {criteria.criteria_id && (
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
      {criteria.criteria_id ? (
        <div>
          <p>
            <strong>Heading:</strong> {criteria.heading}
          </p>
          <p>
            <strong>Age Eligibility Title:</strong>{" "}
            {criteria.age_eligibility_title}
          </p>
          <p>
            <strong>Age Eligibility Table:</strong>{" "}
            {JSON.stringify(criteria.age_eligibility_table)}
          </p>
          <p>
            <strong>Notes Title:</strong> {criteria.notes_title}
          </p>
          <p>
            <strong>Notes List:</strong> {JSON.stringify(criteria.notes_list)}
          </p>
        </div>
      ) : (
        <p>No Eligibility Criteria data available.</p>
      )}
    </div>
  );
};

export default ManageEligibilityCriteria;
