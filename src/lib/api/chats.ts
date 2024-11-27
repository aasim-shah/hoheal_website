import request from "./request";

export const getChatsList = async (): Promise<any> => {
  const response = await request.get("/user/chats");
  return response.data;
};

export const getChatDetails = async (
  chatId: string,
  limit: number = 30
): Promise<any> => {
  const response = await request.get(
    `/user/chats/details/${chatId}?limit=${limit}`
  );
  return response.data.body;
};

export const sendNewMessage = async (
  message: string,
  chatId: string,
  files: any
): Promise<any> => {
  const response = await request.post("/chat/sendMessage", {
    message,
    chatId,
    files,
  });
  return response.data;
};
