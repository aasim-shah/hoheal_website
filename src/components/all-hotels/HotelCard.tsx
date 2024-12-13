import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import MyImage from "../MyImage";
import HotelStatsCard from "./HotelStatsCard";
import { formatContractDate } from "@/utils/formatDateAndTime";

const HotelCard = ({ hotel }: any) => {
  const {
    _id,
    name,
    description,
    logo,
    type,
    rooms,
    suites,
    periodOfContract,
  } = hotel;
  const contractDuration = formatContractDate(periodOfContract);

  const statsCardData: HotelStatsCard = {
    type: type ? `${type} stars` : "-",
    suites: suites ? suites : "-",
    rooms: rooms ? rooms : "-",
    contractDuration,
  };

  return (
    <Card key={_id} className="p-4 flex flex-col gap-4">
      {/* Image and View Button */}
      <div className="flex justify-between items-start">
        <MyImage
          src={logo}
          alt="Beachfront Bliss"
          width={100}
          height={100}
          className="h-20 w-20"
          containerClasses="h-20 w-20 rounded-full"
        />
        <Link
          href={`/all-hotels/${_id}`}
          className="bg-signature text-white px-6 py-2 rounded-full hover:bg-signature-light transition-colors text-sm"
        >
          View
        </Link>
      </div>

      {/* Hotel Details */}
      <div className="flex flex-col justify-between h-full">
        <div>
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </CardDescription>
        </div>
        <HotelStatsCard {...statsCardData} />
      </div>
    </Card>
  );
};

export default HotelCard;
