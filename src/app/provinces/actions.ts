// // app/province/actions.ts
// import { serverApiFetch } from "../utils/fetchData";
// import { cookies } from "next/headers";

// export async function getProvinces() {
//   const cookieStore = cookies();
//   const cookieToken = (await cookieStore).get("token")?.value;
//   const localStorageToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const token = cookieToken || localStorageToken; // Fallback to localStorage if cookie is unavailable
//   console.log("Token used in getProvinces:", token); // Debug

//   try {
//     if (!token) {
//       console.warn("No token found, returning empty provinces list");
//       return [];
//     }
//     const data = await serverApiFetch("http://192.168.50.218/laravel-project/attendance-system/public/api/provinces", {}, token);
//     return data;
//   } catch (err) {
//     console.error("API fetch error:", err);
//     return [];
//   }
// }