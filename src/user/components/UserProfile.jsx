import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyRegistrations from "./MyRegistrations";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserData = () => {
      const storedUserData = localStorage.getItem("user");
      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          setUser(userData);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      } else {
        console.error("No user data found in localStorage.");
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Profile
      </h2>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* User Info */}
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 font-semibold">Full Name</p>
                <p className="text-gray-800">{user.fullname}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Username</p>
                <p className="text-gray-800">{user.username || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Email</p>
                <p className="text-gray-800">{user.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">Contact Number</p>
                <p className="text-gray-800">{user.contact_no || "N/A"}</p>
              </div>
            </div>
            {/* Change Password Button */}
            <div className="text-center">
              <Link to="/user/change-password">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
                  Change Password
                </button>
              </Link>
            </div>
            {/* View Registrations Button */}
            <div className="text-center">
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
              >
                View Registrations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for MyRegistrations */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                My Registrations
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <MyRegistrations onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
