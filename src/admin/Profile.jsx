import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = () => {
      const storedUserData = localStorage.getItem("user");

      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          setUser(userData); // Set user data from localStorage
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Your Profile</h2>
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700 font-medium">Full Name</p>
              <p className="text-gray-900">{user.fullname}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Username</p>
              <p className="text-gray-900">{user.username || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Email</p>
              <p className="text-gray-900">{user.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-700 font-medium">Contact Number</p>
              <p className="text-gray-900">{user.contact_no || "N/A"}</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-700 font-medium">Role</p>
            <p
              className={`text-lg font-bold ${
                user.isAdmin === 1 ? "text-green-500" : "text-blue-500"
              }`}
            >
              {user.isAdmin === 1 ? "Admin" : "User"}
            </p>
          </div>

          {/* Change Password Button */}
          <div className="text-center mt-8">
            <Link to="/dashboard/change-password">
              <button className="bg-blue-500 text-white p-2 rounded">
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
