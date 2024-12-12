import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (serverURL: string, token: string): Socket => {
  if (!socket) {
    socket = io(serverURL, {
      transports: ["websocket"],
      query: { token },
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });
  }
  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized. Call `initSocket` first.");
  }
  return socket;
};
