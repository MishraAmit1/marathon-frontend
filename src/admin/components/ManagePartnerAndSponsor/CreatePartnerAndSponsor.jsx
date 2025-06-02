import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const CreatePartnerAndSponsor = () => {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    header_image: "",
    heading: "",
    partners_title: "",
    partners_text: "",
    sponsorship_title: "",
    sponsorship_text: "",
    contact_title: "",
    contact_email: "",
    image_url: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/partner-and-sponsor/partner-and-sponsor`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        navigate("/manage-partner-and-sponsor");
      }
    } catch (error) {
      setError("Error creating Partner and Sponsor.");
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create Partner and Sponsor
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-2">Header Image URL</label>
          <input
            type="text"
            name="header_image"
            value={formData.header_image}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Heading</label>
          <input
            type="text"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Partners Title</label>
          <input
            type="text"
            name="partners_title"
            value={formData.partners_title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Partners Text</label>
          <textarea
            name="partners_text"
            value={formData.partners_text}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Sponsorship Title</label>
          <input
            type="text"
            name="sponsorship_title"
            value={formData.sponsorship_title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Sponsorship Text</label>
          <textarea
            name="sponsorship_text"
            value={formData.sponsorship_text}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Contact Title</label>
          <input
            type="text"
            name="contact_title"
            value={formData.contact_title}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Contact Email</label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              darkMode ? "hover:bg-blue-700" : "hover:bg-blue-600"
            }`}
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => navigate("/manage-partner-and-sponsor")}
            className={`px-4 py-2 bg-gray-600 text-white rounded-md ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-500"
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePartnerAndSponsor;
