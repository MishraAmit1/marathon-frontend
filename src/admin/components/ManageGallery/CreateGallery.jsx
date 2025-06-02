import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { API_BASE_URL } from "../../../config/api.js";

const CreateGallery = () => {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    header_image: "",
    heading: "",
    description_title: "",
    description_text: "",
    images: [{ src: "", alt: "", caption: "", category: "" }],
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newImages = [...formData.images];
    newImages[index] = { ...newImages[index], [name]: value };
    setFormData({ ...formData, images: newImages });
  };

  const addImage = () => {
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        { src: "", alt: "", caption: "", category: "" },
      ],
    });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/gallery/gallery`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.status === 200) {
        navigate("/manage-gallery");
      }
    } catch (error) {
      setError("Error creating Gallery.");
    }
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-8 p-6 border rounded-lg shadow-md ${
        darkMode ? "bg-[#132D69] text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Create Gallery</h2>
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
            onChange={(e) =>
              setFormData({ ...formData, header_image: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, heading: e.target.value })
            }
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Description Title</label>
          <input
            type="text"
            name="description_title"
            value={formData.description_title}
            onChange={(e) =>
              setFormData({ ...formData, description_title: e.target.value })
            }
            className={`w-full p-2 border rounded-md ${
              darkMode
                ? "bg-[#132D69] text-white border-gray-600"
                : "bg-white text-black border-gray-300"
            }`}
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Description Text</label>
          <textarea
            name="description_text"
            value={formData.description_text}
            onChange={(e) =>
              setFormData({ ...formData, description_text: e.target.value })
            }
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
          <label className="block font-bold mb-2">Images</label>
          {formData.images.map((image, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md">
              <input
                type="text"
                name="src"
                value={image.src}
                onChange={(e) => handleChange(e, index)}
                placeholder="Image URL"
                className={`w-full p-2 mb-2 border rounded-md ${
                  darkMode
                    ? "bg-[#132D69] text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                required
              />
              <input
                type="text"
                name="alt"
                value={image.alt}
                onChange={(e) => handleChange(e, index)}
                placeholder="Alt Text"
                className={`w-full p-2 mb-2 border rounded-md ${
                  darkMode
                    ? "bg-[#132D69] text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                required
              />
              <input
                type="text"
                name="caption"
                value={image.caption}
                onChange={(e) => handleChange(e, index)}
                placeholder="Caption"
                className={`w-full p-2 mb-2 border rounded-md ${
                  darkMode
                    ? "bg-[#132D69] text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                required
              />
              <select
                name="category"
                value={image.category}
                onChange={(e) => handleChange(e, index)}
                className={`w-full p-2 mb-2 border rounded-md ${
                  darkMode
                    ? "bg-[#132D69] text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                required
              >
                <option value="">Select Category</option>
                <option value="Marathon">Marathon</option>
                <option value="Swimming">Swimming</option>
                <option value="Cycling">Cycling</option>
                <option value="Triathlon">Triathlon</option>
              </select>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addImage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Image
          </button>
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
            onClick={() => navigate("/manage-gallery")}
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

export default CreateGallery;
