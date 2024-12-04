"use client";

import useApi from "@/hooks/useApi";
import OwnerDetails from "./OwnerDetails";
import { getHotelById } from "@/lib/api/hotel";
import { useEffect, useState } from "react";
import Loading from "@/app/[locale]/loading";
import MyCarousel from "../MyCarousel";
import { H } from "../ui/typography";
import MyImage from "../MyImage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const HotelDetails = ({ id }: any) => {
  const router = useRouter();
  const { data, loading, error, execute } = useApi(getHotelById);

  const [hotel, setHotel] = useState<any>();
  const [services, setServices] = useState([]);

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
  } = hotel || {};

  return (
    <div>
      <MyCarousel images={images} />
      <div className="space-y-4 md:space-y-8 my-4">
        <div className="space-y-4">
          <H className="text-xl font-bold">Hotel Details</H>
          <div className="flex flex-col md:flex-row items gap-4">
            <MyImage
              width={200}
              height={200}
              src={logo}
              alt={name}
              className="w-20 h-20 md:w-40 md:h-40 rounded-lg border-2"
            />
            <div className="">
              <H className="text-lg font-bold">{name}</H>
              <div className="text-sm">
                <span className="font-bold">Type:</span> {type}
              </div>
              <div className="text-sm">
                <span className="font-bold">Email:</span> {email}
              </div>
              <div className="text-sm">
                <span className="font-bold">Phone:</span> {phone}
              </div>
              <div className="text-sm">
                <span className="font-bold">Services Requested:</span>{" "}
                {servicesRequested}
              </div>
              <div className="text-sm">
                <span className="font-bold">Starting Date:</span> {startingDate}
              </div>
              <div className="text-sm">
                {/* <span className="font-bold">Location:</span> {location.city} */}
              </div>
            </div>
          </div>
        </div>
        <OwnerDetails user={user} />
      </div>
    </div>
  );
};

export default HotelDetails;
