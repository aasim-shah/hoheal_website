import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { baseUrl } from "@/constants";

interface ViewStaffProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedStaff: any;
}

export default function ViewStaff({
  isOpen,
  setIsOpen,
  selectedStaff,
}: ViewStaffProps) {
  const handleClose = () => setIsOpen(false);

  const profilePicture = `${baseUrl}/${selectedStaff?.user?.profilePicture}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>View Staff Details</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="my-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-full">
                  <Image
                    width={200}
                    height={200}
                    src={profilePicture}
                    alt={selectedStaff.user?.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <p className="font-semibold space-y-1 flex flex-col text-lg">
                  <span>{selectedStaff.user?.name}</span>
                  <span className="text-sm font-normal ">
                    {selectedStaff.user?.email}
                  </span>
                </p>
              </div>
              <span className="text-sm font-normal ">
                {selectedStaff.role?.title}
              </span>
            </div>
            {/* <p className="text-sm mt-5">{selectedStaff.review}</p> */}
          </div>
        </DialogDescription>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
