import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const PartnerAndSponsor = () => {
  const [partnerData, setPartnerData] = useState({
    header_image:
      "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop",
    heading: "Partners and Sponsorship",
    partners_title: "Event Partners And Support",
    partners_text:
      "The Ladakh Marathon is promoted and organized by the High Altitude Sports Foundation Ladakh, a not-for-profit private non-government company duly registered under Section 12AB and Section 80G of the Income Tax Act. The event receives support from the administration of the Union Territory of Ladakh, the Ladakh Autonomous Hill Development Council (LAHDC), the Indian Army, the Indian Air Force, the Indo-Tibetan Border Police (ITBP), and numerous associations, all of which play a crucial role in ensuring the smooth conduct of the Ladakh Marathon.",
    sponsorship_title: "Sponsorship Opportunities",
    sponsorship_text:
      "The primary objective of the High Altitude Sports Foundation Ladakh is to promote distance running and other sporting activities in the Ladakh region. We welcome organizations and individuals who wish to contribute to this cause, or who are interested in partnering with us to be associated with the Ladakh Marathon and support our broader objectives.",
    contact_title: "Please contact the Ladakh Marathon Team at",
    contact_email: "info@vapimarathon.com",
    image_url: "https://ladakhmarathon.com/wp-content/uploads/2025/02/2.4.jpg",
  });

  useEffect(() => {
    const fetchPartnerAndSponsor = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/partner-and-sponsor/partner-and-sponsor`
        );
        if (response.data) setPartnerData(response.data);
      } catch (error) {
        console.error("Error fetching Partner and Sponsor:", error);
      }
    };
    fetchPartnerAndSponsor();
  }, []);

  return (
    <>
      <div
        className="w-full relative bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${partnerData.header_image})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="container mx-auto text-center py-20 relative z-10">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl tracking-wider font-sans">
            {partnerData.heading}
          </h1>
          <div className="text-white text-lg font-medium drop-shadow-lg tracking-wider">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <span>HOME</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-yellow-400">Partners and Sponsorship</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-50 py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          {/* Marathon Hub Info Section */}
          <div className="flex flex-col lg:flex-row items-stretch gap-12 mb-16">
            <div className="w-full lg:w-1/2">
              <div className="h-full">
                <img
                  src={partnerData.image_url}
                  alt="Ladakh Marathon Runners"
                  className="rounded-xl shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-3xl font-bold text-gray-800 tracking-wide font-sans border-b pb-3 border-gray-200">
                {partnerData.partners_title}
              </h2>
              <p className="text-lg font-serif text-gray-700 leading-relaxed">
                {partnerData.partners_text}
              </p>
              <h2 className="text-3xl font-bold text-gray-800 tracking-wide font-sans border-b pb-3 border-gray-200 pt-4">
                {partnerData.sponsorship_title}
              </h2>
              <p className="text-lg font-serif text-gray-700 leading-relaxed">
                {partnerData.sponsorship_text}
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 tracking-wide font-sans pt-4">
                {partnerData.contact_title}
              </h2>
              {/* mail Section */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 inline-block">
                <a
                  href={`mailto:${partnerData.contact_email}`}
                  className="text-xl font-medium text-blue-700 font-sans cursor-pointer hover:underline hover:text-blue-800 transition-colors duration-300"
                >
                  {partnerData.contact_email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerAndSponsor;
