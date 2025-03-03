"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaUsers, FaCalendar, FaCoffee, FaCity, FaGraduationCap,
  FaLaptop, FaFingerprint, FaUmbrellaBeach, FaFileAlt, FaFolder,
  FaCheckCircle, FaClock, FaMapMarkerAlt, FaBusinessTime, FaLock,
  FaProjectDiagram, FaMap, FaUserTag, FaUserGraduate, FaUserCheck,
  FaUser, FaSignOutAlt
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const modules = [
  { name: "Attendences", icon: <FaUsers /> },
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
];

export default function Sidebar() {
  const [activeModule, setActiveModule] = useState("Attendences"); // Removed isOpen state
  const router = useRouter();

  const handleModuleClick = (moduleName: string) => {
    setActiveModule(moduleName);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="bg-[#1F2937] text-white h-screen fixed w-64 shadow-xl z-50"> {/* Fixed width to w-64, removed toggle logic */}
      <div className="p-4 flex flex-col items-center h-full">
        {/* Sidebar Header */}
        <div className="w-full flex items-center justify-between mb-6">
          <span className="text-gray-400 text-xl font-semibold">Virtual University</span>
          <div className="relative w-12 h-12">
            <Image
              src="/VUlogo.png"
              alt="VU Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Dashboard Title */}
        <div className="w-full text-center mb-4">
          <div className="text-sm font-semibold text-gray-400">
            {"Attendance Management"} {/* Removed isOpen condition since sidebar is always open */}
          </div>
          <div className="w-full h-px bg-gray-700 my-2" />
        </div>

        {/* Module List */}
        <nav className="flex-1 w-full overflow-y-auto">
          <ul className="space-y-2">
            {modules.map((module) => (
              <li
                key={module.name}
                onClick={() => handleModuleClick(module.name)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                  ${activeModule === module.name 
                    ? "bg-blue-500 text-white" 
                    : "hover:bg-gray-700"}`}
              >
                <span className="text-xl">
                  {module.icon}
                </span>
                <span className="text-sm">{module.name}</span> {/* Removed isOpen condition since sidebar is always open */}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors mt-4"
        >
          <FaSignOutAlt size={20} />
          <span>Logout</span> {/* Removed isOpen condition since sidebar is always open */}
        </button>
      </div>
    </div>
  );
}