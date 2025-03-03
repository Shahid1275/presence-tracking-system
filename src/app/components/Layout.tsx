// Layout.tsx
"use client";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#1F2937]">
      <Sidebar />
      <main className="flex-1 p-6 bg-[#1F2937] text-white">
        {children}
      </main>
    </div>
  );
}