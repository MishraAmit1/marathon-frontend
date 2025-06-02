import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const BibCollection = () => {
  const [bibData, setBibData] = useState({
    header_image:
      "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop",
    heading: "Bib Collection & Timing",
    intro_text:
      "Running bibs and timing chips are to be collected in person from the Vapi MARATHON EXPO. Please do not forget to bring out a photo identity proof at the time of Bib collection.",
    instructions_title: "Important Bib Instructions",
    instructions_list:
      '["Entry or BIB is non-transferable to any other participant / person.","Your official race BIB number is important. Therefore please ensure that it is displayed during the entire race.","Do not alter the Bib number in any manner.","No one else may wear your bib number.","Any participant found wearing another participant\'s BIB will be disqualified.","The bib number must be pinned properly to the front of your t-shirt and clearly visible at all times.","Folding or covering any part of your bib number may result in disqualification.","Do not forcefully bend, crease or fold your bib.","Make sure to fill out necessary information on the back side of your Bib."]',
    safety_notice_title:
      "To ensure the safety of all participants, running bibs will not be issued to anyone other than the registered runner.",
    safety_notice_text:
      "To ensure the safety of all participants, running bibs will not be issued to anyone other than the registered runner. Additionally, no authority letters will be accepted for this purpose. This policy is in place to maintain the integrity of the event and to help us provide a secure environment for everyone involved.\nPlease schedule your travel plan and itinerary as per bib collection dates. Please do not forget to bring a photo identity proof at the time of BIB collection. It is mandatory to collect your BIBs as per dates given below.",
    image_url: "https://ladakhmarathon.com/wp-content/uploads/2025/02/2.4.jpg",
  });

  useEffect(() => {
    const fetchBibCollection = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/bib-collection/bib-collection`
        );
        if (response.data) setBibData(response.data);
      } catch (error) {
        console.error("Error fetching Bib Collection:", error);
      }
    };
    fetchBibCollection();
  }, []);

  return (
    <>
      <div
        className="w-full relative bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${bibData.header_image})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="container mx-auto text-center py-20 relative z-10">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl tracking-wider font-sans">
            {bibData.heading}
          </h1>
          <div className="text-white text-lg font-medium drop-shadow-lg tracking-wider">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <span>HOME</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-yellow-400">Bib Collection</span>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-50 py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          {/* Marathon Hub Info Section */}
          <div className="flex flex-col lg:flex-row items-start gap-12 mb-16">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <p className="text-lg font-serif text-gray-700 leading-relaxed">
                {bibData.intro_text}
              </p>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-sans">
                  {bibData.instructions_title}
                </h3>
                <ul className="space-y-3 font-serif">
                  {JSON.parse(bibData.instructions_list).map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-1">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2">
              <img
                src={bibData.image_url}
                alt="Vapi Marathon Runners"
                className="rounded-xl shadow-lg w-full h-[700px]"
              />
            </div>
          </div>

          {/* Safety Notice Section */}
          <div className="max-w-4xl mx-auto bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500 mt-8">
            <p className="text-lg font-serif leading-relaxed">
              <span className="font-bold text-gray-800 block mb-2">
                {bibData.safety_notice_title}
              </span>
              <span className="text-gray-700">
                {bibData.safety_notice_text.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    {index <
                      bibData.safety_notice_text.split("\n").length - 1 && (
                      <br />
                    )}
                  </span>
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BibCollection;
