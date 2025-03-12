"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { name: "Attendances", icon: <FaUsers />, path: "/attendances" },
  { name: "Batch", icon: <FaCalendar />, path: "/batch" },
  { name: "BreakType", icon: <FaCoffee />, path: "/breaktype" },
  { name: "City", icon: <FaCity />, path: "/city" },
  { name: "DegreeProgram", icon: <FaGraduationCap />, path: "/degreeprogram" },
  { name: "Device", icon: <FaLaptop />, path: "/device" },
  { name: "FingerPrint", icon: <FaFingerprint />, path: "/fingerprint" },
  { name: "Holiday", icon: <FaUmbrellaBeach />, path: "/holiday" },
  { name: "Leave", icon: <FaFileAlt />, path: "/leave" },
  { name: "LeaveCategory", icon: <FaFolder />, path: "/leavecategory" },
  { name: "LeaveStatus", icon: <FaCheckCircle />, path: "/leavestatus" },
  { name: "LeaveType", icon: <FaClock />, path: "/leavetype" },
  { name: "Location", icon: <FaMapMarkerAlt />, path: "/location" },
  { name: "OfficeTime", icon: <FaBusinessTime />, path: "/officetime" },
  { name: "Permissions", icon: <FaLock />, path: "/permissions" },
  { name: "Project", icon: <FaProjectDiagram />, path: "/project" },
  { name: "Province", icon: <FaMap />, path: "/provinces" },
  { name: "Roles", icon: <FaUserTag />, path: "/roles" },
  { name: "Student", icon: <FaUserGraduate />, path: "/student" },
  { name: "StudentStatus", icon: <FaUserCheck />, path: "/studentstatus" },
  { name: "User", icon: <FaUser />, path: "/user" },
  { name: "Logout", icon: <FaSignOutAlt />, isLogout: true },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      <div className="fixed h-screen z-40">
        <div
          className={`bg-gray-800 text-white h-screen shadow-xl transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-64" : "w-16"
          }`}
        >
          <div className="p-4 flex flex-col items-center h-full">
            {/* Sidebar Header with Centered Logo and Text */}
            <div className="w-full flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 mx-auto">
                <div
                  className={`relative w-8 h-8 transition-all duration-300 ${
                    isSidebarOpen ? "scale-100" : "scale-90"
                  }`}
                >
                  <Image
                    src="/VUlogo.png" // Replace with your logo path
                    alt="VU Logo"
                    fill
                    className="object-contain transition-all duration-300 hover:scale-90"
                  />
                </div>
                {isSidebarOpen && (
                  <span className="text-gray-200 text-md font-semibold transition-all duration-300">
                    Virtual University
                  </span>
                )}
              </div>

              {/* Toggle Button Inside Sidebar */}
              <button
                onClick={toggleSidebar}
                className={`p-2 text-white transition-all duration-300 ${
                  isSidebarOpen ? "ml-2" : "mx-auto"
                }`}
              >
                {isSidebarOpen ? (
                  <FaChevronLeft size={16} />
                ) : (
                  <FaChevronRight size={16} />
                )}
              </button>
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
              <form onSubmit={handleSearch} className="w-full mb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 pl-10 text-sm rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </form>
            )}

            {/* Module List */}
            <nav
              className={`flex-1 w-full overflow-y-auto ${
                !isSidebarOpen ? "scrollbar-hidden" : ""
              }`}
            >
              <ul className="space-y-2">
                {filteredModules.map((module) => (
                  <li
                    key={module.name}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-300 ${
                      module.isLogout ? "mt-auto" : ""
                    }`}
                    onClick={module.isLogout ? handleLogout : undefined}
                  >
                    <Link
                      href={module.path || "#"}
                      className={`flex items-center gap-3 w-full ${
                        pathname === module.path
                          ? "bg-gray-700 text-white"
                          : "text-gray-300"
                      }`}
                    >
                      <span
                        className={`hover:opacity-90 transition-all duration-300 ${
                          !isSidebarOpen ? "mx-auto" : ""
                        }`}
                      >
                        {module.icon}
                      </span>
                      {isSidebarOpen && (
                        <span className="text-sm hover:opacity-90 transition-opacity duration-300">
                          {module.name}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* CSS to hide scrollbars only when sidebar is closed */}
      <style jsx>{`
        .scrollbar-hidden {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          overflow-y: auto; /* Hide vertical scrollbar */
          overflow-x: hidden; /* Hide horizontal scrollbar */
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </>
  );
}