import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    profilePic: string | null;
  };
  status: string;
}

interface ShowDetailsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedItem: Task | null; // Selected task to show in the dialog
}

export default function ShowDetails({
  isOpen,
  setIsOpen,
  selectedItem,
}: ShowDetailsProps) {
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.service.title || "Details"}
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-2 mt-4">
                <p>
                  <strong>Message:</strong> {selectedItem?.message}
                </p>
                s
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(selectedItem?.date || "").toLocaleDateString()}
                </p>
                <p>
                  <strong>Room Number:</strong> {selectedItem?.roomNumber}
                </p>
                <p>
                  <strong>Tasks:</strong>{" "}
                  {selectedItem?.tasksList?.map((task, index) => (
                    <span key={index} className="block pl-2">
                      {index + 1}. {task}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Status:</strong> {selectedItem?.status}
                </p>
                <p>
                  <strong>Assigned User:</strong> {selectedItem?.user?.name} (
                  {selectedItem?.user?.email})
                </p>
                {selectedItem?.service?.logo && (
                  <img
                    src={selectedItem.service.logo}
                    alt={selectedItem.service.title}
                    className="w-20 h-20 rounded object-cover"
                  />
                )}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
