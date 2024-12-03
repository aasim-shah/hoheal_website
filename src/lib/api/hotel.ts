import request from "./request";

export const getAllHotels = async (params: {
  page?: number;
  limit?: number;
  status?: string;
}) => {
  try {
    // Destructure parameters and set defaults at the bottom
    const { page = 1, limit = 20, status = "" } = params || {};

    const response = await request.get(
      `/admin/hotel?page=${page}&pageSize=${limit}&status=${status}`,
      {
        headers: { requiresAuth: true },
      }
    );
    return response.data; // Ensure the structure of this is as expected.
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
