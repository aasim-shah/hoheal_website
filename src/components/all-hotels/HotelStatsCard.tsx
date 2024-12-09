import { camelCaseToNormalCase } from "@/utils/reuseableMethods";
import { BiSolidBriefcase } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

const HotelStatsCard = ({
  type,
  rooms,
  suites,
  contractDuration,
}: HotelStatsCard) => {
  const heading = [
    { key: "hotelType", value: type, icon: BiSolidBriefcase },
    { key: "totalRooms", value: rooms, icon: FaUser },
    { key: "totalSuites", value: suites, icon: FaUser },
    { key: "contractDuration", value: contractDuration, icon: FaUser },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {heading.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-secondary p-3 rounded-lg"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-signature/20">
            <item.icon className="w-5 h-5 text-signature" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">
              {camelCaseToNormalCase(item.key)}
            </p>
            <p className="font-medium text-sm">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelStatsCard;
