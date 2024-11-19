import request from "./request";

export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  const response = await request.post("/user/login", { email, password });
  return response.data;
};
