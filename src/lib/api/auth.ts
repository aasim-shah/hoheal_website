import request from "./request";

export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  const response = await request.post("/user/login", { email, password });
<<<<<<< HEAD
  
=======

>>>>>>> e72ae288a02cc5d02773d2a9d51df97d4c220365
  return response.data;
};
