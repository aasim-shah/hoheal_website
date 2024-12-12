import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { format } from "date-fns";
import { baseUrl } from "@/constants";
import { H, P } from "@/components/ui/typography";
import MyImage from "@/components/MyImage";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { checkIn } from "@/lib/api/hotel";
import { useTranslations } from "next-intl";

interface ShowDetailsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedItem: any | null;
}

export default function ConfirmCheckIn({
  isOpen,
  setIsOpen,
  selectedItem,
}: ShowDetailsProps) {
  const handleClose = () => setIsOpen(false);
  const [roomNumber, setroomNumber] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("");

  const { data, loading, error, execute } = useApi(checkIn);

  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");

  const handleConfirm = () => {
    const payload = {
      idCardNumber: selectedItem.idCardNumber,
      name: selectedItem.user?.name,
      email: selectedItem.user?.email,
      roomNumber: roomNumber,
      roomType: roomType,
      checkInDate: new Date().toISOString(),
      hotel: selectedItem.hotel,
    };
    execute(payload);
    setIsOpen(false);
    console.log({ payload });
  };

  const profilePicture = selectedItem?.user?.profilePicture
    ? `${baseUrl}/${selectedItem.user?.profilePicture}`
    : "/default-profile.png";

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Checkin User</DialogTitle>
            <DialogDescription>
              <div className="my-5 space-y-4">
                {/* User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={profilePicture}
                          alt={selectedItem?.user?.name || "User"}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-lg">
                        <p className="font-semibold">
                          {selectedItem?.user?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedItem?.user?.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          {selectedItem?.createdAt
                            ? format(
                                new Date(selectedItem.createdAt),
                                "hh:mm a, dd/MM/yyyy"
                              )
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 p-3">
                  <P size="sm">
                    <span className="font-semibold">ID Card </span>
                    <span>: {selectedItem?.idCardNumber}</span>
                  </P>
                  <P size="sm">
                    <span className="font-semibold">Booking Number </span>
                    <span>: {selectedItem?.bookingNumber}</span>
                  </P>
                  <P size="sm">
                    <span className="font-semibold">Voucher Number </span>
                    <span>: {selectedItem?.voucherNumber}</span>
                  </P>
                </div>
                <div className="flex flex-row">
                  {selectedItem &&
                    selectedItem.attachments &&
                    selectedItem.attachments.map((attachment: any) => (
                      <MyImage
                        key={attachment}
                        src={attachment}
                        alt={selectedItem?.user?.name || "User"}
                        width={200}
                        height={200}
                        className="object-cover"
                        containerClasses="w-24 h-24  overflow-hidden"
                      />
                    ))}
                </div>

                <div className="flex flex-row gap-2  items-center">
                  {/* Room Number */}
                  <div className="w-full lg:w-5/12">
                    <label className="text-sm" htmlFor="roomNumber">
                      {labelsT("roomNumber")}
                    </label>
                    <input
                      type="text"
                      id="roomNumber"
                      onChange={(e) => setroomNumber(e.target.value)}
                      placeholder={placeholderT("roomNumber")}
                      className="bg-secondary/50 py-2 outline-none border w-full rounded-md px-3"
                    />
                  </div>

                  {/* Room Type Dropdown */}
                  <div className="w-full lg:w-5/12">
                    <label className="text-sm" htmlFor="roomType">
                      {labelsT("roomType")}
                    </label>
                    <select
                      onChange={(e) => setRoomType(e.target.value)}
                      id="roomType"
                      className={`bg-secondary/50 w-full py-3 px-3 rounded-md `}
                    >
                      <option value="" disabled>
                        {placeholderT("roomType")}
                      </option>
                      <option value="room">Room</option>
                      <option value="suite">Suite</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row justify-end gap-3">
                  <Button onClick={handleClose} variant={"outline"}>
                    cancel
                  </Button>
                  <Button onClick={handleConfirm} variant={"signature"}>
                    Checkin
                  </Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
