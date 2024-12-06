import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { format } from "date-fns";

interface ShowDetailsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedItem: any | null; // Adjusted for the new data format
}

export default function ShowDetails({
  isOpen,
  setIsOpen,
  selectedItem,
}: ShowDetailsProps) {
  const handleClose = () => setIsOpen(false);

  const profilePicture = selectedItem?.profilePicture || "/default-profile.png"; // Fallback image for profile pic

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={profilePicture}
                      alt={selectedItem?.name || "User"}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      {selectedItem?.name || "N/A"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {selectedItem?.email || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Hotel & Room Info */}
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Hotel:</strong>{" "}
                    {selectedItem?.checkInInfo?.hotel?.name || "N/A"}
                  </p>
                  <p>
                    <strong>Room Number:</strong>{" "}
                    {selectedItem?.checkInInfo?.roomNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Room Type:</strong>{" "}
                    {selectedItem?.checkInInfo?.roomType || "N/A"}
                  </p>
                </div>

                {/* Check-In Info */}
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Check-In Date:</strong>{" "}
                    {selectedItem?.checkInInfo?.checkInDate
                      ? format(
                          new Date(selectedItem.checkInInfo.checkInDate),
                          "dd/MM/yyyy"
                        )
                      : "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedItem?.checkInInfo?.status || "N/A"}
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
