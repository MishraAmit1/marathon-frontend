import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState({
    subheading: "OVERCOME NEW DISTANCES",
    heading: "ELEVATE YOUR RUN, TRIUMPH AWAITS YOU",
    description:
      "Established in 1985 by the Rotary Club of Vapi, Rofel Trust emerged to uplift the community...",
    button_text: "Learn More",
    button_link: "/user/general-info/about/organiser",
    image1_url:
      "https://redy.axiomthemes.com/wp-content/uploads/2024/02/image-15.jpg",
    image2_url:
      "https://redy.axiomthemes.com/wp-content/uploads/2024/02/image-16.jpg",
  });

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/about/about-us`);
        if (response.data) setAboutData(response.data);
      } catch (error) {
        console.error("Error fetching About Us:", error);
      }
    };
    fetchAboutUs();
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
            ABOUT US
          </h1>
          <div className="text-white text-base font-medium drop-shadow-md">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors"
            >
              <span>HOME </span>
            </Link>
            / <span className="text-yellow-400"> ABOUT US</span>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-20">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20 flex flex-col gap-10 lg:flex-row justify-between mb-40">
          <div className="lg:w-1/2 pr-0 lg:pr-16 mb-12 lg:mb-0 mt-32">
            <h3 className="text-gray-700 font-medium mb-3">
              {aboutData.subheading}
            </h3>
            <h2 className="text-4xl font-bold mb-5">
              {aboutData.heading.split(" ").map((word, index) =>
                word === "AWAITS" ? (
                  <span key={index} className="text-yellow-400">
                    {word}
                  </span>
                ) : (
                  `${word} `
                )
              )}
            </h2>
            <p className="text-gray-600 mb-8">{aboutData.description}</p>
            <button className="border border-gray-300 px-8 py-3 font-medium hover:bg-gray-100 transition">
              <Link to={aboutData.button_link}>{aboutData.button_text}</Link>
            </button>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute right-0 top-0 w-3/4 h-80 z-10">
              <img
                src={aboutData.image1_url}
                alt="Runner in field"
                className="w-[443px] h-[393px] object-cover"
              />
            </div>
            <div className="relative top-40 left-0 w-3/4 h-80 z-20">
              <img
                src={aboutData.image2_url}
                alt="Runner in start position"
                className="w-[393px] h-[383px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
