import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManagePartnerAndSponsor = () => {
  const { darkMode } = useDarkMode();
  const [partnerAndSponsor, setPartnerAndSponsor] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartnerAndSponsor = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/partner-and-sponsor/partner-and-sponsor`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPartnerAndSponsor(response.data || {});
      } catch (error) {
        setError("Error fetching Partner and Sponsor.");
      }
    };
    fetchPartnerAndSponsor();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/partner-and-sponsor/partner-and-sponsor/${partnerAndSponsor.partner_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setPartnerAndSponsor({});
      }
    } catch (error) {
      setError("Error deleting Partner and Sponsor.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Partner and Sponsor</h2>
        <div>
          {!partnerAndSponsor.partner_id && (
            <button
              onClick={() => navigate("/create-partner-and-sponsor")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
            >
              Add
            </button>
          )}
          {partnerAndSponsor.partner_id && (
            <button
              onClick={() =>
                navigate(
                  `/edit-partner-and-sponsor/${partnerAndSponsor.partner_id}`
                )
              }
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          {partnerAndSponsor.partner_id && (
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
      {partnerAndSponsor.partner_id ? (
        <div>
          <p>
            <strong>Heading:</strong> {partnerAndSponsor.heading}
          </p>
          <p>
            <strong>Partners Title:</strong> {partnerAndSponsor.partners_title}
          </p>
          <p>
            <strong>Partners Text:</strong> {partnerAndSponsor.partners_text}
          </p>
          <p>
            <strong>Sponsorship Title:</strong>{" "}
            {partnerAndSponsor.sponsorship_title}
          </p>
          <p>
            <strong>Sponsorship Text:</strong>{" "}
            {partnerAndSponsor.sponsorship_text}
          </p>
          <p>
            <strong>Contact Title:</strong> {partnerAndSponsor.contact_title}
          </p>
          <p>
            <strong>Contact Email:</strong>{" "}
            <a href={`mailto:${partnerAndSponsor.contact_email}`}>
              {partnerAndSponsor.contact_email}
            </a>
          </p>
          <p>
            <strong>Image URL:</strong>{" "}
            <a href={partnerAndSponsor.image_url} target="_blank">
              {partnerAndSponsor.image_url}
            </a>
          </p>
        </div>
      ) : (
        <p>No Partner and Sponsor data available.</p>
      )}
    </div>
  );
};

export default ManagePartnerAndSponsor;
