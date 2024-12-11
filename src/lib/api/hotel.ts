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

export const getCustomers = async (status: string, hotelId: string) => {
  try {
    const query = new URLSearchParams({
      ...(status && status !== "All" && { status }),
      ...(hotelId && { hotel: hotelId }),
    }).toString();

    const response = await request.get(`/hotel/customers?${query}`, {
      headers: { requiresAuth: true },
    });
    return response.data.body;
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
export const checkIn = async (data: any): Promise<any> => {
  try {
    const response = await request.post("/reception/checkin", data, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPrecheckinData = async (data: any): Promise<any> => {
  try {
    const response = await request.get("/reception/precheckin/" + data, {
      headers: { requiresAuth: true },
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};

export const checkOut = async (data: {
  email: string;
  idCardNumber: string;
}): Promise<any> => {
  try {
    const response = await request.post("/reception/checkout", data, {
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
