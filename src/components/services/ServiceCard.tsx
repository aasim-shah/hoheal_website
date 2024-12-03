"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight, Edit, Trash } from "lucide-react";
import Link from "next/link";
import MyDialog from "../MyDialog";
import MyImage from "../MyImage";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { H } from "../ui/typography";

const ServiceCard = ({ service }: any) => {
  const { _id, title, description, logo, hotel, category, subCategory } =
    service || {};

  const { _id: hotelId, name: hotelName } = hotel || {};
  const { _id: categoryId, title: categoryName } = category || {};
  const { _id: subCategoryId, title: subCategoryName } = subCategory || {};

  return (
    <Dialog>
      <Card>
        <CardHeader className="relative p-0">
          <MyImage
            src={logo}
            alt={title}
            containerClasses="w-full h-48 object-cover rounded-t-lg"
            width={400}
            height={200}
          />

          <div className="absolute top-3 right-3 flex gap-2">
            <Link
              href={`/services/${_id}/edit`}
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

        <CardContent className="text-xs p-4 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-signature truncate">{hotelName}</p>
            <Link
              href={`/services/${_id}`}
              className="bg-signature text-white px-6 py-2 rounded-full hover:bg-signature-light text-sm"
            >
              View
            </Link>
          </div>

          <div>
            <H size="lg" className="font-semibold truncate">
              {title}
            </H>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <p className="flex items-center text-muted-foreground">
            {subCategoryName} <ChevronRight size={18} />
            {categoryName}
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
