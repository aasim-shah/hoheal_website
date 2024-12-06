import request from "./request";

export const getCategories = async (hotel?: string) => {
  let endpoint = `/admin/categoriesList`;
  if (hotel) endpoint += `?hotel=${hotel}`;
  try {
    const response = await request.get(endpoint, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/// testing
export const getFeatures = async (page: number) => {
  try {
    const response = await request.get(`/admin/features`, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getChecklist = async () => {
  try {
    const response = await request.get("/admin/checklist", {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRoomTypes = async (hotelId?: string) => {
  try {
    const response = await request.get(
      `/hotel/accommodation/types/${hotelId}`,
      {
        headers: { requiresAuth: true },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
