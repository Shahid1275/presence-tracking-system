"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Image for optimized image handling

export default function LoginPage() {
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://192.168.50.218:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_type: loginInput, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const responseData = await response.json();
      const data = responseData.data;
      const token = data.token || data.access_token;
      if (!token) throw new Error("No token received");

      localStorage.setItem("token", token);
      const username = data.user?.name || data.user?.username || loginInput;
      localStorage.setItem("username", username);

      router.push("/home?welcome=true"); // Redirect to home
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-start bg-gray-100 relative">
      {/* Background Image - Full Screen Width */}
      <Image
        src="/Frame2.png" // Path relative to the public directory
        alt="Background Image"
        layout="fill" // Fills the container
        objectFit="cover" // Ensures the image covers the full screen while maintaining aspect ratio
        quality={100} // High quality for clarity
        className="absolute inset-0 z-0"
      />

      {/* Login Form and Additional Text - Positioned on the Left Side */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md ml-10 z-10 relative">
        <h1 className="text-2xl font-bold mb-6 text-center">Login to Our Service</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="loginInput" className="block text-sm font-medium text-gray-700">
              Username / Email
            </label>
            <input
              type="text"
              id="loginInput"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username or email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Log In
          </button>
        </form>

        {/* Additional Text Below the Form */}
        <div className="mt-6 text-center">
          <p className="text-blue-500 text-sm font-medium text-start">Admin?</p>
          <p className="text-gray-700 text-sm mt-1 text-start">If you are not user you are not welcome.</p>
        </div>
      </div>
    </div>
  );
}