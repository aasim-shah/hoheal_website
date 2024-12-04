import { requestDataLimit } from "@/constants";
import request from "./request";

export const getAllHotels = async (params: {
  page?: number;
  status?: string;
}) => {
  try {
    const { page = 1, status = "" } = params || {};
    const limit = requestDataLimit;

    const response = await request.get(
      `/admin/hotel?page=${page}&pageSize=${limit}&status=${status}`,
      {
        headers: { requiresAuth: true },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHotelById = async (id: string) => {
  try {
    if (!id) {
      throw new Error("Invalid hotel id");
    }

    const response = await request.get(`/admin/hotel/details/${id}`, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addHotel = async (hotelData: any): Promise<any> => {
  try {
    const response = await request.post("/admin/hotel/new", hotelData, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateHotel = async (hotelData: any, id: string): Promise<any> => {
  try {
    const response = await request.post(
      `/admin/hotel/update/${id}`,
      hotelData,
      {
        headers: { requiresAuth: true },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
