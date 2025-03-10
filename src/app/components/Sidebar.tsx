"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaUsers,
  FaCalendar,
  FaCoffee,
  FaCity,
  FaGraduationCap,
  FaLaptop,
  FaFingerprint,
  FaUmbrellaBeach,
  FaFileAlt,
  FaFolder,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaBusinessTime,
  FaLock,
  FaProjectDiagram,
  FaMap,
  FaUserTag,
  FaUserGraduate,
  FaUserCheck,
  FaUser,
  FaSignOutAlt,
  FaChevronRight,
  FaChevronLeft,
  FaSearch,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const modules = [
  { name: "Attendances", icon: <FaUsers /> },
  { name: "Batch", icon: <FaCalendar /> },
  { name: "BreakType", icon: <FaCoffee /> },
  { name: "City", icon: <FaCity /> },
  { name: "DegreeProgram", icon: <FaGraduationCap /> },
  { name: "Device", icon: <FaLaptop /> },
  { name: "FingerPrint", icon: <FaFingerprint /> },
  { name: "Holiday", icon: <FaUmbrellaBeach /> },
  { name: "Leave", icon: <FaFileAlt /> },
  { name: "LeaveCategory", icon: <FaFolder /> },
  { name: "LeaveStatus", icon: <FaCheckCircle /> },
  { name: "LeaveType", icon: <FaClock /> },
  { name: "Location", icon: <FaMapMarkerAlt /> },
  { name: "OfficeTime", icon: <FaBusinessTime /> },
  { name: "Permissions", icon: <FaLock /> },
  { name: "Project", icon: <FaProjectDiagram /> },
  { name: "Province", icon: <FaMap /> },
  { name: "Roles", icon: <FaUserTag /> },
  { name: "Student", icon: <FaUserGraduate /> },
  { name: "StudentStatus", icon: <FaUserCheck /> },
  { name: "User", icon: <FaUser /> },
  { name: "Logout", icon: <FaSignOutAlt />, isLogout: true },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("Sidebar toggled:", isSidebarOpen ? "closing" : "opening");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      {/* Sidebar */}
      <div className="relative h-screen">
        <div
          className={`bg-gray-800 text-white h-screen fixed shadow-xl z-40 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-64" : "w-16"
          }`}
        >
          <div className="p-4 flex flex-col items-center h-full">
            {/* Sidebar Header with Centered Logo and Text */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 mx-auto">
                <div className="relative w-8 h-8">
                  <Image
                    src="/VUlogo.png" // Replace with your logo path
                    alt="VU Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                {isSidebarOpen && (
                  <span className="text-gray-200 text-xl font-semibold">
                    Virtual University
                  </span>
                )}
              </div>
            </div>

            {/* Dashboard Title */}
            {isSidebarOpen && (
              <div className="w-full text-center mb-4">
                <div className="text-sm font-semibold text-gray-200">
                  Attendance Management
                </div>
                <div className="w-full h-px bg-gray-600 my-2" />
              </div>
            )}

            {/* Search Functionality */}
            {isSidebarOpen && (
              <form onSubmit={handleSearch} className="w-full mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 pl-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </form>
            )}

            {/* Module List */}
            <nav
              className={`flex-1 w-full overflow-y-auto ${
                !isSidebarOpen ? "no-scrollbar" : ""
              }`}
            >
              <ul className="space-y-2">
                {filteredModules.map((module) => (
                  <li
                    key={module.name}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
                      module.isLogout ? "mt-auto" : ""
                    }`}
                    onClick={module.isLogout ? handleLogout : undefined}
                  >
                    <span
                      className={`text-xl ${
                        !isSidebarOpen ? "mx-auto" : ""
                      }`}
                    >
                      {module.icon}
                    </span>
                    {isSidebarOpen && (
                      <span className="text-sm">{module.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Toggle Buttons Outside Sidebar at Top Corners */}
        {!isSidebarOpen && (
          <button
            onClick={() => {
              toggleSidebar();
              console.log("Left toggle button clicked (open sidebar)");
            }}
            className="absolute left-16 top-4 p-2 bg-gray-800 text-white transition-colors duration-300"
            style={{ left: "4rem" }} // Match the width of the collapsed sidebar (w-16)
          >
            <FaChevronLeft size={16} />
          </button>
        )}
        {isSidebarOpen && (
          <button
            onClick={() => {
              toggleSidebar();
              console.log("Right toggle button clicked (close sidebar)");
            }}
            className="absolute right-0 top-4 p-2 bg-gray-800 text-white transition-colors duration-300"
            style={{ left: "16rem" }} // Match the width of the expanded sidebar (w-64)
          >
            <FaChevronRight size={16} />
          </button>
        )}
      </div>

      {/* Add CSS to hide horizontal scrollbar when sidebar is closed */}
      <style jsx>{`
        .no-scrollbar {
          overflow-x: hidden;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}