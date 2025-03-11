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
        <h1 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
         Welcome To Home Page
        </h1>

        
        
      </div>
    </Layout>
  );
}