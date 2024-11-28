import request from "./request";

export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  const response = await request.post("/user/login", { email, password });
  return response.data;
};

export const getUserData = async () => {
  try {
    const response = await request.get(`/user/details`, {
      headers: { requiresAuth: true },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};