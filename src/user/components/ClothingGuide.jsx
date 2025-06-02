import React from "react";
import { Link } from "react-router-dom";

const ClothingGuide = () => {
  return (
    <>
      {/* Header Section */}
      <div
        className="w-full relative bg-cover bg-center h-80"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="container mx-auto text-center py-20 relative z-10">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl tracking-wide font-sans">
            Clothing Guide
          </h1>
          <div className="text-white text-lg font-medium drop-shadow-lg tracking-wide flex items-center justify-center">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              HOME
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-yellow-400">Clothing Guide</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          {/* Clothing for All Running Disciplines */}
          <div className="flex flex-col md:flex-row mb-12">
            <div className="md:w-1/2 p-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
                Clothing – For All Running Disciplines
              </h1>
              <ul className="list-disc pl-6 space-y-4 text-gray-700 font-serif leading-relaxed">
                <li>Dri-Fit Track pants / Running shorts / tights</li>
                <li>Fleece jacket</li>
                <li>Short sleeved / Long sleeved Dri-Fit T-shirts</li>
                <li>Sun hat/cap</li>
                <li>
                  Spare set of socks for race day for wet weather conditions
                </li>
                <li>
                  Sunglasses (with chums are a must for the two ultra runs
                  Khardung La Challenge and Silk Route Ultra)
                </li>
                <li>Sun cream / block and lip salve of factor 25 or higher</li>
                <li>
                  Water bottle (as hydration points will have only water-refill
                  facility)
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 p-6 flex justify-center items-center order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Ultra running gear"
                className="w-full h-auto object-cover rounded-lg shadow-md"
                style={{ minHeight: "100%", maxHeight: "600px" }}
              />
            </div>
          </div>

          {/* For Runners of Silk Route Ultra and Khardung La Challenge */}
          <div className="flex flex-col md:flex-row mb-12">
            <div className="md:w-1/2 p-6 flex justify-center items-center ">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Ultra running gear"
                className="w-full h-auto object-cover rounded-lg shadow-md"
                style={{ minHeight: "100%", maxHeight: "600px" }}
              />
            </div>
            <div className="md:w-1/2 p-6 order-2 md:order-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2 font-sans">
                For Runners Of Silk Route Ultra And Khardung La Challenge
              </h1>

              <ul className="list-disc pl-6 space-y-4 text-gray-700 font-serif leading-relaxed">
                <li>
                  Thermal layers (these will not be required while running)
                </li>
                <li>Gloves</li>
                <li>Headlamp</li>
                <li>Light waterproof / windproof jacket</li>
                <li>Hydration Pack</li>
                <li>
                  Water bottle (hydration points will have water-refill
                  facility)
                </li>
                <li>Spare set of shoes and socks for wet weather conditions</li>
                <li>
                  Runner needs to bring his/her own sleeping bag of minimum -5°
                  C grade. Sleeping bag can also be hired at nominal charges
                  from various outdoor gear shops in Leh.
                </li>
              </ul>
            </div>
          </div>

          {/* Personal First Aid & Medical Kit To Include */}
          <div className="mb-12 bg-gray-100 p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-sans tracking-wide">
              Personal First Aid & Medical Kit To Include
            </h2>
            <div className="flex flex-wrap justify-center gap-14 text-center">
              <ul className="list-none space-y-8 space-x-5">
                <li className="text-red-600 flex items-center justify-center">
                  <span className="mr-2">✔</span> Aspirin
                </li>
                <li className="text-red-600 flex items-center justify-center">
                  <span className="mr-2">✔</span> Throat lozenges
                </li>
                <li className="text-red-600 flex items-center justify-center">
                  <span className="mr-2">✔</span> Antiseptic cream
                </li>
              </ul>
              <ul className="list-none space-y-4">
                <li className="text-red-600 flex items-center justify-center">
                  <span className="mr-2">✔</span> Antacids
                </li>
                <li className="text-red-600 flex items-center justify-center">
                  <span className="mr-2">✔</span> Moleskins
                </li>
              </ul>
              <ul className="list-none space-y-4">
                <li className="text-red-600 flex items-center justify-center">
                  <span className="mr-2">✔</span> Band-Aids
                </li>
                <li className="text-red-600 flex items-center justify-center">
                  <span className="mr-2">✔</span> Small hand towel
                </li>
              </ul>
            </div>
            <p className="text-center text-gray-700 mt-8 font-serif leading-loose text-lg">
              Besides, please check with your physician and carry antihistamines
              and antibiotics for common ailments.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClothingGuide;
