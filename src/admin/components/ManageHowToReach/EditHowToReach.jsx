import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const EditHowToReach = () => {
  const { reachId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    header_image: "",
    heading: "",
    intro_text: "",
    option1_title: "",
    option1_description: "",
    option1_details: "",
    option2_title: "",
    option2_description: "",
    option2_details: "",
    option3_title: "",
    option3_description: "",
    option3_details: "",
    note_text: "",
  });
  const [error, setError] = useState("");

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
        setFormData(response.data || {});
      } catch (error) {
        setError("Error fetching How to Reach.");
      }
    };
    fetchHowToReach();
  }, [reachId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/how-to-reach/how-to-reach/${reachId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        navigate("/manage-how-to-reach");
      }
    } catch (error) {
      setError("Error updating How to Reach.");
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit How to Reach</h2>
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
          <label className="block font-bold mb-2">Intro Text</label>
          <textarea
            name="intro_text"
            value={formData.intro_text}
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
          <label className="block font-bold mb-2">Option 1 Title</label>
          <input
            type="text"
            name="option1_title"
            value={formData.option1_title}
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
          <label className="block font-bold mb-2">Option 1 Description</label>
          <textarea
            name="option1_description"
            value={formData.option1_description}
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
          <label className="block font-bold mb-2">
            Option 1 Details (JSON)
          </label>
          <textarea
            name="option1_details"
            value={formData.option1_details}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            rows="6"
            placeholder='[{"title": "Title1", "content": "Content1"}, {"title": "Title2", "content": "Content2"}]'
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Option 2 Title</label>
          <input
            type="text"
            name="option2_title"
            value={formData.option2_title}
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
          <label className="block font-bold mb-2">Option 2 Description</label>
          <textarea
            name="option2_description"
            value={formData.option2_description}
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
          <label className="block font-bold mb-2">
            Option 2 Details (JSON)
          </label>
          <textarea
            name="option2_details"
            value={formData.option2_details}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            rows="6"
            placeholder='[{"title": "Title1", "content": "Content1"}, {"title": "Title2", "content": "Content2"}]'
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Option 3 Title</label>
          <input
            type="text"
            name="option3_title"
            value={formData.option3_title}
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
          <label className="block font-bold mb-2">Option 3 Description</label>
          <textarea
            name="option3_description"
            value={formData.option3_description}
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
          <label className="block font-bold mb-2">
            Option 3 Details (JSON)
          </label>
          <textarea
            name="option3_details"
            value={formData.option3_details}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            rows="6"
            placeholder='[{"title": "Title1", "content": "Content1"}, {"title": "Title2", "content": "Content2"}]'
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Note Text</label>
          <textarea
            name="note_text"
            value={formData.note_text}
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
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              darkMode ? "hover:bg-blue-700" : "hover:bg-blue-600"
            }`}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/manage-how-to-reach")}
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

export default EditHowToReach;
