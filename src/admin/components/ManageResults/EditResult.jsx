import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const EditResult = () => {
  const { resultId } = useParams();
  const parsedResultId = parseInt(resultId, 10); // Parse resultId to integer
  console.log("Raw resultId from useParams:", resultId); // Debug log
  console.log("Parsed resultId:", parsedResultId); // Debug log

  const [formData, setFormData] = useState({
    registrationId: "",
    bibno: "",
    name: "",
    startime: "",
    finishtime: "",
    raceTime: "",
    cP1: "",
    cP1Time: "",
    cP2: "",
    cP2Time: "",
    cP3: "",
    cP3Time: "",
    cP4: "",
    cP4Time: "",
    cP5: "",
    cP5Time: "",
    age: "",
    gender: "Male",
    participatein: "",
    categoryId: "",
    city: "",
    rfid1: "",
    rfid2: "",
    eventId: "",
    CStartTime: "",
    CRaceTime: "",
    imageid: "",
  });
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Validate resultId
    if (isNaN(parsedResultId)) {
      setError("Invalid result ID. It must be a number.");
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/results/${parsedResultId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = response.data;
        setFormData({
          registrationId: result.registrationId || "",
          bibno: result.bibno || "",
          name: result.name || "",
          startime: result.startime || "",
          finishtime: result.finishtime || "",
          raceTime: result.raceTime || "",
          cP1: result.cP1 || "",
          cP1Time: result.cP1Time || "",
          cP2: result.cP2 || "",
          cP2Time: result.cP2Time || "",
          cP3: result.cP3 || "",
          cP3Time: result.cP3Time || "",
          cP4: result.cP4 || "",
          cP4Time: result.cP4Time || "",
          cP5: result.cP5 || "",
          cP5Time: result.cP5Time || "",
          age: result.age || "",
          gender: result.gender || "Male",
          participatein: result.participatein || "",
          categoryId: result.categoryId || "",
          city: result.city || "",
          rfid1: result.rfid1 || "",
          rfid2: result.rfid2 || "",
          eventId: result.eventId || "",
          CStartTime: result.CStartTime || "",
          CRaceTime: result.CRaceTime || "",
          imageid: result.imageid || "",
        });
      } catch (error) {
        setError(
          error.response?.data?.message || "Error fetching result details."
        );
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/event/all`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setEvents(response.data);
      } catch (error) {
        setError("Error fetching events.");
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/category/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        setError("Error fetching categories.");
      }
    };

    fetchResult();
    fetchEvents();
    fetchCategories();
  }, [parsedResultId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.bibno || formData.bibno.length < 1) {
      setError("Bib number is required.");
      return;
    }
    if (!formData.name || formData.name.length < 3) {
      setError("Name is required.");
      return;
    }
    if (!formData.eventId || isNaN(formData.eventId)) {
      setError("Event is required.");
      return;
    }
    if (formData.raceTime && !/^\d{2}:\d{2}:\d{2}$/.test(formData.raceTime)) {
      setError("Race time must be in HH:MM:SS format (e.g., 01:23:45).");
      return;
    }
    if (formData.startime && !/^\d{2}:\d{2}:\d{2}$/.test(formData.startime)) {
      setError("Start time must be in HH:MM:SS format (e.g., 01:23:45).");
      return;
    }
    if (
      formData.finishtime &&
      !/^\d{2}:\d{2}:\d{2}$/.test(formData.finishtime)
    ) {
      setError("Finish time must be in HH:MM:SS format (e.g., 01:23:45).");
      return;
    }

    try {
      console.log("Submitting update for resultId:", parsedResultId); // Debug log
      await axios.put(
        `${API_BASE_URL}/results/update/${parsedResultId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Result updated successfully!");
      setTimeout(() => navigate("/view-results"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Error updating result.");
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 text-center ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Edit Result
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
      {successMessage && (
        <div
          className={`p-4 mb-4 rounded-md ${
            darkMode ? "bg-green-700 text-white" : "bg-green-100 text-green-700"
          }`}
        >
          {successMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Event
            </label>
            <select
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            >
              <option value="">Select Event</option>
              {events.map((event) => (
                <option key={event.event_id} value={event.event_id}>
                  {event.event_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Category
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Registration ID (Optional)
            </label>
            <input
              type="number"
              name="registrationId"
              value={formData.registrationId}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Bib No
            </label>
            <input
              type="text"
              name="bibno"
              value={formData.bibno}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Start Time (HH:MM:SS, Optional)
            </label>
            <input
              type="text"
              name="startime"
              value={formData.startime}
              onChange={handleChange}
              placeholder="e.g., 01:23:45"
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Finish Time (HH:MM:SS, Optional)
            </label>
            <input
              type="text"
              name="finishtime"
              value={formData.finishtime}
              onChange={handleChange}
              placeholder="e.g., 01:23:45"
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Race Time (HH:MM:SS, Optional)
            </label>
            <input
              type="text"
              name="raceTime"
              value={formData.raceTime}
              onChange={handleChange}
              placeholder="e.g., 01:23:45"
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Age (Optional)
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Participate In (KM, Optional)
            </label>
            <input
              type="text"
              name="participatein"
              value={formData.participatein}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              City (Optional)
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              RFID 1 (Optional)
            </label>
            <input
              type="text"
              name="rfid1"
              value={formData.rfid1}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              RFID 2 (Optional)
            </label>
            <input
              type="text"
              name="rfid2"
              value={formData.rfid2}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
          <div>
            <label
              className={`block font-semibold mb-2 ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              Image ID (Optional)
            </label>
            <input
              type="text"
              name="imageid"
              value={formData.imageid}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg ${
                darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
              }`}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className={`py-3 px-6 rounded-lg ${
              darkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-900 text-white hover:bg-blue-700"
            }`}
          >
            Update Result
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditResult;
