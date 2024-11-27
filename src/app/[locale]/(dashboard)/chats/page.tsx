"use client";
import { useState } from "react";
import ChatDetails from "./chatDetails";
import ChatsList from "./chatsList";

export default function ChatsPage() {
  const [chatId, setChatId] = useState<string>("");

  return (
    <div className="grid  grid-cols-12">
      <ChatsList chatId={chatId} setChatId={setChatId} />
      <ChatDetails
        chatId={chatId}
        setChatId={setChatId}
        currentUserId="673749b7ef7a00e0b0dd86f1"
      />
    </div>
  );
}
