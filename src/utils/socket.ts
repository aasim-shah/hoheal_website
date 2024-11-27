import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (serverURL: string): Socket => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Mzc0OWI3ZWY3YTAwZTBiMGRkODZmMSIsInJvbGUiOiJzZXJ2aWNlTWFuYWdlciIsImlhdCI6MTczMjU5OTM3OSwiZXhwIjoxNzM1MTA0OTc5fQ.SK4Uxddgkd4s3Z-J7tOXgtdTGmNlZTFnK7D77i04bJw";
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
