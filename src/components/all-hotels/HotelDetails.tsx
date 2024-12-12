"use client";

import useApi from "@/hooks/useApi";
import OwnerDetails from "./OwnerDetails";
import { getHotelById } from "@/lib/api/hotel";
import { useEffect, useState } from "react";
import Loading from "@/app/[locale]/loading";
import MyCarousel from "../MyCarousel";
import { H, P } from "../ui/typography";
import MyImage from "../MyImage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MyCard from "../MyCard";
import { TableCell } from "../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatContractDate } from "@/utils/formatDateAndTime";
import { camelCaseToNormalCase } from "@/utils/reuseableMethods";

interface Service {
  title: string;
  logo: string;
}

const HotelDetails = ({ id }: any) => {
  const router = useRouter();
  const { data, loading, error, execute } = useApi(getHotelById);

  const [hotel, setHotel] = useState<any>();
  const [services, setServices] = useState<[]>([]);

  useEffect(() => {
    if (id) {
      execute(id);
    }
  }, [execute, id]);

  useEffect(() => {
    if (data) {
      if (data.body) {
        setHotel(data.body.hotel);
        setServices(data.body.services);
      } else {
        toast.error("Hotel not found");
        router.push("/all-hotels");
      }
    }
  }, [data]);

  if (!data && !error) {
    return <Loading />;
  }

  const {
    name,
    type,
    email,
    phone,
    servicesRequested,
    startingDate,
    location,
    logo,
    images,
    user,
    description,
    rooms,
    suites,
    periodOfContract,
  } = hotel || {};

  const contractDuration =
    periodOfContract && formatContractDate(periodOfContract);

  const { city, country, address } = location || {};

  const renderImage = (src: string) => (
    <MyImage
      width={1000}
      height={1000}
      className="w-full h-full object-cover"
      containerClasses="h-[30vh] md:h-[50vh]  rounded-lg"
      src={src}
      alt={"Image"}
    />
  );

  const renderService = ({ title, logo }: Service) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col items-center gap-2 p-2 h-24 w-24 bg-secondary rounded-md">
          <MyImage
            src={logo}
            alt={title}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            containerClasses="w-16 h-16 rounded-md"
          />

          <P size="xxs" className="line-clamp-1">
            {title}
          </P>
        </div>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );

  return (
    <MyCard className="p-4">
      <MyCarousel data={images} renderItem={renderImage} showDots />
      <div className="space-y-4 md:space-y-8 my-4">
        <div className="space-y-6">
          <H className="text-2xl font-bold border-b border-gray-700 pb-2">
            Hotel Details
          </H>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Hotel Logo */}

            <MyImage
              key={logo}
              width={200}
              height={200}
              src={logo}
              alt={name}
              className="w-full h-full object-cover"
              containerClasses="w-32 h-32 md:w-48 md:h-48 border border-gray-700 rounded-lg"
            />

            {/* Hotel Info */}
            <div className="space-y-2 md:col-span-2 lg:col-span-3">
              <>
                <H className="text-xl font-semibold">{name}</H>
                <P size="sm" className="text-muted-foreground">
                  {description}
                </P>
              </>
              <Value title="type" value={type + " Star"} />
              <Value title="email" value={email} />
              <Value title="phone" value={phone} />
              <Value title="serviceRequested" value={servicesRequested} />
              <Value title="startingDate" value={startingDate} />
              <Value title="contractDuration" value={contractDuration} />
              <Value title="address" value={address} />
              <Value title="location" value={`${city}, ${country}`} />
            </div>
          </div>
          <MyCarousel
            data={services}
            renderItem={renderService}
            multiItem
            itemsPerView={4}
          />
        </div>
        <OwnerDetails user={user} />
      </div>
    </MyCard>
  );
};

export default HotelDetails;

export const Value = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="text-sm flex items-center">
      <span className="font-bold text-gray-400 mr-2">
        {camelCaseToNormalCase(title)}:
      </span>
      {value}
    </div>
  );
};
