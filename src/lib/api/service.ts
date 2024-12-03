import request from "./request";

export const getAllServices = async (params: {
  page?: number;
  limit?: number;
  hotel?: string;
  category?: string;
  subCategory?: string;
}) => {
  try {
    const { page = 1, limit = 20, hotel, category, subCategory } = params || {};
    let endpoint = `/admin/service/list?page=${page}&pageSize=${limit}`;
    if (hotel) endpoint += `&hotel=${hotel}`;
    if (category) endpoint += `&category=${category}`;
    if (subCategory) endpoint += `&subCategory=${subCategory}`;

    const response = await request.get(endpoint, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addService = async (serviceData: any): Promise<any> => {
  try {
    const response = await request.post("/hotel/service/new", serviceData, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addRoomService = async (serviceData: any): Promise<any> => {
  try {
    const response = await request.post(
      "/hotel/service/roomService/new",
      serviceData,
      {
        headers: { requiresAuth: true },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
