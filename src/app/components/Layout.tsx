"use client";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#1F2937] overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />
      {/* Main Content Area */}
      <main
        className="flex-1 p-6 bg-[#1F2937] text-white transition-margin duration-300 ease-in-out overflow-y-auto ml-64" // Adjust ml based on sidebar width (64px when open)
      >
        {children}
      </main>
    </div>
  );
}