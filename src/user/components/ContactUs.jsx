import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { API_BASE_URL } from "../../config/api.js";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactInfo, setContactInfo] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/contact/info`);
        setContactInfo(response.data);
      } catch (error) {
        console.error("Error fetching contact info:", error);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/contact/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStatus(response.data.message);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-20 pb-12"
      style={{
        backgroundImage: `url('https://plus.unsplash.com/premium_photo-1664304819212-911fd3b50a1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFyYXRob24lMjBydW5uZXJzfGVufDB8fDB8fHww')`,
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 md:px-28">
          <h2 className="text-5xl font-bold text-center text-white mb-12 drop-shadow-lg">
            Contact Eventify
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl backdrop-blur-md">
              <h3 className="text-3xl font-semibold text-gray-800 mb-6">
                Send Us a Message
              </h3>
              <p className="text-gray-600 mb-6">
                Questions about our events? Want to partner with us? Drop us a
                line!
              </p>
              {status && (
                <div
                  className={`p-4 mb-6 text-center rounded-lg ${
                    status.includes("success")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {status}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white bg-opacity-80"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white bg-opacity-80"
                    placeholder="Your email"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white bg-opacity-80"
                    placeholder="What’s on your mind?"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white bg-opacity-80"
                    rows="6"
                    placeholder="Tell us more..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-500 text-gray-800 font-semibold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:bg-gray-400 disabled:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="text-white">
              <h3 className="text-3xl font-semibold mb-6 drop-shadow-lg">
                Reach Out
              </h3>
              <p className="text-lg mb-8 drop-shadow-md">
                We’re here to help with all your event queries. Let’s connect!
              </p>
              {contactInfo ? (
                <div className="space-y-8">
                  <div className="flex items-start">
                    <FaEnvelope className="text-yellow-400 text-2xl mr-4 mt-1" />
                    <div>
                      <h4 className="text-xl font-medium">Email</h4>
                      <p className="text-gray-200">{contactInfo.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaPhone className="text-yellow-400 text-2xl mr-4 mt-1" />
                    <div>
                      <h4 className="text-xl font-medium">Phone</h4>
                      <p className="text-gray-200">{contactInfo.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-yellow-400 text-2xl mr-4 mt-1" />
                    <div>
                      <h4 className="text-xl font-medium">Address</h4>
                      <p className="text-gray-200">{contactInfo.address}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-medium mb-4 drop-shadow-lg">
                      Follow Us
                    </h4>
                    <div className="flex space-x-6">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <FaFacebook className="text-3xl" />
                      </a>
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <FaTwitter className="text-3xl" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <FaInstagram className="text-3xl" />
                      </a>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h4 className="text-xl font-medium mb-4 drop-shadow-lg">
                      Our Location
                    </h4>
                    <div className="w-full h-72 rounded-xl overflow-hidden shadow-lg">
                      <iframe
                        src={contactInfo.map_url}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Eventify Location"
                      ></iframe>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading contact info...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
