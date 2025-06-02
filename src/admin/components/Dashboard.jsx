import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDarkMode } from "../components/contexts/DarkModeContext";
import {
  FaUsers,
  FaCalendarAlt,
  FaCalendarCheck,
  FaEnvelope,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { API_BASE_URL } from "../../config/api.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [activeEvents, setActiveEvents] = useState(0);
  const [totalContactSubmissions, setTotalContactSubmissions] = useState(0);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/total-users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error(
          "Error fetching total users:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const fetchTotalEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/event/total`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTotalEvents(response.data.totalEvents);
      } catch (error) {
        console.error(
          "Error fetching total events:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const fetchActiveEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/event/active`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setActiveEvents(response.data.activeEvents);
      } catch (error) {
        console.error(
          "Error fetching active events:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const fetchTotalContactSubmissions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/contact/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTotalContactSubmissions(response.data.length);
      } catch (error) {
        console.error(
          "Error fetching contact submissions:",
          error.response ? error.response.data : error.message
        );
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchTotalUsers(),
        fetchTotalEvents(),
        fetchActiveEvents(),
        fetchTotalContactSubmissions(),
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Chart data
  const chartData = {
    labels: [
      "Total Users",
      "Total Events",
      "Active Events",
      "Contact Submissions",
    ],
    datasets: [
      {
        label: "Dashboard Metrics",
        data: [totalUsers, totalEvents, activeEvents, totalContactSubmissions],
        backgroundColor: darkMode
          ? ["#818cf8", "#60a5fa", "#4ade80", "#facc15"]
          : ["#4f46e5", "#2563eb", "#16a34a", "#d97706"],
        borderColor: darkMode
          ? ["#4f46e5", "#2563eb", "#16a34a", "#d97706"]
          : ["#3730a3", "#1e40af", "#15803d", "#b45309"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Metrics Overview",
        color: darkMode ? "#ffffff" : "#000000",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
          color: darkMode ? "#ffffff" : "#000000",
        },
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
        },
        grid: {
          color: darkMode ? "#374151" : "#e5e7eb",
        },
      },
      x: {
        title: {
          display: true,
          text: "Metrics",
          color: darkMode ? "#ffffff" : "#000000",
        },
        ticks: {
          color: darkMode ? "#ffffff" : "#000000",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          darkMode ? "bg-[#132D69] text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`container mx-auto mt-12 p-8 min-h-screen ${
        darkMode ? "bg-[#132D69] text-white" : "bg-gray-100 text-black"
      } transition-all duration-300`}
    >
      <h1 className="text-4xl font-bold text-center mb-10 animate-fadeIn">
        Admin Dashboard
      </h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link to="/dashboard/displayuser" className="animate-slideIn">
          <div
            className={`bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <FaUsers className="text-5xl mb-3" />
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-6xl font-bold mt-4">{totalUsers}</p>
          </div>
        </Link>

        <Link to="/events" className="animate-slideIn">
          <div
            className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <FaCalendarAlt className="text-5xl mb-3" />
            <h2 className="text-xl font-semibold">Total Events</h2>
            <p className="text-6xl font-bold mt-4">{totalEvents}</p>
          </div>
        </Link>

        <Link to="/events" className="animate-slideIn">
          <div
            className={`bg-gradient-to-r from-green-600 to-green-800 text-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <FaCalendarCheck className="text-5xl mb-3" />
            <h2 className="text-xl font-semibold">Active Events</h2>
            <p className="text-6xl font-bold mt-4">{activeEvents}</p>
          </div>
        </Link>

        <Link to="/manage-contact-submissions" className="animate-slideIn">
          <div
            className={`bg-gradient-to-r from-yellow-600 to-yellow-800 text-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <FaEnvelope className="text-5xl mb-3" />
            <h2 className="text-xl font-semibold">Contact Submissions</h2>
            <p className="text-6xl font-bold mt-4">{totalContactSubmissions}</p>
          </div>
        </Link>
      </div>

      {/* Chart Section */}
      <div
        className={`mb-12 p-6 rounded-xl shadow-xl animate-fadeIn ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } border`}
      >
        <h2 className="text-2xl font-semibold mb-6">Metrics Overview</h2>
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
