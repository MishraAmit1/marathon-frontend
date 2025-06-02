import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const EligibilityCriteria = () => {
  const [criteriaData, setCriteriaData] = useState({
    header_image:
      "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?q=80&w=1000&auto=format&fit=crop",
    heading: "Eligibility Criteria",
    age_eligibility_title:
      "AGE ELIGIBILITY as on 14th September 2025 for various runs is:",
    age_eligibility_table: [
      {
        rows: [
          {
            cells: [
              "05KM RUN FOR FUN",
              "11.2KM RUN",
              "HALF MARATHON (21.0975KM)",
            ],
          },
          { cells: ["12 years", "14 years", "16 years"] },
          {
            cells: [
              "MARATHON (42.195KM)",
              "KHARDUNG LA CHALLENGE (72KM)",
              "SILK ROUTE ULTRA (122KM)",
            ],
          },
          { cells: ["18 years", "20 years", "24 years"] },
          { cells: ["", "VETERANS (ALL RACES)", ""] },
          { cells: ["", "52 years", ""] },
        ],
      },
    ],
    notes_title: "Eligibility/Qualification Notes",
    notes_list: [
      "The following eligibility criteria are mandatory for all participants of all runs, except the 5km Run for Fun. Entries for these categories will be screened and if you do not fulfill the requirement, the Event organiser has the right to reject your application.",
      "It is mandatory for all participants to collect running bib in person. Please schedule your travel plan and itinerary as per BIB collection dates.",
      "To ensure the safety of all participants, running bibs will not be issued to anyone other than the registered runner. Additionally, no authority letters will be accepted for this purpose. This policy is in place to maintain the integrity of the event and to help us provide a secure environment for everyone involved.",
      "If any participant is found wearing another participant’s BIB, he/she will be disqualified and not allowed future participation in Ladakh Marathon.",
      "Eligible / qualifying runs for 12th edition of the Ladakh Marathon should have been completed between 8th September 2023 and 21st April 2025, and at least one run must be after 1st January 2024 as per criteria.",
      "Stadium runs do not count as qualifying runs.",
      "24-Hour runs do not count as qualifying runs.",
      "Virtual Runs do not count as qualifying runs.",
      "Personal timings recorded using Garmin/Strava etc do not count.",
      "ELIGIBILITY PERIOD: ELIGIBLE/QUALIFYING RUNS FOR LADAKH MARATHON SHOULD HAVE BEEN COMPLETED BETWEEN 8TH SEPTEMBER 2023 AND 21ST APRIL 2025, AND AT LEAST ONE RUN MUST BE AFTER 1ST JANUARY 2024 AS PER CRITERIA.",
    ],
  });

  useEffect(() => {
    const fetchEligibilityCriteria = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/eligibility-criteria/eligibility-criteria`
        );
        if (response.data) {
          setCriteriaData({
            ...response.data,
            age_eligibility_table: JSON.parse(
              response.data.age_eligibility_table || '[{"rows": []}]'
            ),
            notes_list: JSON.parse(response.data.notes_list || "[]"),
          });
        }
      } catch (error) {
        console.error("Error fetching Eligibility Criteria:", error);
      }
    };
    fetchEligibilityCriteria();
  }, []);

  // Extract pairs of run and age from the table rows
  const eligibilityPairs = [];
  for (
    let i = 0;
    i < criteriaData.age_eligibility_table[0].rows.length;
    i += 2
  ) {
    const runRow = criteriaData.age_eligibility_table[0].rows[i];
    const ageRow = criteriaData.age_eligibility_table[0].rows[i + 1];
    if (runRow && ageRow) {
      runRow.cells.forEach((run, index) => {
        if (run && ageRow.cells[index]) {
          eligibilityPairs.push({ run, age: ageRow.cells[index] });
        }
      });
    }
  }

  return (
    <>
      {/* Header Section */}
      <div
        className="w-full relative bg-cover bg-center h-80"
        style={{
          backgroundImage: `url(${criteriaData.header_image})`,
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div className="container mx-auto text-center py-20 relative z-10">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-2xl tracking-wider font-sans">
            {criteriaData.heading}
          </h1>
          <div className="text-white text-lg font-medium drop-shadow-lg tracking-wider">
            <Link
              to="/user/dashboard"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              <span>HOME</span>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-yellow-400">Eligibility Criteria</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full bg-gray-50 py-24">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
          {/* Age Eligibility Cards */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-sans">
              {criteriaData.age_eligibility_title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligibilityPairs.map(
                (pair, index) =>
                  pair.run && (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
                    >
                      <h3
                        className={`text-lg font-semibold mb-2 ${
                          pair.run.includes("RUN") ||
                          pair.run.includes("VETERANS")
                            ? "text-red-600"
                            : "text-gray-800"
                        }`}
                      >
                        {pair.run || "N/A"}
                      </h3>
                      <p className="text-gray-600 text-base">
                        {pair.age || "N/A"}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>

          {/* Eligibility/Qualification Notes */}
          <div className="max-w-4xl mx-auto bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-sans">
              {criteriaData.notes_title}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 font-serif leading-relaxed">
              {criteriaData.notes_list.map((note, index) => (
                <li
                  key={index}
                  className={
                    note.includes("ELIGIBILITY PERIOD")
                      ? "font-bold text-gray-800"
                      : ""
                  }
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EligibilityCriteria;
