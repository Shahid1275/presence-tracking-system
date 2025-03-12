


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "../utils/fetchData";
import Layout from "../components/Layout";
import Link from "next/link";

interface Province {
  id: number;
  name: string;
}

interface ApiResponse {
  data: Province[];
}

const ProvincesPage = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetchData<ApiResponse>(
          "http://192.168.50.218/laravel-project/attendance-system/public/api/provinces"
        );
        setProvinces(response.data); // Access the `data` property
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-[#1F2937] py-12 px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white mb-10 text-center tracking-tight">
            Provinces
          </h1>

          {loading && <div className="text-center text-gray-300">Loading...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}

          <div className="bg-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-800">
            <ul className="divide-y divide-gray-800">
              {provinces.map((province) => (
                <li key={province.id} className="p-6 text-white hover:bg-gray-800">
                  <Link href={`/provinces/${province.id}`}>
                    <span className="text-xl font-semibold">{province.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/provinces/create">
            <button className="mt-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create New Province
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProvincesPage;