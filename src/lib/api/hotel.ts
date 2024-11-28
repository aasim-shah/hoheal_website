import request from "./request";

export const getAllHotels = async () => {
  try {
    const response = await request.get(`/admin/hotel`, {
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
