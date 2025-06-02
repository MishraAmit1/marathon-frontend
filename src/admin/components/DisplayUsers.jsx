import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "./contexts/DarkModeContext"; // Import DarkMode context
import { API_BASE_URL } from "../../config/api.js";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const { darkMode } = useDarkMode(); // Use dark mode state
  const navigate = useNavigate(); // For navigation to edit page

  // Dark mode color scheme for content
  const contentClass = darkMode
    ? "bg-[#081A51] text-white"
    : "bg-white text-black";
  const tableClass = darkMode
    ? "bg-[#112c65] text-white border-gray-600"
    : "bg-[#f9fafb] text-black border-gray-300"; // Table styles for dark mode
  const theadClass = darkMode
    ? "bg-[#071c3f] text-white border-2 border-[#0e2a55]"
    : "bg-[#f3f4f6] text-black border-2 border-[#d1d5db]"; // Header with borders
  const trHoverClass = darkMode ? "hover:bg-[#1a2c56]" : "hover:bg-[#f1f5f9]"; // Hover effect for rows

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Navigate to the edit user page
  const editUser = (id) => {
    navigate(`/dashboard/edituser/${id}`);
  };

  // Handle user deletion
  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_BASE_URL}/auth/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Update the users state to remove the deleted user
        setUsers(users.filter((user) => user.id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className={`container mx-auto mt-10 ${contentClass}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Users List</h1>

      <table
        className={`min-w-full table-auto border-collapse ${tableClass} rounded-lg overflow-hidden`}
      >
        <thead className={theadClass}>
          <tr>
            <th className="p-3 text-left">Full Name</th>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Contact No</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={`${trHoverClass} transition-all duration-300`}
            >
              <td className="border-b p-3">{user.fullname}</td>
              <td className="border-b p-3">{user.username}</td>
              <td className="border-b p-3">{user.email}</td>
              <td className="border-b p-3">{user.contact_no}</td>
              <td className="border-b p-3">
                {user.isAdmin === 1 ? "Admin" : "User"}
              </td>
              <td className="border-b p-3 flex space-x-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-4 rounded-lg hover:bg-yellow-600 transition-colors"
                  onClick={() => editUser(user.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayUsers;
