"use client";

import useApi from "@/hooks/useApi";
import { getReviews } from "@/lib/api/department";
import Image from "next/image";
import { useEffect, useState } from "react";
import ShowDetails from "./showDetails";

export default function CustomerFeedbacks() {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, loading, error, execute } = useApi(getReviews);

  useEffect(() => {
    execute("All");
  }, []);

  const handleReviewClick = (review: any) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  return (
    <div className=" shadow-md border rounded-lg p-4 col-span-11 md:col-span-5 max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Customers Feedback
        </h2>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2.5 text-sm text-gray-900  border  rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Feedback List */}
      <div className="space-y-2">
        {loading && <p>Loading reviews...</p>}
        {error && <p>Error fetching reviews.</p>}
        {data?.reviews &&
          data.reviews.map((feedback: any) => (
            <div
              key={feedback._id}
              onClick={() => handleReviewClick(feedback)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer `}
            >
              <Image
                src={feedback.user?.profilePic || "/images/user.png"}
                width={40}
                height={40}
                alt={feedback.user?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium ">{feedback.user?.name}</h3>
                <p className="text-xs text-gray-500">
                  {feedback.review?.toString().slice(0, 60)}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Show Details Modal */}
      {selectedReview && (
        <ShowDetails
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          selectedItem={selectedReview}
        />
      )}
    </div>
  );
}
