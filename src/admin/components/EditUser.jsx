import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/api.js";

const EditUser = () => {
  const { id } = useParams(); // Get the user id from URL params
  const navigate = useNavigate(); // To navigate after successful update
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    contact_no: "",
    isAdmin: 2, // Default to "User"
  });

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          // Fetch user data from the backend
          const response = await axios.get(`${API_BASE_URL}/auth/users/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Make sure token is correct
            },
          });

          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUser();
    }
  }, [id]);

  // Handle form submission to update user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the updated user data to the backend
      await axios.put(`${API_BASE_URL}/auth/users/${id}`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Token for authentication
        },
      });

      // After successful update, navigate to the user list page
      navigate("/dashboard/displayuser");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Edit User</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={user.fullname}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Contact No</label>
          <input
            type="text"
            name="contact_no"
            value={user.contact_no}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block">Role</label>
          <select
            name="isAdmin"
            value={user.isAdmin}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value={1}>Admin</option>
            <option value={2}>User</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update User
        </button>
      </form>
    </div>
  );
};

export default EditUser;
