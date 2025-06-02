import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const HowToReach = () => {
  const [reachData, setReachData] = useState({
    header_image:
      "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop",
    heading: "Options of Travelling to Vapi",
    intro_text:
      "Vapi, a bustling industrial city and municipality in Valsad district of Gujarat, is strategically located near the banks of the Daman Ganga River, approximately 28 km south of Valsad and surrounded by the Union Territory of Dadra and Nagar Haveli and Daman and Diu. It serves as a key hub connecting major cities like Mumbai, Delhi, and nearby regions. There are several rewarding ways to reach Vapi, each offering a unique travel experience!",
    option1_title: "Option I – Flying",
    option1_description:
      "The easiest and fastest way to reach Vapi is by flying, though there are no direct commercial flights to Vapi itself as it lacks an airport. The nearest major airport is Chhatrapati Shivaji Maharaj International Airport (BOM) in Mumbai, about 170-176 km away. From Mumbai, you can take a connecting flight or a short domestic flight to a nearby city like Surat (STV), which is approximately 120 km from Vapi, followed by a road trip.",
    option1_details:
      '[{"title": "From Delhi and Mumbai", "content": "Several daily flights operate from Indira Gandhi International Airport (DEL) and Mumbai to Surat, with the first flights departing as early as 05:00 hrs. Return flights from Surat to Delhi or Mumbai start around 07:00 hrs. Flight duration is about 2-2.5 hours, and fares typically range from ₹2,500 to ₹7,395 depending on the airline and booking time."}, {"title": "From Nearby Cities", "content": "Flights from Jammu, Chandigarh, and Srinagar to Mumbai or Surat are available on select days, with connections to Vapi via road."}, {"title": "Post-Flight", "content": "From Surat, you can hire a taxi (approx. ₹2,500-₹3,000) or take a bus (approx. ₹300-₹500) to Vapi, taking 2.5-3 hours."}]',
    option2_title: "Option II – Fly and Drive",
    option2_description:
      "This option combines air travel with a scenic road journey, ideal for enjoying the landscapes. Fly to Mumbai or Surat, then drive to Vapi.",
    option2_details:
      '[{"title": "Via Mumbai", "content": "Take a flight from Delhi, Chandigarh, or other metro cities to Mumbai. From Mumbai airport, you can: hire a cab (approx. ₹2,305 one-way or ₹4,610 round trip for a sedan) for a 4-4.5-hour drive (173-176 km), take a shared taxi or bus from Mumbai to Vapi (approx. ₹300-₹500 per head, 4-5 hours), or drive in 1-2 days with an overnight stop in Surat or Navsari, costing ₹5,000-₹7,000 for a private jeep."}, {"title": "Via Srinagar", "content": "Fly from Delhi to Srinagar, spend a night in a houseboat, and then take a shared taxi from Srinagar to Vapi via Jammu and Mumbai. This is a longer route (approx. 1,600 km), taking 24-30 hours with stops, costing around ₹4,000-₹6,000 per head, or ₹25,000-₹30,000 for a private jeep over 2 days with a night in Jammu."}]',
    option3_title: "Option III – Overland Via Mumbai or Delhi",
    option3_description:
      "The overland journey to Vapi offers a rich travel experience, especially via Mumbai or Delhi, with stunning highways and diverse landscapes.",
    option3_details:
      '[{"title": "Getting to Mumbai from Delhi", "content": [{"title": "By Bus", "content": "Himachal Tourism Volvo buses or private operators from ISBT Kashmiri Gate, Delhi, to Mumbai depart between 17:00 hrs and 20:30 hrs, with fares ranging from ₹1,200-₹1,500 per head. The journey takes 24-26 hours."}, {"title": "By Train", "content": "Take the Shatabdi Express from New Delhi to Mumbai Central (approx. 16-18 hours, ₹1,000-₹2,500) or other trains like Paschim Express. From Mumbai, buses or taxis to Vapi are available (4-5 hours, ₹300-₹2,305)."}, {"title": "By Flight", "content": "Fly from Delhi to Mumbai (₹2,500-₹7,395, 2-2.5 hours), then drive or take a bus/taxi to Vapi."}]}, {"title": "Getting to Vapi from Mumbai", "content": [{"title": "Shared Taxis", "content": "Cost around ₹400-₹500 per head, taking 4-5 hours (approx. 170 km)."}, {"title": "Hire a Taxi", "content": "A private taxi from Mumbai to Vapi costs ₹2,305-₹4,610 for a round trip, or ₹21,000-₹26,000 for a 2-day trip with an overnight stop in Surat or Navsari. Surat offers comfortable hotels starting at ₹1,000 per night."}]}, {"title": "Via Delhi Directly", "content": [{"title": "By Train", "content": "Direct trains like Paschim Express or Swaraj Express from New Delhi to Vapi take 19-22 hours, with fares from ₹500-₹1,800. First train departs around 05:00 hrs, last at 22:15 hrs."}, {"title": "By Bus", "content": "Buses from Delhi to Vapi via Mumbai or Ahmedabad take 24-28 hours, costing ₹1,500-₹2,000 per head."}]}]',
    note_text:
      "*Please note all prices mentioned are approximate as of April 17, 2025, and may vary based on service providers, season, or booking time. It is advisable to pre-book services and confirm prices before travel.*\n\n*Notes:* Unlike Leh, Vapi is at a lower altitude (approx. 30-40 meters), so no special acclimatization is needed, but long drives may require breaks. Best time to visit: October to March offers pleasant weather, though industrial activity peaks year-round. Use reputed operators and carry ID proof (Aadhaar, Voter ID, etc.) for train/bus travel.",
  });

  useEffect(() => {
    const fetchHowToReach = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/how-to-reach/how-to-reach`
        );
        if (response.data) setReachData(response.data);
      } catch (error) {
        console.error("Error fetching How to Reach:", error);
      }
    };
    fetchHowToReach();
  }, []);

  return (
    <>
      {/* Header Section with Background Image */}
      <div
        className="w-full relative bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${reachData.header_image})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="container mx-auto text-center py-20 relative z-10">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl tracking-wider font-sans">
            HOW TO REACH
          </h1>
          <div className="text-white text-lg font-medium drop-shadow-lg tracking-wider">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <span>HOME</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-yellow-400">HOW TO REACH</span>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full bg-gray-50 py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight font-sans">
            {reachData.heading}
          </h2>
          <p className="text-gray-600 text-lg mb-10 text-center max-w-3xl mx-auto leading-relaxed font-serif">
            {reachData.intro_text}
          </p>

          {/* Option I - Flying */}
          <div className="mb-16 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide font-sans border-b pb-4 border-gray-200">
              {reachData.option1_title}
            </h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed font-serif">
              {reachData.option1_description}
            </p>
            <ul className="space-y-4 font-serif">
              {JSON.parse(reachData.option1_details).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <div>
                    <span className="font-semibold text-gray-800">
                      {item.title}:
                    </span>{" "}
                    <span className="text-gray-700">{item.content}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Option II - Fly and Drive */}
          <div className="mb-16 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide font-sans border-b pb-4 border-gray-200">
              {reachData.option2_title}
            </h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed font-serif">
              {reachData.option2_description}
            </p>
            <ul className="space-y-4 font-serif">
              {JSON.parse(reachData.option2_details).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <div>
                    <span className="font-semibold text-gray-800">
                      {item.title}:
                    </span>{" "}
                    <span className="text-gray-700">{item.content}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Option III - Overland Via Mumbai or Delhi */}
          <div className="mb-16 max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 tracking-wide font-sans border-b pb-4 border-gray-200">
              {reachData.option3_title}
            </h3>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed font-serif">
              {reachData.option3_description}
            </p>
            <ul className="space-y-6 font-serif">
              {JSON.parse(reachData.option3_details).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <div>
                    <span className="font-semibold text-gray-800 block mb-2">
                      {item.title}:
                    </span>
                    <ul className="pl-4 space-y-3">
                      {item.content.map((subItem, subIndex) => (
                        <li key={subIndex} className="flex items-start">
                          <span className="text-blue-500 mr-2">◦</span>
                          <div>
                            <span className="font-medium text-gray-800">
                              {subItem.title}:
                            </span>{" "}
                            <span className="text-gray-700">
                              {subItem.content}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Note Section */}
          <div className="mt-12 max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg border-l-4 border-yellow-500">
            {reachData.note_text.split("\n").map((line, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "italic text-gray-700 mb-4 font-serif"
                    : "text-gray-700 leading-relaxed font-serif"
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToReach;
