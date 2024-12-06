import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import { baseUrl } from "@/constants";

interface ShowDetailsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedItem: any;
}

export default function ShowDetails({
  isOpen,
  setIsOpen,
  selectedItem,
}: ShowDetailsProps) {
  const handleClose = () => setIsOpen(false);
  const profilePicture = `${baseUrl}/${selectedItem?.user?.profilePicture}`;
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.service?.title || "Details"}
            </DialogTitle>
            <DialogDescription>
              <div className="my-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full">
                      <Image
                        width={200}
                        height={200}
                        src={profilePicture}
                        alt={selectedItem.service.title}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <p className="font-semibold flex flex-col text-lg">
                      <span>{selectedItem.user?.name}</span>
                      <span className="text-sm font-normal">
                        {format(selectedItem.createdAt, "hh:mm a, dd/MM/yyyy")}
                      </span>
                    </p>
                  </div>
                  <div className="stars">
                    {Array.from({ length: selectedItem.rating }, (_, index) => (
                      <span
                        key={index}
                        className={`star text-yellow-400 text-lg ${
                          index < selectedItem.rating ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-5">{selectedItem.review}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
