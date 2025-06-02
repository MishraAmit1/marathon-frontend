import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const ManageGallery = () => {
  const { darkMode } = useDarkMode();
  const [gallery, setGallery] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/gallery/gallery`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setGallery(response.data || {});
      } catch (error) {
        setError("Error fetching Gallery.");
      }
    };
    fetchGallery();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/gallery/gallery/${gallery.gallery_id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        setGallery({});
      }
    } catch (error) {
      setError("Error deleting Gallery.");
    }
  };

  return (
    <div
      className={`container mx-auto mt-10 p-5 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Gallery</h2>
        <div>
          {!gallery.gallery_id && (
            <button
              onClick={() => navigate("/create-gallery")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600"
            >
              Add
            </button>
          )}
          {gallery.gallery_id && (
            <button
              onClick={() => navigate(`/edit-gallery/${gallery.gallery_id}`)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              Edit
            </button>
          )}
          {gallery.gallery_id && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 hover:bg-red-600"
            >
              Delete
            </button>
          )}
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
      {gallery.gallery_id ? (
        <div>
          <p>
            <strong>Heading:</strong> {gallery.heading}
          </p>
          <p>
            <strong>Description Title:</strong> {gallery.description_title}
          </p>
          <p>
            <strong>Description Text:</strong> {gallery.description_text}
          </p>
          <p>
            <strong>Image Count:</strong> {gallery.images?.length || 0}
          </p>
          <div>
            {gallery.images?.map((img) => (
              <p key={img.image_id}>
                <strong>Image:</strong> {img.caption} ({img.category}) -{" "}
                <a href={img.src} target="_blank">
                  View
                </a>
              </p>
            ))}
          </div>
        </div>
      ) : (
        <p>No Gallery data available.</p>
      )}
    </div>
  );
};

export default ManageGallery;
