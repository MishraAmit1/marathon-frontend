import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const EditFAQ = () => {
  const { faqId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState(
    location.state || { question: "", answer: "" }
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location.state) {
      const fetchFaq = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/faq/all`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          const faq = response.data.find((f) => f.faq_id === parseInt(faqId));
          if (faq) setFormData(faq);
        } catch (error) {
          setError("Error fetching FAQ details.");
        }
      };
      fetchFaq();
    }
  }, [faqId, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/faq/update/${faqId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        navigate("/manage-faqs");
      }
    } catch (error) {
      setError("Error updating FAQ. Please try again.");
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit FAQ</h2>
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
          <label className="block font-bold mb-2">Question</label>
          <input
            type="text"
            name="question"
            value={formData.question}
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
          <label className="block font-bold mb-2">Answer</label>
          <textarea
            name="answer"
            value={formData.answer}
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
            onClick={() => navigate("/manage-faqs")}
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

export default EditFAQ;
