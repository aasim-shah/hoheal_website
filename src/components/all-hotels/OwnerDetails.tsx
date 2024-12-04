"use client";

import MyImage from "../MyImage";
import { Label } from "../ui/label";
import { H } from "../ui/typography";

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
      <div className="flex flex-col md:flex-row items gap-4">
        <MyImage
          width={200}
          height={200}
          src={profilePicture}
          alt={name}
          className="w-20 h-20 md:w-40 md:h-40 rounded-lg border-2"
        />
        <div className="">
          <H className="text-lg font-bold">{name}</H>
          <div className="text-sm">
            <span className="font-bold">Email:</span> {email || "-"}
          </div>
          <div className="text-sm"></div>
          <span className="font-bold">Phone:</span> {phone || "-"}
        </div>
      </div>
    </div>
  );
};

export default OwnerDetails;
