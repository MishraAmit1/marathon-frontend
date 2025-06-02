import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api.js";

const InviteAdmin = () => {
  const [inviteLink, setInviteLink] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false); // State to show "Copied!" feedback

  const handleGenerateInvite = async () => {
    setError("");
    setIsGenerating(true);
    setCopied(false); // Reset copied state
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/admin/invite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInviteLink(response.data.inviteLink);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to generate invite.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => {
        setCopied(true); // Show "Copied!" feedback
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        setError("Failed to copy link: " + err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Invite New Admin
        </h2>
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        {inviteLink && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm mb-2">
              Share this invite link with the new admin:
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        )}
        <button
          onClick={handleGenerateInvite}
          disabled={isGenerating}
          className={`w-full py-2 px-4 text-white font-medium rounded-md shadow-sm ${
            isGenerating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {isGenerating ? "Generating..." : "Generate Invite Link"}
        </button>
      </div>
    </div>
  );
};

export default InviteAdmin;
