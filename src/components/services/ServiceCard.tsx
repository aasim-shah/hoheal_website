"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Edit, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { H, P } from "../ui/typography";
import { Dialog, DialogTrigger } from "../ui/dialog";
import MyDialog from "../MyDialog";

const ServiceCard = () => {
  const dummyServiceData: CommonServiceData = {
    _id: "1",
    title: "Technical Service",
    description: "This is a description for the technical service.",
    logo: "/images/dummy.png",
    hotel: {
      _id: "hotel1",
      name: "Grand Hyatt Dubai",
    },
    category: {
      _id: "cat1",
      title: "Room",
      hotel: "hotel1",
      subCategories: [
        {
          _id: "subcat1",
          title: "Room Upgrade",
          image: "/images/dummy.png",
          category: "cat1",
          hotel: "hotel1",
        },
        {
          _id: "subcat2",
          title: "Room Service",
          image: "/images/dummy.png",
          category: "cat1",
          hotel: "hotel1",
        },
      ],
    },
    subCategory: {
      _id: "subcat1",
      title: "Room Upgrade",
      image: "/images/dummy.png",
      category: "cat1",
      hotel: "hotel1",
    },
  };

  return (
    <Dialog>
      <Card>
        {/* Header Image */}
        <CardHeader className="relative p-0">
          <Image
            src={dummyServiceData.logo}
            alt={dummyServiceData.title}
            className="w-full h-48 object-cover rounded-t-lg"
            width={400}
            height={200}
          />
          {/* Action Icons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <Link
              href={`/services/${dummyServiceData._id}/edit`}
              passHref
              className="bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
            >
              <Edit className="w-4 h-4 text-gray-600" />
            </Link>
            <DialogTrigger>
              <div className="bg-white p-2 rounded-full shadow hover:bg-red-200 transition">
                <Trash className="w-4 h-4 text-red-600" />
              </div>
            </DialogTrigger>
          </div>
        </CardHeader>
        {/* Content */}
        <CardContent className="text-xs p-4 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-signature truncate">
              {dummyServiceData.hotel.name}
            </p>
            <Link
              href={`/services/${dummyServiceData._id}`}
              className="bg-signature text-white px-6 py-2 rounded-full hover:bg-signature-light text-sm"
            >
              View
            </Link>
          </div>

          <div>
            <H size="lg" className="font-semibold truncate">
              {dummyServiceData.title}
            </H>
            <p className="text-muted-foreground">
              {dummyServiceData.description}
            </p>
          </div>
          <p className="flex items-center text-muted-foreground">
            {dummyServiceData.category.title} <ChevronRight size={18} />
            {dummyServiceData.subCategory.title}
          </p>
        </CardContent>
      </Card>

      <MyDialog
        title={"delete"}
        description={"are you sure you want to delete this service?"}
        handleClick={() => console.log("delete")}
      />
    </Dialog>
  );
};

export default ServiceCard;
