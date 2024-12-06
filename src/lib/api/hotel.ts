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

export const getCustomers = async (status: string, hotelId: string) => {
  try {
    const query = new URLSearchParams({
      ...(status && { status }),
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
