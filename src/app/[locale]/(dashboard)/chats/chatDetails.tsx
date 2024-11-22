"use client";

import Image from "next/image";
import { useState } from "react";

export default function ChatDetails() {
  const currentUser = "6478a56b3f1c4e3c8a567890"; // Replace with the current user's ID
  const messages = [
    {
      _id: "1",
      sender: "6478a56b3f1c4e3c8a567890",
      receiver: "6478a56b3f1c4e3c8a567891",
      chat: "12345",
      message: "Hello, how are you?",
      images: [],
      docs: [],
      seen: true,
      createdAt: "2024-11-20T14:30:00Z",
    },
    {
      _id: "2",
      sender: "6478a56b3f1c4e3c8a567891",
      receiver: "6478a56b3f1c4e3c8a567890",
      chat: "12345",
      message: "I'm good! How about you?",
      images: [],
      docs: [],
      seen: false,
      createdAt: "2024-11-20T14:31:00Z",
    },
    {
      _id: "3",
      sender: "6478a56b3f1c4e3c8a567890",
      receiver: "6478a56b3f1c4e3c8a567891",
      chat: "12345",
      message: "Great to hear that!",
      images: [],
      docs: [],
      seen: true,
      createdAt: "2024-11-20T14:32:00Z",
    },
    {
      _id: "1",
      sender: "6478a56b3f1c4e3c8a567890",
      receiver: "6478a56b3f1c4e3c8a567891",
      chat: "12345",
      message: "Hello, how are you?",
      images: [],
      docs: [],
      seen: true,
      createdAt: "2024-11-20T14:30:00Z",
    },
    {
      _id: "2",
      sender: "6478a56b3f1c4e3c8a567891",
      receiver: "6478a56b3f1c4e3c8a567890",
      chat: "12345",
      message: "I'm good! How about you?",
      images: [],
      docs: [],
      seen: false,
      createdAt: "2024-11-20T14:31:00Z",
    },
    {
      _id: "3",
      sender: "6478a56b3f1c4e3c8a567890",
      receiver: "6478a56b3f1c4e3c8a567891",
      chat: "12345",
      message: "Great to hear that!",
      images: [],
      docs: [],
      seen: true,
      createdAt: "2024-11-20T14:32:00Z",
    },
    {
      _id: "2",
      sender: "6478a56b3f1c4e3c8a567891",
      receiver: "6478a56b3f1c4e3c8a567890",
      chat: "12345",
      message: "I'm good! How about you?",
      images: [],
      docs: [],
      seen: false,
      createdAt: "2024-11-20T14:31:00Z",
    },
    {
      _id: "2",
      sender: "6478a56b3f1c4e3c8a567891",
      receiver: "6478a56b3f1c4e3c8a567890",
      chat: "12345",
      message: "I'm good! How about you?",
      images: [],
      docs: [],
      seen: false,
      createdAt: "2024-11-20T14:31:00Z",
    },
    {
      _id: "3",
      sender: "6478a56b3f1c4e3c8a567890",
      receiver: "6478a56b3f1c4e3c8a567891",
      chat: "12345",
      message: "Great to hear that!",
      images: [],
      docs: [],
      seen: true,
      createdAt: "2024-11-20T14:32:00Z",
    },
  ];

  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (inputMessage.trim()) {
      // Logic to send message to the server
      console.log("Message sent:", inputMessage);
      setInputMessage("");
    }
  };

  return (
    <div className=" md:col-span-9  w-full  bg-white  flex flex-col ">
      {/* Header */}
      <div className="flex items-center  justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Image
            width={100}
            height={1000}
            src="/images/user.png"
            alt="Receiver"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="text-sm font-medium text-gray-900">Receiver Name</h3>
            <p className="text-xs text-green-500">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`flex items-start ${
              msg.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender !== currentUser && (
              <Image
                width={40}
                height={40}
                src="/images/user.png"
                alt="Sender"
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
            )}
            <div
              className={`${
                msg.sender === currentUser
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-800"
              } p-3 rounded-lg text-sm max-w-[70%]`}
            >
              <p>{msg.message}</p>
              {msg.images.length > 0 && (
                <div className="mt-2">
                  {msg.images.map((image, index) => (
                    <Image
                      width={200}
                      height={200}
                      key={index}
                      src={image}
                      alt={`Message image ${index + 1}`}
                      className="w-full h-auto rounded-lg mt-1"
                    />
                  ))}
                </div>
              )}
              {msg.docs.length > 0 && (
                <div className="mt-2">
                  {msg.docs.map((doc, index) => (
                    <a
                      key={index}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-xs block"
                    >
                      Document {index + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t flex items-center">
        <input
          type="text"
          placeholder="Type a message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-1 bg-gray-100 rounded-md px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="ml-2 text-blue-500 font-medium hover:underline"
        >
          Send
        </button>
      </div>
    </div>
  );
}
