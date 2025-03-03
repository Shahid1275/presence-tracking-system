"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Layout from "../components/Layout";

export default function HomePage() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Redirect to login if not authenticated
    } else if (searchParams.get("welcome") === "true") {
      const username = localStorage.getItem("username") || "User";
      setWelcomeMessage(`Welcome to Home Page, ${username}!`);
      window.history.replaceState({}, document.title, "/home");
    }
  }, [searchParams, router]);

  return (
    <Layout>
      <div className="container mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">Home Page</h1>
        {welcomeMessage && (
          <p className="mt-4 text-green-600 text-lg md:text-xl lg:text-2xl">{welcomeMessage}</p>
        )}
      </div>
    </Layout>
  );
}