import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManageFAQs = () => {
  const { darkMode } = useDarkMode();
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/faq/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setFaqs(response.data);
      } catch (error) {
        setError("Error fetching FAQs. Please try again.");
      }
    };
    fetchFaqs();
  }, []);

  const handleDelete = async (faqId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/faq/delete/${faqId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setFaqs(faqs.filter((faq) => faq.faq_id !== faqId));
      }
    } catch (error) {
      setError("Error deleting FAQ. Please try again.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage FAQs</h2>
        <button
          onClick={() => navigate("/create-faq")}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add FAQ
        </button>
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
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Question</th>
              <th className="p-2 text-left">Answer</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.length > 0 ? (
              faqs.map((faq) => (
                <tr key={faq.faq_id} className="border-b">
                  <td className="p-2">{faq.question}</td>
                  <td className="p-2">{faq.answer.slice(0, 50)}...</td>
                  <td className="p-2 flex space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/edit-faq/${faq.faq_id}`, { state: faq })
                      }
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(faq.faq_id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center">
                  No FAQs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFAQs;
