import request from "./request";

export interface StaffData {
  name: string;
  email: string;
  employeeId: string;
  address: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  profilePicture?: File | null;
  department: string;
}

export const getStaffList = async (
  department: string,
  hotel: string
): Promise<any> => {
  let query = "";

  if (hotel) {
    query += `?hotel=${hotel}`;
  }

  if (department) {
    query += query ? `&department=${department}` : `?department=${department}`;
  }

  console.log({ query });

  const response = await request.get(`/admin/employees${query}`);
  return response.data.body;
};

export const getReservationRequests = async (status: string): Promise<any> => {
  const response = await request.get(
    `/department/reservations/list${
      status && status !== "All" ? `?status=${status}` : ""
    }`
  );
  return response.data.body;
};

export const getReviews = async (status: string): Promise<any> => {
  const response = await request.get(
    `/admin/service/reviews${
      status && status !== "All" ? `?status=${status}` : ""
    }`
  );
  return response.data.body;
};

export const markAsAcceptedReject = async (
  status: string,
  id: string
): Promise<any> => {
  try {
    const response = await request.get(
      `/department/reservations/update/${status}/${id}`
    );
    return response.data.body;
  } catch (error) {
    console.error("Error in acceptOrReject:", error);
    throw error;
  }
};

export const addStaff = async (data: StaffData): Promise<any> => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key === "profilePicture" && data.profilePicture) {
      formData.append("image", data.profilePicture);
    } else {
      formData.append(key, data[key as keyof StaffData] as string);
    }
  });

  try {
    const response = await request.post(
      "/hotel/department/user/new",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          requiresAuth: true,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error adding staff:", error.response?.data || error.message);
    throw error;
  }
};
