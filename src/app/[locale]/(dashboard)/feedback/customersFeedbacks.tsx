"use client";

import Image from "next/image";
import { useState } from "react";

export default function CustomerFeedbacks() {
  const [selected, setSelected] = useState(1);

  const feedbacks = [
    {
      id: 1,
      name: "Shelby Goode",
      feedback: "Lorem Ipsum is simply dummy text of the printing",
      time: "1 min ago",
      image: "/images/user.png",
    },
    {
      id: 2,
      name: "Robert Bacins",
      feedback: "Lorem Ipsum is simply dummy text of the printing",
      time: "9 min ago",
      image: "/images/user.png",
    },
    {
      id: 3,
      name: "John Carilo",
      feedback: "Lorem Ipsum is simply dummy text of the printing",
      time: "15 min ago",
      image: "/images/user.png",
    },
    {
      id: 4,
      name: "Adriene Watson",
      feedback: "Lorem Ipsum is simply dummy text of the printing",
      time: "21 min ago",
      image: "/images/user.png",
    },
    {
      id: 5,
      name: "Jhon Deo",
      feedback: "Lorem Ipsum is simply dummy text of the printing",
      time: "29 min ago",
      image: "/images/user.png",
    },
    {
      id: 6,
      name: "Mark Ruffalo",
      feedback: "Lorem Ipsum is simply dummy text of the printing",
      time: "45 min ago",
      image: "/images/user.png",
    },
  ];

  return (
    <div className="bg-white shadow-md border rounded-lg p-4 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Customers feedback
        </h2>
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12h12m-6-6v12"
            />
          </svg>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Feedback List */}
      <div className="space-y-2">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            onClick={() => setSelected(feedback.id)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
              selected === feedback.id ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <Image
              src={feedback.image}
              width={40}
              height={40}
              alt={feedback.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                {feedback.name}
              </h3>
              <p className="text-xs text-gray-500">{feedback.feedback}</p>
            </div>
            <span className="text-xs text-gray-400">{feedback.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
