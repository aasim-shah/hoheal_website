"use client";

import useApi from "@/hooks/useApi";
import { getChatsList } from "@/lib/api/chats";
import Image from "next/image";
import { useEffect, useState } from "react";

import { format, formatDistanceToNow } from "date-fns";
interface ChatsListProps {
  setChatId: (id: string) => void;
  chatId: string;
}

interface ChatList {
  chatId: "";
  chatPartnerName: "";
  chatPartnerRole: "";
  chatPartnerImage: "";
  lastMessage: "";
  lastMessageTime: "";
}

export default function ChatsList({ setChatId, chatId }: ChatsListProps) {
  const [chats, setChats] = useState<ChatList[]>([]);

  const { data, loading, error, execute } = useApi(getChatsList);

  useEffect(() => {
    execute();
  }, []);

  useEffect(() => {
    if (data) {
      console.log({ data });
      setChats(data.body.chats);
    }
  }, [data]);

  return (
    <div
      className={`col-span-11 md:col-span-3  shadow-sm border-2 dark:border-gray-800 border-gray-100 rounded-lg p-4 ${
        chatId === "" || chatId === null ? "block md:block" : "hidden md:block"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold  flex items-center gap-2">
          Messages{" "}
          <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
            12
          </span>
        </h2>
        <button className="w-8 h-8  rounded-full flex items-center justify-center text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v14.5m7.25-7.25H4.75"
            />
          </svg>
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full  border dark:border-gray-800 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
      </div>

      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => setChatId(chat.chatId)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
              chatId === chat.chatId
                ? "bg-gray-100 dark:bg-gray-800"
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
          >
            {chat.chatPartnerImage && (
              <Image
                width={40}
                height={40}
                src={chat.chatPartnerImage}
                alt={chat.chatPartnerImage}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="text-sm font-medium ">{chat.chatPartnerName}</h3>
              <p className="text-xs text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>
            <span className="text-xs mt-5 text-gray-400">
              {formatDistanceToNow(new Date(chat.lastMessageTime), {
                addSuffix: true,
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
