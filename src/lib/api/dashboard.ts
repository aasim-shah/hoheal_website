import request from "./request";

export const getDashboardStats = async (
  period: "month" | "year",
  hotelId?: string
) => {
  try {
    let endpoint = `/admin/dashboard/stats?period=${period}`;
    if (hotelId) endpoint += `&hotel=${hotelId}`;
    const response = await request.get(endpoint, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
// `/admin/hotel?page=${page}&pageSize=${limit}&status=${status}`,
export const getDashboardHotels = async (period: "month" | "year") => {
  try {
    let endpoint = `/admin/hotel?period=${period}`;

    const response = await request.get(endpoint, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRevenueChartData = async (
  period: "month" | "year",
  hotelId?: string
) => {
  try {
    let endpoint = `/admin/charts/earnings?period=${period}`;
    if (hotelId) endpoint += `&hotel=${hotelId}`;
    const response = await request.get(endpoint, {
      headers: { requiresAuth: true },
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};

export const getServicesChartData = async (
  period: "month" | "year",
  hotelId?: string
) => {
  try {
    let endpoint = `/admin/charts/services?period=${period}`;
    if (hotelId) endpoint += `&hotel=${hotelId}`;
    const response = await request.get(endpoint, {
      headers: { requiresAuth: true },
    });
    return response.data.body;
  } catch (error) {
    throw error;
  }
};
