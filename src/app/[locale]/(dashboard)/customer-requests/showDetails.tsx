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
import { baseUrl } from "@/constants";

interface Task {
  _id: string;
  message: string;
  date: string;
  roomNumber: string;
  tasksList: string[];
  service: {
    _id: string;
    title: string;
    logo: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string | null;
  };
  status: string;
  createdAt: string;
  rating?: number;
  review?: string;
}

interface ShowDetailsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedItem: Task | null;
}

export default function ShowDetails({
  isOpen,
  setIsOpen,
  selectedItem,
}: ShowDetailsProps) {
  const handleClose = () => setIsOpen(false);

  const profilePicture = selectedItem?.user?.profilePicture
    ? `${baseUrl}/${selectedItem.user?.profilePicture}`
    : "/default-profile.png"; // fallback image

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.service?.title || "Service Details"}
            </DialogTitle>
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
                    <div className="flex flex-col items-start">
                      <span className="text-sm  text-gray-400">
                        Status . {selectedItem?.status}
                      </span>
                      <span className="text-sm text-gray-400">
                        Room . {selectedItem?.roomNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Info */}
                <div className="space-y-2">
                  <p>
                    <strong>Tasks</strong>
                    <ul className="pl-4 list-disc">
                      {selectedItem?.tasksList?.map((task, index) => (
                        <li key={index}>{task}</li>
                      ))}
                    </ul>
                  </p>
                  <p>{selectedItem?.message}</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
