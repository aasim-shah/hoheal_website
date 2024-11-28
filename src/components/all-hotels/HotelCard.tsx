import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import HotelStatsCard from "./HotelStatsCard";
import Link from "next/link";

// HotelCard Component
const HotelCard = () => {
  const statsCardData: HotelStatsCard = {
    payment: "$568 / Year",
    hotelType: "5 stars",
    totalRooms: "120",
    contractDuration: "2025-2030",
  };
  const _id = 33;
  return (
    <Card className="p-4 flex flex-col gap-4">
      {/* Image and View Button */}
      <div className="flex justify-between items-start">
        <Image
          src="/images/dummy.png"
          alt="Beachfront Bliss"
          width={200}
          height={200}
          className="h-20 w-20 object-cover rounded-full"
        />
        <Link
          href={`/all-hotels/${_id}`}
          className="bg-signature text-white px-6 py-2 rounded-full hover:bg-signature-light transition-colors text-sm"
        >
          View
        </Link>
      </div>

      {/* Hotel Details */}
      <div>
        <CardTitle className="text-lg font-semibold">
          Beachfront Bliss
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Discussion for management dashboard UI design
        </CardDescription>
      </div>

      <HotelStatsCard {...statsCardData} />
    </Card>
  );
};

export default HotelCard;
