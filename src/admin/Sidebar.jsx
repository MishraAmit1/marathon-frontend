import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsArrowLeftShort,
  BsSearch,
  BsFillMoonFill,
  BsChevronDown,
  BsPersonBadge,
  BsGear,
} from "react-icons/bs";
import { RiDashboardFill, RiGalleryFill, RiMapPinFill } from "react-icons/ri";
import { MdEventAvailable, MdCategory, MdGroup } from "react-icons/md";
import {
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineInfoCircle,
  AiOutlineIdcard,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BiCollection, BiRun } from "react-icons/bi";
import { FaHandshake, FaMapMarkedAlt, FaTrophy } from "react-icons/fa";
import { GiRunningShoe } from "react-icons/gi";
import { ImStatsDots } from "react-icons/im";
import { useDarkMode } from "./components/contexts/DarkModeContext";
import "./css/SideBar.css";

const SideBar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [subOpen, setSubOpen] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { darkMode, toggleDarkMode } = useDarkMode();

  // Check token and redirect if not present
  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setOpen(!mobile); // Open sidebar by default on desktop
    };
    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  // Close sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  // Menu items with appropriate icons
  const Menus = [
    {
      title: "Dashboard",
      icon: <RiDashboardFill className="text-blue-400" />,
      path: "/dashboard",
    },
    {
      title: "User Registration",
      icon: <AiOutlineIdcard className="text-green-400" />,
      path: "/dashboard/displayuser",
    },
    {
      title: "Events Registration",
      icon: <FiUsers className="text-purple-400" />,
      submenu: true,
      submenuItems: [
        {
          title: "Create Registration Event",
          path: "/create-event-registrations",
        },
        {
          title: "View Events Registration",
          path: "/views-event-registrations",
        },
      ],
    },
    {
      title: "Manage Events",
      icon: <MdEventAvailable className="text-yellow-400" />,
      submenu: true,
      submenuItems: [
        { title: "Create Event", path: "/events/create" },
        { title: "View Events", path: "/events" },
      ],
    },
    {
      title: "Manage Category",
      icon: <MdCategory className="text-red-400" />,
      submenu: true,
      submenuItems: [
        { title: "Create Category", path: "/create-category" },
        { title: "View Category", path: "/category-views" },
      ],
    },
    {
      title: "Manage Participation",
      icon: <ImStatsDots className="text-cyan-400" />,
      path: "/view-participatein",
    },
    {
      title: "Manage Sponsors",
      icon: <FaHandshake className="text-amber-400" />,
      submenu: true,
      submenuItems: [
        { title: "Create Sponsor", path: "/sponsors/create" },
        { title: "View Sponsors", path: "/sponsors" },
      ],
    },
    {
      title: "Manage Results",
      icon: <FaTrophy className="text-orange-400" />,
      submenu: true,
      submenuItems: [
        { title: "Create Results", path: "/create-results" },
        { title: "View Results", path: "/view-results" },
      ],
    },
    {
      title: "Manage About Us",
      icon: <AiOutlineInfoCircle className="text-indigo-400" />,
      path: "/manage-about-us",
    },
    {
      title: "Manage About Organiser",
      icon: <MdGroup className="text-pink-400" />,
      path: "/manage-about-organiser",
    },
    {
      title: "Manage How to Reach",
      icon: <FaMapMarkedAlt className="text-emerald-400" />,
      path: "/manage-how-to-reach",
    },
    {
      title: "Manage Marathon Hub",
      icon: <BiRun className="text-violet-400" />,
      path: "/manage-marathon-hub",
    },
    {
      title: "Manage Bib Collection",
      icon: <BiCollection className="text-teal-400" />,
      path: "/manage-bib-collection",
    },
    {
      title: "Manage Partner and Sponsor",
      icon: <BsPersonBadge className="text-fuchsia-400" />,
      path: "/manage-partner-and-sponsor",
    },
    {
      title: "Manage Gallery",
      icon: <RiGalleryFill className="text-lime-400" />,
      path: "/manage-gallery",
    },
    {
      title: "Manage Eligibility Criteria",
      icon: <GiRunningShoe className="text-rose-400" />,
      path: "/manage-eligibility-criteria",
    },
    {
      title: "Contact Submissions",
      icon: <AiOutlineMail className="text-sky-400" />,
      path: "/manage-contact-submissions",
    },
    {
      title: "Edit Contact Info",
      icon: <AiOutlineSetting className="text-amber-500" />,
      path: "/edit-contact-info/",
    },
    {
      title: "Manage FAQs",
      icon: <AiOutlineQuestionCircle className="text-blue-500" />,
      path: "/manage-faqs",
    },
    {
      title: "Settings",
      icon: <BsGear className="text-gray-400" />,
      submenu: true,
      submenuItems: [
        { title: "Invite new Admin", path: "/dashboard/invite-admin" },
        { title: "Change Password", path: "/dashboard/change-password" },
      ],
    },
    {
      title: "Logout",
      icon: <AiOutlineLogout className="text-red-500" />,
      action: handleLogout,
    },
  ];

  return (
    <div className="bg-dark-purple flex h-screen">
      {/* Overlay for mobile */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar - now using opacity and visibility for mobile instead of width */}
      <div
        className={`bg-dark-purple h-full p-5 pt-8 overflow-y-auto sidebar
          ${!isMobile ? (open ? "w-72" : "w-20") : "w-70"} 
          ${isMobile ? "fixed left-0 z-50" : "relative"} 
          ${
            isMobile
              ? open
                ? "opacity-100 visible"
                : "opacity-0 invisible transform -translate-x-full"
              : ""
          }
          transition-all duration-300 shadow-lg`}
      >
        {/* Desktop toggle button */}
        {!isMobile && (
          <BsArrowLeftShort
            aria-label="Toggle Sidebar"
            className={`fixed top-9 
              ${open ? "left-[270px]" : "left-14"}
              z-50 bg-white w-8 h-8 rounded-full cursor-pointer 
              border-2 border-dark-purple text-dark-purple text-3xl
              hover:bg-gray-200 transition-all duration-300 
              ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        )}

        {/* Mobile toggle button - Added inside the sidebar when opened */}
        {isMobile && open && (
          <BsArrowLeftShort
            aria-label="Toggle Sidebar"
            className={`absolute top-9 right-5
              z-50 bg-white w-8 h-8 rounded-full cursor-pointer 
              border-2 border-dark-purple text-dark-purple text-3xl
              hover:bg-gray-200 transition-all duration-300 rotate-180`}
            onClick={() => setOpen(!open)}
          />
        )}

        <div className="inline-flex items-center">
          <RiMapPinFill
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-4 p-1
            ${open && "rotate-[360deg] transition-all duration-500"}`}
          />
          <h1
            className={`text-white origin-left text-2xl font-medium ${
              !open && !isMobile && "scale-0"
            } duration-300`}
          >
            <span className="tracking-wide">EMS</span>
          </h1>
        </div>
        <div
          className={`flex items-center bg-light-white rounded-md mt-6 ${
            !open && !isMobile ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={`text-white block float-left cursor-pointer ${
              open || isMobile ? "text-lg mr-2" : "text-2xl"
            }`}
          />
          <input
            type="search"
            placeholder="Search"
            className={`text-base bg-transparent w-full focus:outline-none text-white ${
              !open && !isMobile && "hidden"
            }`}
          />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <React.Fragment key={index}>
              <li
                className={`text-gray-300 flex items-center gap-x-4 p-3 text-sm hover:bg-light-white rounded-md 
                  ${
                    menu.spacing ? "mt-9" : "mt-1"
                  } transition-all duration-200 hover:text-white`}
              >
                <span className="text-2xl block float-left">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 whitespace-nowrap ${
                    !open && !isMobile && "hidden"
                  } duration-500`}
                >
                  {menu.action ? (
                    <button
                      onClick={menu.action}
                      className="w-full text-left hover:text-white transition-colors"
                    >
                      {menu.title}
                    </button>
                  ) : (
                    <Link
                      to={menu.path}
                      onClick={handleLinkClick}
                      className="block hover:text-white transition-colors"
                    >
                      {menu.title}
                    </Link>
                  )}
                </span>
                {menu.submenu && (open || isMobile) && (
                  <BsChevronDown
                    className={`cursor-pointer transition-transform duration-300 ${
                      subOpen[index] && "rotate-180"
                    }`}
                    onClick={() =>
                      setSubOpen((prevState) => ({
                        ...prevState,
                        [index]: !prevState[index],
                      }))
                    }
                  />
                )}
              </li>
              {menu.submenu && subOpen[index] && (open || isMobile) && (
                <ul
                  className={`ml-6 border-l-2 border-gray-700 pl-2 transition-all duration-300 overflow-hidden
                    ${
                      subOpen[index]
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                >
                  {menu.submenuItems.map((submenuItem, idx) => (
                    <li
                      key={submenuItem.title + idx}
                      className="text-gray-400 py-2 px-2 text-sm rounded-md hover:bg-light-white hover:text-white transition-colors duration-200"
                    >
                      <Link
                        to={submenuItem.path}
                        onClick={handleLinkClick}
                        className="block w-full"
                      >
                        {submenuItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>

      {/* Main Section */}
      <div
        className={`flex-1 flex flex-col overflow-y-auto 
          ${
            darkMode
              ? "bg-custom-dark-purple text-white"
              : "bg-gray-100 text-black"
          }
          transition-colors duration-300`}
      >
        <div
          className={`${
            darkMode
              ? "bg-custom-dark-purple text-white"
              : "bg-white text-black"
          } flex items-center shadow-md px-5 py-3`}
        >
          {/* Mobile toggle button - Only visible when sidebar is closed */}
          {isMobile && !open && (
            <BsArrowLeftShort
              aria-label="Toggle Sidebar"
              className="mr-auto text-3xl bg-white w-8 h-8 rounded-full cursor-pointer 
                border-2 border-dark-purple text-dark-purple
                hover:bg-gray-200 transition-all duration-300 z-50"
              onClick={() => setOpen(!open)}
            />
          )}

          <div className="ml-auto flex items-center space-x-4">
            <BsFillMoonFill
              className={`text-2xl cursor-pointer ${
                darkMode ? "text-yellow-400" : "text-gray-700"
              } hover:opacity-80 transition-opacity`}
              onClick={toggleDarkMode}
            />
            <div className="relative">
              {/* Profile Dropdown */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full cursor-pointer overflow-hidden transition-colors duration-200 flex items-center justify-center text-white font-bold"
                aria-label="Profile Dropdown"
              >
                A
              </button>
              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 ${
                    darkMode
                      ? "bg-custom-dark-purple text-white"
                      : "bg-white text-black"
                  } shadow-lg rounded-md z-50 transition-all duration-200 border ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <ul className="py-1">
                    <li
                      className={`hover:${
                        darkMode ? "bg-custom-dark-purple-hover" : "bg-gray-100"
                      } transition-colors`}
                    >
                      <Link
                        to="/admin/profile"
                        onClick={handleLinkClick}
                        className="block px-4 py-2"
                      >
                        Profile
                      </Link>
                    </li>
                    <li
                      onClick={handleLogout}
                      className={`hover:${
                        darkMode ? "bg-custom-dark-purple-hover" : "bg-gray-100"
                      } cursor-pointer transition-colors`}
                    >
                      <span className="block px-4 py-2">Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-7">{children}</div>
      </div>
    </div>
  );
};

export default SideBar;
