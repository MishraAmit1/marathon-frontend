import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api.js";

const Results = () => {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    year: new Date().getFullYear(),
    gender: "",
  });

  useEffect(() => {
    fetchResults();
  }, [filters.year, filters.gender]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/results/all`, {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error(
        "Error fetching results:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes, seconds] = timeString.split(":");
    let date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(parseInt(seconds, 10));
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 min-h-screen px-20">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        Results
      </h2>
      <div className="flex flex-col md:flex-row gap-6 mb-6 px-20">
        <select
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          className="p-2 border border-gray-300 rounded bg-white text-black w-full md:w-1/3"
        >
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() - i
          ).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={filters.gender}
          onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          className="p-2 border border-gray-300 rounded bg-white text-black w-full md:w-1/4"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-20">
        {results.map((result, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-gray-100 shadow-lg"
          >
            <div className="relative border-8 border-gray-100">
              <div className="bg-gray-200 p-12">
                <div className="absolute left-4 top-4 text-2xl font-bold text-red-500">
                  {result.event_name}
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://ladakhmarathon.com/wp-content/uploads/2025/02/placeholder-race-1.jpg"
                    alt="Stupa silhouette"
                    className=""
                  />
                </div>
              </div>
            </div>
            <div className="p-4 text-center">
              <div className="mb-2 text-red-500">Name: {result.name}</div>
              <h3 className="text-xl font-bold text-gray-800">
                {result.user_name}
              </h3>
              <div className="mt-6 flex justify-between">
                <div className="text-red-500">{result.bibno}</div>
                <div className="text-gray-700">
                  {formatTime(result.raceTime)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
