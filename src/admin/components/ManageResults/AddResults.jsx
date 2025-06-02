import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const AddResults = () => {
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

  // Excel upload states
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [showUploadResult, setShowUploadResult] = useState(false);
  const [activeTab, setActiveTab] = useState("manual"); // 'manual' or 'excel'

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  // Fetch events and categories on component mount
  useEffect(() => {
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

    fetchEvents();
    fetchCategories();
  }, []);

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
      await axios.post(`${API_BASE_URL}/results/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage("Result added successfully!");
      setFormData({
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
      setTimeout(() => navigate("/view-results"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Error adding result.");
    }
  };

  // Excel upload functions
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];

      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setUploadResult(null);
        setError("");
      } else {
        setError("Please select a valid Excel file (.xlsx or .xls)");
        e.target.value = "";
      }
    }
  };

  const handleExcelUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setUploadResult(null);
    setError("");

    const formData = new FormData();
    formData.append("excel", file);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/results/upload-excel`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadResult(response.data);
      setShowUploadResult(true);
      setFile(null);
      document.getElementById("excel-file").value = "";

      if (response.data.successCount > 0) {
        setSuccessMessage(
          `${response.data.successCount} results uploaded successfully!`
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        "Registration ID": "",
        "Bib No": "B001",
        Name: "John Doe",
        "Start Time": "08:00:00",
        "Finish Time": "09:30:00",
        "Race Time": "01:30:00",
        CP1: "CP1",
        "CP1 Time": "08:30:00",
        CP2: "CP2",
        "CP2 Time": "09:00:00",
        CP3: "",
        "CP3 Time": "",
        CP4: "",
        "CP4 Time": "",
        CP5: "",
        "CP5 Time": "",
        Age: "25",
        Gender: "Male",
        "Participate In": "Marathon",
        "Category ID": "1",
        City: "Mumbai",
        "RFID 1": "",
        "RFID 2": "",
        "Event ID": "1",
        "CStart Time": "08:00:00",
        "CRace Time": "01:30:00",
        "Image ID": "",
      },
    ];

    const csvContent =
      Object.keys(templateData[0]).join(",") +
      "\n" +
      templateData.map((row) => Object.values(row).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
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
        Add New Result
      </h2>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("manual")}
            className={`px-6 py-3 font-medium ${
              activeTab === "manual"
                ? darkMode
                  ? "border-b-2 border-blue-400 text-blue-400"
                  : "border-b-2 border-blue-600 text-blue-600"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Manual Entry
          </button>
          <button
            onClick={() => setActiveTab("excel")}
            className={`px-6 py-3 font-medium ${
              activeTab === "excel"
                ? darkMode
                  ? "border-b-2 border-blue-400 text-blue-400"
                  : "border-b-2 border-blue-600 text-blue-600"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Excel Upload
          </button>
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
      {successMessage && (
        <div
          className={`p-4 mb-4 rounded-md ${
            darkMode ? "bg-green-700 text-white" : "bg-green-100 text-green-700"
          }`}
        >
          {successMessage}
        </div>
      )}

      {/* Manual Entry Tab */}
      {activeTab === "manual" && (
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
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
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
              Add Result
            </button>
          </div>
        </form>
      )}

      {/* Excel Upload Tab */}
      {activeTab === "excel" && (
        <div>
          {/* Instructions */}
          <div
            className={`p-4 mb-6 rounded-lg ${
              darkMode
                ? "bg-blue-900 border border-blue-700"
                : "bg-blue-50 border border-blue-200"
            }`}
          >
            <h3
              className={`font-semibold mb-2 ${
                darkMode ? "text-blue-300" : "text-blue-800"
              }`}
            >
              Instructions:
            </h3>
            <ul
              className={`text-sm space-y-1 ${
                darkMode ? "text-blue-200" : "text-blue-700"
              }`}
            >
              <li>• Upload Excel file (.xlsx or .xls) with result data</li>
              <li>• Required columns: Bib No, Name, Gender, Event ID</li>
              <li>• Time format should be HH:MM:SS (e.g., 08:30:00)</li>
              <li>• Gender should be: Male, Female, or Others</li>
              <li>• Download template for reference</li>
            </ul>
          </div>

          {/* Template Download */}
          <div className="mb-6">
            <button
              onClick={downloadTemplate}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              📄 Download Template
            </button>
          </div>

          {/* File Upload */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
              darkMode
                ? "border-gray-600 bg-gray-800"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              type="file"
              id="excel-file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />

            <label
              htmlFor="excel-file"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <div
                className={`text-4xl ${
                  darkMode ? "text-gray-400" : "text-gray-400"
                }`}
              >
                📊
              </div>
              <div>
                <p
                  className={`text-lg font-medium ${
                    darkMode ? "text-white" : "text-gray-700"
                  }`}
                >
                  Click to select Excel file
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  or drag and drop your file here
                </p>
              </div>
            </label>

            {file && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  darkMode
                    ? "bg-green-800 border border-green-600"
                    : "bg-green-50 border border-green-200"
                }`}
              >
                <p
                  className={`font-medium ${
                    darkMode ? "text-green-200" : "text-green-700"
                  }`}
                >
                  Selected: {file.name}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-green-300" : "text-green-600"
                  }`}
                >
                  Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="text-center mb-6">
            <button
              onClick={handleExcelUpload}
              disabled={!file || uploading}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                !file || uploading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : darkMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {uploading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Uploading...
                </div>
              ) : (
                "Upload Excel File"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Upload Result Modal */}
      {showUploadResult && uploadResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 max-w-md w-full mx-4 ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload Result</h3>
              <button
                onClick={() => setShowUploadResult(false)}
                className={`hover:text-gray-500 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                ✖
              </button>
            </div>

            <div className="space-y-4">
              {uploadResult.successCount > 0 && (
                <div className="flex items-center gap-2 text-green-600">
                  <span>✅</span>
                  <span>
                    {uploadResult.successCount} records uploaded successfully
                  </span>
                </div>
              )}

              {uploadResult.errorCount > 0 && (
                <div className="flex items-center gap-2 text-red-600">
                  <span>❌</span>
                  <span>{uploadResult.errorCount} records failed</span>
                </div>
              )}

              <div
                className={`text-sm ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Total rows processed: {uploadResult.totalRows}
              </div>

              {uploadResult.errors && uploadResult.errors.length > 0 && (
                <div
                  className={`border rounded p-3 ${
                    darkMode
                      ? "bg-red-900 border-red-700"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <p
                    className={`font-medium mb-2 ${
                      darkMode ? "text-red-300" : "text-red-800"
                    }`}
                  >
                    Errors:
                  </p>
                  <ul
                    className={`text-sm space-y-1 max-h-32 overflow-y-auto ${
                      darkMode ? "text-red-200" : "text-red-700"
                    }`}
                  >
                    {uploadResult.errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowUploadResult(false)}
                className={`px-6 py-2 rounded-lg ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddResults;
