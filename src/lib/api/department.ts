import request from "./request";

export const getStaffList = async (departmentId: string): Promise<any> => {
  const response = await request.get(`/hotel/department/${departmentId}`);
  return response.data.body;
};
export const getReservationRequests = async (status: string): Promise<any> => {
  const response = await request.get(
    `/department/reservations/list${
      status && status !== "" ? `?status=${status}` : ""
    }`
  );
  return response.data.body;
};
