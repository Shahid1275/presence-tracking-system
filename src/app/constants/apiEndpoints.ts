import { Province } from "../types/province";

export const API_BASE_URL = "http://192.168.50.218/laravel-project/attendance-system/public/api";

export const API_ENDPOINTS = {
  PROVINCES: `${API_BASE_URL}/provinces`,
  PROVINCE_CITIES: (id: number) => `${API_BASE_URL}/province/cities/${id}`,
};
export const getProvince = async (id: number, token: string): Promise<Province> => {
    const response = await fetch(
      `${API_BASE_URL}/provinces/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data.data[0]; // Return the first province object from the array
  };
  