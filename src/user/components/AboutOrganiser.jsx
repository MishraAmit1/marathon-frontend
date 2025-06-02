import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const AboutOrganiser = () => {
  const [organiserData, setOrganiserData] = useState({
    heading: "A Brief History",
    content:
      "The Rotary Club of Vapi, active in community service since before 1985...",
    image1_url: "https://ladakhmarathon.com/wp-content/uploads/2025/02/1.2.jpg",
    image2_url:
      "https://ladakhmarathon.com/wp-content/uploads/2025/03/bg-10-1024x1536.webp",
  });

  useEffect(() => {
    const fetchAboutOrganiser = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/about/about-organiser`
        );
        if (response.data) setOrganiserData(response.data);
      } catch (error) {
        console.error("Error fetching About Organiser:", error);
      }
    };
    fetchAboutOrganiser();
  }, []);

  return (
    <>
      <div
        className="w-full relative bg-cover bg-center h-64"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container mx-auto text-center py-16 relative z-10">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            ABOUT ORGANISER
          </h1>
          <div className="text-white text-base font-medium drop-shadow-md">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors"
            >
              <span>HOME </span>
            </Link>
            / <span className="text-yellow-400"> ABOUT ORGs</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between">
          <div className="lg:w-2/3 pr-0 lg:pr-16 mb-12 lg:mb-0 tracking-wider font-semibold text-xl">
            <h2 className="text-3xl font-bold mb-6 tracking-normal">
              {organiserData.heading}
            </h2>
            <div
              className="text-gray-700 mb-6"
              dangerouslySetInnerHTML={{
                __html: organiserData.content.replace(/\n/g, "<br>"),
              }}
            />
          </div>

          <div className="lg:w-2/5 flex flex-col space-y-6">
            <div className="w-full h-80">
              <img
                src={organiserData.image1_url}
                alt="Runners in Ladakh mountains"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-40">
              <img
                src={organiserData.image2_url}
                alt="Ladakh landscape"
                className="w-full h-[644px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutOrganiser;
