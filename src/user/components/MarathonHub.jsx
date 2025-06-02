import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const MarathonHub = () => {
  const [hubData, setHubData] = useState({
    header_image:
      "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop",
    heading: "Marathon Hub",
    location_title: "The Vapi Marathon Hub Is Located At:",
    location_details:
      "Hotel Dwarka Complex\n(Opposite to the Police Station & CMO office)\nDaman Road, Vap – 396191, U.P.L Vapi",
    timings_title: "Timings:",
    timings_text: "From 10:00 to 13:00hrs and from 15:00 to 18:00hrs",
    image_url: "https://ladakhmarathon.com/wp-content/uploads/2025/02/2.4.jpg",
  });

  useEffect(() => {
    const fetchMarathonHub = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/marathon-hub/marathon-hub`
        );
        if (response.data) setHubData(response.data);
      } catch (error) {
        console.error("Error fetching Marathon Hub:", error);
      }
    };
    fetchMarathonHub();
  }, []);

  return (
    <>
      <div
        className="w-full relative bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${hubData.header_image})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="container mx-auto text-center py-20 relative z-10">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl tracking-wider font-sans">
            {hubData.heading}
          </h1>
          <div className="text-white text-lg font-medium drop-shadow-lg tracking-wider">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <span>HOME</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-yellow-400">Marathon Hub</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-50 py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          {/* Marathon Hub Info Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight font-sans">
                {hubData.location_title}
              </h2>
              <div className="space-y-4 font-serif text-lg text-gray-700">
                {hubData.location_details.split("\n").map((line, index) => (
                  <p key={index} className={index === 0 ? "font-medium" : ""}>
                    {line}
                  </p>
                ))}
              </div>
              <div className="pt-4">
                <h3 className="text-3xl font-bold text-gray-800 mb-4 tracking-wide font-sans">
                  {hubData.timings_title}
                </h3>
                <p className="text-xl font-medium text-orange-600">
                  {hubData.timings_text}
                </p>
              </div>
            </div>
            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <img
                src={hubData.image_url}
                alt="Vapi Marathon Runners"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarathonHub;
