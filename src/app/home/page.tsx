"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Layout from "../components/Layout";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Redirect to login if not authenticated
    } else if (searchParams.get("welcome") === "true") {
      const username = localStorage.getItem("username") || "User";
      window.history.replaceState({}, document.title, "/home");
    }
  }, [searchParams, router]);

  return (
    <Layout>
      <div className="container mx-auto p-4 h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Responsive Heading */}
        <h2 className="text-3xl font-bold mb-4">
         Welcome To Home Page
        </h2>

        
        
      </div>
    </Layout>
  );
}