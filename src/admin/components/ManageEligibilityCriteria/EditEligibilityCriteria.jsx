import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const EditEligibilityCriteria = () => {
  const { criteriaId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    header_image: "",
    heading: "",
    age_eligibility_title: "",
    age_eligibility_table: [{ rows: [] }],
    notes_title: "",
    notes_list: [],
  });
  const [error, setError] = useState("");

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
        const data = response.data || {};
        setFormData({
          ...data,
          age_eligibility_table: JSON.parse(
            data.age_eligibility_table || '[{"rows": []}]'
          ),
          notes_list: JSON.parse(data.notes_list || "[]"),
        });
      } catch (error) {
        setError("Error fetching Eligibility Criteria.");
      }
    };
    fetchEligibilityCriteria();
  }, [criteriaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTableChange = (e, rowIndex, cellIndex) => {
    const newTable = { ...formData.age_eligibility_table[0] };
    if (!newTable.rows[rowIndex]) newTable.rows[rowIndex] = { cells: [] };
    newTable.rows[rowIndex].cells[cellIndex] = e.target.value;
    setFormData({ ...formData, age_eligibility_table: [newTable] });
  };

  const addRow = () => {
    const newTable = { ...formData.age_eligibility_table[0] };
    newTable.rows.push({ cells: ["", "", ""] });
    setFormData({ ...formData, age_eligibility_table: [newTable] });
  };

  const handleNotesChange = (e, index) => {
    const newNotes = [...formData.notes_list];
    newNotes[index] = e.target.value;
    setFormData({ ...formData, notes_list: newNotes });
  };

  const addNote = () => {
    setFormData({ ...formData, notes_list: [...formData.notes_list, ""] });
  };

  const removeNote = (index) => {
    const newNotes = formData.notes_list.filter((_, i) => i !== index);
    setFormData({ ...formData, notes_list: newNotes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${API_BASE_URL}/eligibility-criteria/eligibility-criteria/${criteriaId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        navigate("/manage-eligibility-criteria");
      }
    } catch (error) {
      setError("Error updating Eligibility Criteria.");
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Edit Eligibility Criteria
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
          <label className="block font-bold mb-2">Age Eligibility Title</label>
          <input
            type="text"
            name="age_eligibility_title"
            value={formData.age_eligibility_title}
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
          <label className="block font-bold mb-2">Age Eligibility Table</label>
          {formData.age_eligibility_table[0].rows.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-2">
              {row.cells.map((cell, cellIndex) => (
                <input
                  key={cellIndex}
                  type="text"
                  value={cell}
                  onChange={(e) => handleTableChange(e, rowIndex, cellIndex)}
                  className={`w-1/3 p-2 border rounded-md mr-2 ${
                    darkMode
                      ? "bg-[#132D69] text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                  }`}
                  required
                />
              ))}
            </div>
          ))}
          <button
            type="button"
            onClick={addRow}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Row
          </button>
        </div>
        <div>
          <label className="block font-bold mb-2">Notes Title</label>
          <input
            type="text"
            name="notes_title"
            value={formData.notes_title}
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
          <label className="block font-bold mb-2">Notes List</label>
          {formData.notes_list.map((note, index) => (
            <div key={index} className="mb-2 flex items-center">
              <input
                type="text"
                value={note}
                onChange={(e) => handleNotesChange(e, index)}
                className={`w-full p-2 border rounded-md mr-2 ${
                  darkMode
                    ? "bg-[#132D69] text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => removeNote(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addNote}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Note
          </button>
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
            onClick={() => navigate("/manage-eligibility-criteria")}
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

export default EditEligibilityCriteria;
