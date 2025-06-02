import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import eventLogo from "../images/marathon.webp";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navRef = useRef(null);
  const location = useLocation();

  // Close dropdowns when location changes (page navigation)
  useEffect(() => {
    resetAll();
  }, [location]);

  // Handle clicks outside navbar to close dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        resetAll();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const resetDropdowns = () => {
    setActiveDropdown(null);
    setActiveSubmenu(null);
  };

  const resetMobileDropdowns = () => {
    setMobileDropdown(null);
    setMobileSubmenu(null);
  };

  const resetAll = () => {
    resetDropdowns();
    resetMobileDropdowns();
    setIsOpen(false);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    } else {
      setActiveDropdown(dropdown);
      setActiveSubmenu(null);
    }
  };

  const toggleSubmenu = (submenu, e) => {
    e.stopPropagation();
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const toggleMobileDropdown = (dropdown) => {
    if (mobileDropdown === dropdown) {
      setMobileDropdown(null);
      setMobileSubmenu(null);
    } else {
      setMobileDropdown(dropdown);
      setMobileSubmenu(null);
    }
  };

  const toggleMobileSubmenu = (submenu) => {
    setMobileSubmenu(mobileSubmenu === submenu ? null : submenu);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      resetMobileDropdowns();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const eventTypes = [
    { name: "Marathon", path: "/user/events?type=running" },
    { name: "Swimming", path: "/user/events?type=swimming" },
    { name: "Cycling", path: "/user/events?type=cycling" },
    { name: "Triathlon", path: "/user/events?type=triathlon" },
  ];

  const registrationOptions = [
    // { name: "How To Register", path: "/user/registration/how-to-register" },
    { name: "Eligibility Criteria", path: "/user/registration/eligibility" },
    // { name: "Application Fee", path: "/user/registration/fees" },
    { name: "Terms & Conditions", path: "/user/registration/terms" },
    // { name: "Refund & Cancellation Policy", path: "/user/registration/refund" },
    { name: "Clothing Guide", path: "/user/registration/clothing-guide" },
  ];

  const generalInfoOptions = [
    {
      name: "About Us",
      id: "about-us",
      subOptions: [
        { name: "A Brief History", path: "/user/general-info/about/history" },
        {
          name: "About the Organiser",
          path: "/user/general-info/about/organiser",
        },
      ],
    },
    {
      name: "Event Details",
      id: "event-details",
      subOptions: [
        {
          name: "How to Reach",
          path: "/user/general-info/event-details/how-to-reach",
        },
        { name: "Marathon Hub", path: "/user/general-info/event-details/hub" },
        {
          name: "Bib Collection and Timing",
          path: "/user/general-info/event-details/bib",
        },
      ],
    },
    {
      name: "Get Involved",
      id: "get-involved",
      subOptions: [
        {
          name: "Partners & Sponsorship",
          path: "/user/general-info/get-involved/partners-sponsorship",
        },
      ],
    },
    {
      name: "Media & Updates",
      id: "media-updates",
      subOptions: [
        { name: "Gallery", path: "/user/general-info/media/gallery" },
      ],
    },
  ];

  return (
    <nav
      ref={navRef}
      className="bg-gradient-to-r from-gray-800 to-gray-600 h-20 fixed w-full top-0 z-50 shadow-lg text-white"
    >
      <div className="container mx-auto h-full flex justify-between items-center md:px-4 px-0">
        {/* Left: Logo */}
        <Link
          to="/user/dashboard"
          className="flex items-center"
          onClick={resetAll}
        >
          <img
            src={eventLogo}
            alt="Event Logo"
            className="md:h-16 md:w-24 h-12 w-18 object-cover object-center"
          />
        </Link>

        {/* Center: Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/user/dashboard"
            className="hover:text-yellow-300 font-medium"
            onClick={resetDropdowns}
          >
            Home
          </Link>

          {/* Events Dropdown */}
          <div className="relative">
            <button
              className={`flex items-center space-x-1 font-medium focus:outline-none ${
                activeDropdown === "events"
                  ? "text-yellow-300"
                  : "hover:text-yellow-300"
              }`}
              onClick={() => toggleDropdown("events")}
            >
              <span>Events</span>
              <FaChevronDown
                className={
                  activeDropdown === "events" ? "text-yellow-300" : "text-white"
                }
              />
            </button>
            {activeDropdown === "events" && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                {eventTypes.map((event) => (
                  <Link
                    key={event.name}
                    to={event.path}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                    onClick={resetDropdowns}
                  >
                    {event.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Registration Dropdown */}
          <div className="relative">
            <button
              className={`flex items-center space-x-1 font-medium focus:outline-none ${
                activeDropdown === "registration"
                  ? "text-yellow-300"
                  : "hover:text-yellow-300"
              }`}
              onClick={() => toggleDropdown("registration")}
            >
              <span>Registration</span>
              <FaChevronDown
                className={
                  activeDropdown === "registration"
                    ? "text-yellow-300"
                    : "text-white"
                }
              />
            </button>
            {activeDropdown === "registration" && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-xl z-10">
                {registrationOptions.map((option) => (
                  <Link
                    key={option.name}
                    to={option.path}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                    onClick={resetDropdowns}
                  >
                    {option.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* General Info with Submenus */}
          <div className="relative">
            <button
              className={`flex items-center space-x-1 font-medium focus:outline-none ${
                activeDropdown === "generalInfo"
                  ? "text-yellow-300"
                  : "hover:text-yellow-300"
              }`}
              onClick={() => toggleDropdown("generalInfo")}
            >
              <span>General Info</span>
              <FaChevronDown
                className={
                  activeDropdown === "generalInfo"
                    ? "text-yellow-300"
                    : "text-white"
                }
              />
            </button>
            {activeDropdown === "generalInfo" && (
              <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-xl z-10">
                {generalInfoOptions.map((option) => (
                  <div key={option.name} className="relative">
                    <div
                      className="flex justify-between items-center px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
                      onClick={(e) => toggleSubmenu(option.id, e)}
                    >
                      <span>{option.name}</span>
                      {option.subOptions && (
                        <FaChevronRight className="text-gray-500" />
                      )}
                    </div>
                    {activeSubmenu === option.id && option.subOptions && (
                      <div className="absolute left-full top-0 w-64 bg-white rounded-md shadow-xl z-20">
                        {option.subOptions.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                            onClick={resetDropdowns}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/user/faqs"
            className="hover:text-yellow-300 font-medium"
            onClick={resetDropdowns}
          >
            FAQs
          </Link>
          <Link
            to="/user/results"
            className="hover:text-yellow-300 font-medium"
            onClick={resetDropdowns}
          >
            Results
          </Link>
          <Link
            to="/user/contact-us"
            className="hover:text-yellow-300 font-medium"
            onClick={resetDropdowns}
          >
            Contact Us
          </Link>
        </div>

        {/* Right Side: Profile for Desktop, Hamburger for Mobile */}
        <div className="flex items-center space-x-4">
          {/* Profile dropdown - Desktop only */}
          {user.fullname && (
            <div className="relative hidden md:block">
              <button
                className={`flex items-center space-x-1 focus:outline-none ${
                  activeDropdown === "profile"
                    ? "text-yellow-300"
                    : "hover:text-yellow-300"
                }`}
                onClick={() => toggleDropdown("profile")}
              >
                <span className="font-medium">{user.fullname}</span>
                <FaChevronDown
                  className={
                    activeDropdown === "profile"
                      ? "text-yellow-300"
                      : "text-white"
                  }
                />
              </button>
              {activeDropdown === "profile" && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                    onClick={resetDropdowns}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hamburger for mobile */}
          <button
            className="md:hidden focus:outline-none z-50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FaTimes size={24} className="text-white" />
            ) : (
              <FaBars size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - Full screen overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-95 z-40 overflow-y-auto pt-20 pb-6 px-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/user/dashboard"
              className="py-3 px-2 text-white text-lg font-medium border-b border-gray-700"
              onClick={resetAll}
            >
              Home
            </Link>

            {/* Events Dropdown - Mobile */}
            <div className="border-b border-gray-700">
              <button
                className="flex justify-between items-center w-full py-3 px-2 text-white text-lg font-medium focus:outline-none"
                onClick={() => toggleMobileDropdown("events")}
              >
                <span>Events</span>
                {mobileDropdown === "events" ? (
                  <FaChevronUp className="text-white" />
                ) : (
                  <FaChevronDown className="text-white" />
                )}
              </button>
              {mobileDropdown === "events" && (
                <div className="pl-4 pb-2">
                  {eventTypes.map((event) => (
                    <Link
                      key={event.name}
                      to={event.path}
                      className="block py-2 text-gray-300 hover:text-yellow-300"
                      onClick={resetAll}
                    >
                      {event.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Registration Dropdown - Mobile */}
            <div className="border-b border-gray-700">
              <button
                className="flex justify-between items-center w-full py-3 px-2 text-white text-lg font-medium focus:outline-none"
                onClick={() => toggleMobileDropdown("registration")}
              >
                <span>Registration</span>
                {mobileDropdown === "registration" ? (
                  <FaChevronUp className="text-white" />
                ) : (
                  <FaChevronDown className="text-white" />
                )}
              </button>
              {mobileDropdown === "registration" && (
                <div className="pl-4 pb-2">
                  {registrationOptions.map((option) => (
                    <Link
                      key={option.name}
                      to={option.path}
                      className="block py-2 text-gray-300 hover:text-yellow-300"
                      onClick={resetAll}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* General Info - Mobile */}
            <div className="border-b border-gray-700">
              <button
                className="flex justify-between items-center w-full py-3 px-2 text-white text-lg font-medium focus:outline-none"
                onClick={() => toggleMobileDropdown("generalInfo")}
              >
                <span>General Info</span>
                {mobileDropdown === "generalInfo" ? (
                  <FaChevronUp className="text-white" />
                ) : (
                  <FaChevronDown className="text-white" />
                )}
              </button>
              {mobileDropdown === "generalInfo" && (
                <div className="pl-4 pb-2">
                  {generalInfoOptions.map((option) => (
                    <div key={option.id} className="py-1">
                      <button
                        className="flex justify-between items-center w-full py-2 text-gray-300 hover:text-yellow-300 focus:outline-none"
                        onClick={() => toggleMobileSubmenu(option.id)}
                      >
                        <span>{option.name}</span>
                        {mobileSubmenu === option.id ? (
                          <FaChevronUp className="text-gray-300" />
                        ) : (
                          <FaChevronDown className="text-gray-300" />
                        )}
                      </button>
                      {mobileSubmenu === option.id && (
                        <div className="pl-4 py-1">
                          {option.subOptions.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block py-2 text-gray-400 hover:text-yellow-300"
                              onClick={resetAll}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/user/faqs"
              className="py-3 px-2 text-white text-lg font-medium border-b border-gray-700"
              onClick={resetAll}
            >
              FAQs
            </Link>
            <Link
              to="/user/results"
              className="py-3 px-2 text-white text-lg font-medium border-b border-gray-700"
              onClick={resetAll}
            >
              Results
            </Link>
            <Link
              to="/user/contact-us"
              className="py-3 px-2 text-white text-lg font-medium border-b border-gray-700"
              onClick={resetAll}
            >
              Contact Us
            </Link>

            {/* User profile section - Mobile only */}
            {user.fullname && (
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="flex items-center px-2 py-2 text-lg text-gray-300">
                  <span className="font-semibold text-white mr-2">
                    Logged in as:
                  </span>
                  {user.fullname}
                </div>
                <div className="flex flex-col space-y-2 mt-2">
                  <Link
                    to="/user/profile"
                    className="py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-600 text-center"
                    onClick={resetAll}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 text-center"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
