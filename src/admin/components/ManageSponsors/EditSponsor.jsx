import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";

const EditSponsor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const sponsor = location.state || {};
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    sponsor_name: sponsor.sponsor_name || "",
    sponsor_description: sponsor.sponsor_description || "",
    website_url: sponsor.website_url || "",
    is_active: sponsor.is_active !== undefined ? sponsor.is_active : true,
  });
  const [sponsorImage, setSponsorImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id && !location.state) {
      const fetchSponsor = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/sponsor/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setFormData({
            sponsor_name: res.data.sponsor_name,
            sponsor_description: res.data.sponsor_description,
            website_url: res.data.website_url,
            is_active: res.data.is_active,
          });
        } catch (error) {
          setError("Error fetching sponsor details.");
        }
      };
      fetchSponsor();
    }
  }, [id, location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setSponsorImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("sponsor_name", formData.sponsor_name);
    data.append("sponsor_description", formData.sponsor_description);
    data.append("website_url", formData.website_url);
    data.append("is_active", formData.is_active);
    if (sponsorImage) data.append("sponsor_image", sponsorImage);

    try {
      await axios.put(`http://localhost:5000/sponsor/update/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/sponsors");
    } catch (error) {
      setError("Error updating sponsor. Please try again.");
    }
  };

  return (
    <div
      className={`max-w-4xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Sponsor</h2>
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
          <label className="block text-lg font-medium">Sponsor Name</label>
          <input
            type="text"
            name="sponsor_name"
            value={formData.sponsor_name}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Description</label>
          <textarea
            name="sponsor_description"
            value={formData.sponsor_description}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Website URL</label>
          <input
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Is Active</label>
          <select
            name="is_active"
            value={formData.is_active}
            onChange={handleInputChange}
            className={`w-full p-2 border rounded-lg ${
              darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
            }`}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-medium">Sponsor Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className={`w-full p-2 ${darkMode ? "text-white" : "text-black"}`}
          />
          {sponsor.sponsor_image && (
            <img
              src={`http://localhost:5000${sponsor.sponsor_image}`}
              alt="Current sponsor"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className={`w-full p-2 text-white rounded-lg ${
            darkMode ? "bg-[#1c64d4]" : "bg-[#4CAF50]"
          }`}
        >
          Update Sponsor
        </button>
      </form>
    </div>
  );
};

export default EditSponsor;
