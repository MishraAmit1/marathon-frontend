import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const CreateAboutUs = () => {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    subheading: "",
    heading: "",
    description: "",
    button_text: "",
    button_link: "",
    image1_url: "",
    image2_url: "",
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
        `${API_BASE_URL}/about/about-us`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        navigate("/manage-about-us");
      }
    } catch (error) {
      setError("Error creating About Us.");
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create About Us</h2>
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
          <label className="block font-bold mb-2">Subheading</label>
          <input
            type="text"
            name="subheading"
            value={formData.subheading}
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
          <label className="block font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            rows="6"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Button Text</label>
          <input
            type="text"
            name="button_text"
            value={formData.button_text}
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
          <label className="block font-bold mb-2">Button Link</label>
          <input
            type="text"
            name="button_link"
            value={formData.button_link}
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
          <label className="block font-bold mb-2">Image 1 URL</label>
          <input
            type="text"
            name="image1_url"
            value={formData.image1_url}
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
          <label className="block font-bold mb-2">Image 2 URL</label>
          <input
            type="text"
            name="image2_url"
            value={formData.image2_url}
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
            onClick={() => navigate("/manage-about-us")}
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

export default CreateAboutUs;
