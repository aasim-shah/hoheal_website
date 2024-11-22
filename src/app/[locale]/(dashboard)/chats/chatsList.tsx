"use client";

import Image from "next/image";
import { useState } from "react";

export default function ChatsList() {
  const [selected, setSelected] = useState(1);

  const messages = [
    {
      id: 1,
      name: "Elmer Laverty",
      message: "Haha oh man",
      time: "12m",
      image: "/images/user.png",
    },
    {
      id: 2,
      name: "Florencio Dorrance",
      message: "woohoooo",
      time: "24m",
      image: "/images/user.png",
    },
    {
      id: 3,
      name: "Lavern Laboy",
      message: "Haha that's terrifying",
      time: "1h",
      image: "/images/user.png",
    },
    {
      id: 4,
      name: "Titus Kitamura",
      message: "omg, this is amazing",
      time: "5h",
      image: "/images/user.png",
    },
    {
      id: 5,
      name: "Geoffrey Mott",
      message: "aww",
      time: "2d",
      image: "/images/user.png",
    },
    {
      id: 6,
      name: "Alfonzo Schuessler",
      message: "perfect!",
      time: "1w",
      image: "/images/user.png",
    },
  ];

  return (
    <div className="col-span-11 md:col-span-3 bg-white shadow-sm border-2 border-gray-100 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Messages{" "}
          <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
            12
          </span>
        </h2>
        <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
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
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        />
      </div>

      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => setSelected(msg.id)}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
              selected === msg.id ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <Image
              width={40}
              height={40}
              src={msg.image}
              alt={msg.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{msg.name}</h3>
              <p className="text-xs text-gray-500 truncate">{msg.message}</p>
            </div>
            <span className="text-xs text-gray-400">{msg.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
