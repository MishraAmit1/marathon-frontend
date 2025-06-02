import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../contexts/DarkModeContext";

const ManageContactSubmissions = () => {
  const { darkMode } = useDarkMode();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/contact/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSubmissions(response.data);
      } catch (error) {
        setError("Error fetching submissions. Please try again.");
      }
    };
    fetchSubmissions();
  }, []);

  const handleDelete = async (submissionId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/contact/delete/${submissionId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setSubmissions(
          submissions.filter((s) => s.submission_id !== submissionId)
        );
      }
    } catch (error) {
      setError("Error deleting submission. Please try again.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Contact Submissions
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
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Subject</th>
              <th className="p-2 text-left">Message</th>
              <th className="p-2 text-left">Submitted By</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length > 0 ? (
              submissions.map((submission) => (
                <tr key={submission.submission_id} className="border-b">
                  <td className="p-2">{submission.name}</td>
                  <td className="p-2">{submission.email}</td>
                  <td className="p-2">{submission.subject}</td>
                  <td className="p-2">{submission.message.slice(0, 50)}...</td>
                  <td className="p-2">{submission.entry_by}</td>
                  <td className="p-2">
                    {new Date(submission.entry_date).toLocaleString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(submission.submission_id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-2 text-center">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContactSubmissions;
