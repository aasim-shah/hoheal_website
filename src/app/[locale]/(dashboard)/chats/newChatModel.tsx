import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useApi from "@/hooks/useApi";
import { getStaffList } from "@/lib/api/department";
import { toast } from "sonner";

interface ShowDetailsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function StartNewChat({ isOpen, setIsOpen }: ShowDetailsProps) {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [staffList, setStaffList] = useState([]);
  const { data, loading, error, execute } = useApi(getStaffList);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    execute("6729bd3e5a9f963581db7890");
  }, []);

  console.log({ data });

  useEffect(() => {
    if (data) {
      setStaffList(data.employees);
    }
  }, [data]);

  console.log({ staffList });

  const handleStartChat = () => {
    if (selectedStaff) {
      console.log("Starting chat with:", selectedStaff);
      toast.success("New Chat Intiated");
      //   setIsOpen(false);
    } else {
      alert("Please select a staff member to start a chat.");
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="py-2">Select Staff Member</DialogTitle>
            <DialogDescription>
              <div className="space-y-5 ">
                <div className="my-5">
                  <Select onValueChange={setSelectedStaff}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a staff member" />
                    </SelectTrigger>
                    <SelectContent className="">
                      {loading && <div>Loading staff...</div>}
                      {error && <div>Error fetching staff!</div>}
                      {!loading && staffList.length > 0 ? (
                        staffList.map((staff: any) => (
                          <SelectItem key={staff._id} value={staff._id}>
                            {staff.user?.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div>No staff available</div>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleStartChat}
                  className="w-full"
                  variant={"signature"}
                  disabled={!selectedStaff}
                >
                  Start Chat
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
