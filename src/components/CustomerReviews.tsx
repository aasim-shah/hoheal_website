"use client";

import { Input } from "@/components/ui/input";
import { H, P } from "@/components/ui/typography";
import useApi from "@/hooks/useApi";
import { getReviews } from "@/lib/api/department";
import { useEffect } from "react";
import CustomerReviewCard from "./CustomerReviewCard";
import CustomerReviewSkeleton from "./skeletons/CustomerReviewSkeleton";
import MyCard from "./MyCard";

export default function CustomerReviews() {
  const { data, loading, error, execute } = useApi(getReviews);

  useEffect(() => {
    execute("All");
  }, []);

  return (
    <MyCard className="h-full p-4 rounded-lg space-y-2">
      <H className="text-lg font-semibold">Customers Feedback</H>
      <Input type="text" placeholder="Search" className="bg-background" />

      <div className="h-full space-y-2">
        <div
          className={`w-full ${
            loading || error || data?.reviews.length === 0 ? "h-1/3" : ""
          } flex items-center justify-center text-muted-foreground`}
        >
          {loading && (
            <div className="space-y-2 w-full">
              {Array.from({ length: 3 }).map((_, index) => (
                <CustomerReviewSkeleton key={index} />
              ))}
            </div>
            // <div className="rounded-full animate-spin w-6 h-6 border-t-2 border-b border border-signature-dark"></div>
          )}
          {error && <P size="xs">Error fetching reviews.</P>}
          {data?.reviews.length === 0 && <P size="xs">No reviews found.</P>}
        </div>

        {/* Map through reviews and display them if available */}
        {data?.reviews &&
          data.reviews.map((feedback: any) => (
            <CustomerReviewCard key={feedback._id} feedback={feedback} />
          ))}
      </div>
    </MyCard>
  );
}
