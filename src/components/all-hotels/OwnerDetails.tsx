"use client";

import MyImage from "../MyImage";
import { H } from "../ui/typography";
import { Value } from "./HotelDetails";

type Props = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
};

const OwnerDetails = ({ user }: { user: Props }) => {
  const { _id, name, email, phone, profilePicture } = user || {};
  return (
    <div className="space-y-4">
      <H className="text-xl font-bold">Owner Details</H>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MyImage
          key={profilePicture}
          width={200}
          height={200}
          src={profilePicture}
          alt={name}
          className="w-full h-full object-cover"
          containerClasses="w-32 h-32 md:w-48 md:h-48 border border-gray-700 rounded-lg"
        />
        <div className="space-y-2 md:col-span-2 lg:col-span-3">
          <H className="text-xl font-semibold">{name}</H>
          <Value title="name" value={name} />
          <Value title="email" value={email} />
          <Value title="phone" value={phone} />
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;
