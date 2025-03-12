"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";

const CreateProvincePage = () => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://192.168.50.218/laravel-project/attendance-system/public/api/provinces/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create province");
      }

      router.push("/provinces");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#1F2937] py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-10 text-center tracking-tight">
            Create Province
          </h1>

          {error && <div className="text-center text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Province Name"
              className="w-full p-2 mb-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProvincePage;