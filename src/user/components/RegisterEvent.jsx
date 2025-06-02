import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaVenusMars,
  FaCalendarAlt,
  FaCity,
  FaEnvelope,
  FaPhone,
  FaPhoneVolume,
  FaTshirt,
  FaTicketAlt,
  FaListAlt,
  FaRulerHorizontal,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config/api.js";

const RegisterEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [distances, setDistances] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    city: "",
    email: "",
    contactno: "",
    emergencyno: "",
    tshirtsize: "",
    bookingreference: "",
    participatein: "",
    event_id: eventId,
    category_id: "",
    isactive: 1,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/category/event/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Error fetching categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserRegistrations = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/event-registration/my-registrations`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserRegistrations(res.data.data);
      } catch (error) {
        console.error("Error fetching user registrations:", error);
      }
    };

    fetchCategories();
    fetchUserRegistrations();
  }, [eventId]);

  useEffect(() => {
    if (selectedCategory) {
      const fetchDistances = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${API_BASE_URL}/participatein/entries/${selectedCategory}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const availableDistances = [
            ...new Set(
              res.data.participationOptions.map((option) => option.km)
            ),
          ];
          setDistances(availableDistances);
        } catch (error) {
          console.error("Error fetching distances:", error);
          setError("Error fetching distances. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchDistances();
    } else {
      setDistances([]);
    }
  }, [selectedCategory]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isAlreadyRegistered = () => {
    const eventDetails = categories.find(
      (cat) => cat.category_id === formData.category_id
    );
    if (!eventDetails || !eventDetails.event_date) return false;

    const eventDate = new Date(eventDetails.event_date).toLocaleDateString(
      "en-GB",
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );

    return userRegistrations.some(
      (reg) =>
        reg.event_id === eventId && formatDate(reg.event_date) === eventDate
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category_id || !formData.participatein) {
      setError("Please select category and distance.");
      return;
    }

    if (isAlreadyRegistered()) {
      setError("You are already registered for this event.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/event-registration/register`,
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setSuccessMessage("Registration successful!");
      setFormData({
        name: "",
        gender: "",
        dob: "",
        city: "",
        email: "",
        contactno: "",
        emergencyno: "",
        tshirtsize: "",
        bookingreference: "",
        participatein: "",
        event_id: eventId,
        category_id: "",
        isactive: 1,
      });
      setSelectedCategory("");
      setDistances([]);
      setTimeout(() => navigate("/user/events"), 2000);
    } catch (error) {
      console.error("Error creating registration:", error);
      setError(
        error.response?.data?.message ||
          "Error creating registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
            <h2 className="text-3xl font-bold text-center">
              Register for Event
            </h2>
            <p className="text-center mt-2 text-blue-100">
              Complete the form below to secure your spot
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {error && (
              <div className="p-4 mb-6 text-red-700 bg-red-100 rounded-lg border-l-4 border-red-500 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}
            {successMessage && (
              <div className="p-4 mb-6 text-green-700 bg-green-100 rounded-lg border-l-4 border-green-500 flex items-center">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaVenusMars className="text-gray-400" />
                      </div>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCity className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your city"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="contactno"
                        value={formData.contactno}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhoneVolume className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="emergencyno"
                        value={formData.emergencyno}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Emergency contact number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
                  Event Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      T-Shirt Size
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaTshirt className="text-gray-400" />
                      </div>
                      <select
                        name="tshirtsize"
                        value={formData.tshirtsize}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Size</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">X-Large</option>
                        <option value="XXL">XX-Large</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Booking Reference
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaTicketAlt className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="bookingreference"
                        value={formData.bookingreference}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter booking reference"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Category
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaListAlt className="text-gray-400" />
                      </div>
                      <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          handleInputChange(e);
                        }}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">-- Select a Category --</option>
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
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Distance (KM)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaRulerHorizontal className="text-gray-400" />
                      </div>
                      <select
                        name="participatein"
                        value={formData.participatein}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={!selectedCategory}
                      >
                        <option value="">-- Select Distance --</option>
                        {distances.map((distance) => (
                          <option key={distance} value={distance}>
                            {distance} KM
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={isAlreadyRegistered() || loading}
                  className={`
                    w-full md:w-1/2 py-4 px-6 text-white font-bold text-lg rounded-lg 
                    transition-all duration-300 transform
                    ${
                      isAlreadyRegistered() || loading
                        ? "bg-gray-400 cursor-not-allowed opacity-70"
                        : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:shadow-lg hover:-translate-y-1"
                    }
                  `}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Register Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;
