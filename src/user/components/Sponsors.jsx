import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api.js";

const Sponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/sponsor/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Filter only active sponsors
        const activeSponsors = response.data.filter(
          (sponsor) => sponsor.is_active
        );
        setSponsors(activeSponsors);
      } catch (error) {
        console.error("Error fetching sponsors:", error);
        setError("Error fetching sponsors. Please try again.");
      }
    };
    fetchSponsors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:px-28">
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded text-center">
          {error}
        </div>
      )}
      <div className="relative overflow-hidden">
        {/* Sponsor Slider */}
        <div className="flex animate-slide whitespace-nowrap">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.sponsor_id}
              className="flex-shrink-0 mx-8 hover:scale-110 transition-transform duration-300"
            >
              <img
                src={`${API_BASE_URL}${sponsor.sponsor_image}`}
                alt={sponsor.sponsor_name}
                className="h-28 w-28 object-contain" // Fixed height and width
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {sponsors.map((sponsor) => (
            <div
              key={`${sponsor.sponsor_id}-duplicate`}
              className="flex-shrink-0 mx-8 hover:scale-110 transition-transform duration-300"
            >
              <img
                src={`${API_BASE_URL}${sponsor.sponsor_image}`}
                alt={sponsor.sponsor_name}
                className="h-24 w-24 object-contain" // Same fixed height and width
              />
            </div>
          ))}
        </div>
        {/* Fade Effects */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none md:w-32"></div>
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none md:w-32"></div>
      </div>
    </div>
  );
};

export default Sponsors;
