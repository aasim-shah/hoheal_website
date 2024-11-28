"use client";

import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { getChatDetails, sendNewMessage } from "@/lib/api/chats";
import { getSocket, initSocket } from "@/utils/socket";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa6";

import { GrAttachment } from "react-icons/gr";

interface User {
  _id: string;
  name: string;
}

interface ChatDetails {
  chat: string;
  chatPartnerName: string;
  chatPartnerRole: string;
  chatPartnerImage: string;
  lastMessage: string;
  messages: Message[];
}

interface Message {
  _id: string;
  chat: string;
  sender: User;
  receiver: User;
  message: string;
  seen: boolean;
  images: string[];
  docs: string[];
}

export default function ChatDetail({
  chatId,
  currentUserId,
  setChatId,
}: {
  chatId: string;
  currentUserId: string;
  setChatId: (id: string) => void;
}) {
  const currentUser = currentUserId;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatDetails, setChatDetails] = useState<ChatDetails>({
    chatPartnerName: "",
    chatPartnerRole: "",
    chatPartnerImage: "",
    lastMessage: "",
    messages: [],
    chat: "",
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const serverURL = "http://192.168.18.121:8000";
    initSocket(serverURL);
  }, []);

  const { data, loading, error, execute } = useApi(getChatDetails);

  useEffect(() => {
    if (chatId && chatId !== "") {
      execute(chatId, 50);
    }
  }, [chatId, execute]);

  useEffect(() => {
    if (data) {
      setMessages(data?.messages || []);
      setChatDetails({
        chatPartnerName: data.chatPartnerName,
        chatPartnerRole: data.chatPartnerRole,
        chatPartnerImage: data.chatPartnerImage,
        lastMessage: data.lastMessage,
        messages: [],
        chat: data.chatId,
      });
    }
  }, [data]);

  useEffect(() => {
    const socket = getSocket();
    socket.on(chatId, (message: Message) => {
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off(chatId);
    };
  }, [chatId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!chatId || (!inputMessage.trim() && selectedImages.length === 0)) {
      console.log("Message or file is required to send a message");
      return;
    }

    const convertToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const imagesBase64 = await Promise.all(
        selectedImages.map((file) => convertToBase64(file))
      );

      const response = await sendNewMessage(inputMessage, chatId, imagesBase64);

      setInputMessage("");
      setSelectedImages([]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className={`md:block ${
        chatId && chatId !== "" ? "block" : "hidden md:hidden"
      } md:col-span-9 col-span-11 w-full  flex flex-col`}
    >
      {!data && error && (
        <div className="w-full h-full flex justify-center items-center">
          Something went wrong
        </div>
      )}

      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Image
            width={100}
            height={1000}
            src={chatDetails?.chatPartnerImage}
            alt="Receiver"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-medium dark:text-white text-gray-900">
              {chatDetails?.chatPartnerName}
            </h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
        <button
          onClick={() => setChatId("")}
          className="flex text-red-400 font-semibold text-xl md:hidden"
        >
          x
        </button>
      </div>

      <div className="flex-1 h-[68vh] overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-start ${
              msg.sender?._id === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender?._id !== currentUser && (
              <Image
                width={40}
                height={40}
                src="/images/user.png"
                alt={msg.sender?.name}
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
            )}
            <div
              className={`${
                msg.sender?._id === currentUser
                  ? "bg-gray-100 dark:bg-gray-700 dark:text-white text-black"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-white text-black"
              } p-3 rounded-lg text-sm max-w-[70%]`}
            >
              <p>{msg.message}</p>
              {msg.images?.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {msg.images?.map((image, index) => (
                    <div className="w-40 h-40" key={index}>
                      <Image
                        width={200}
                        height={200}
                        key={index}
                        src={process.env.NEXT_PUBLIC_BASE_URL + image}
                        alt={`Message image ${index + 1}`}
                        className="w-full h-full rounded-lg mt-1"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {selectedImages.length > 0 && (
        <div className="flex gap-2 mb-2 flex-wrap">
          {selectedImages.map((file, index) => {
            const imageURL = URL.createObjectURL(file);
            return (
              <div key={index} className="relative w-20 h-20">
                <Image
                  src={imageURL}
                  alt={`Preview ${index + 1}`}
                  className="rounded-md object-cover w-full h-full"
                  width={80}
                  height={80}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Input */}
      <div className=" p-2 rounded-md mx-auto w-11/12 dark:bg-gray-800 bg-gray-100 flex items-center">
        <form
          onSubmit={(e) => {
            handleSend(e);
          }}
          className="flex items-center w-full"
        >
          <input
            type="text"
            placeholder="Type a message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 bg-transparent rounded-md px-4 py-4 text-sm focus:outline-none "
          />
          <label htmlFor="files">
            <GrAttachment size={22} />
          </label>
          <input
            type="file"
            id="files"
            accept="image/*"
            className="hidden"
            multiple
            onChange={(e) =>
              setSelectedImages(Array.from(e.target.files || []))
            }
          />

          <button type="submit" className=" mx-4">
            <FaRegPaperPlane
              className="text-black dark:text-white "
              size={25}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
