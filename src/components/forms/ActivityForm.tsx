import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { CommonFields, ImageFields } from "./fields/SharedFields";

const ActivityForm = ({ control }: { control: any }) => {
  const schedule = useWatch({ control, name: "schedule" });
  const { setValue } = useFormContext();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValue("schedule", { ...schedule, [name]: value });
  };
  // value should be display of date , from and to
  const value = `${schedule.date && `${schedule.date}`}${
    schedule.from && ` / ${schedule.from}`
  }${schedule.to && ` - ${schedule.to}`}`;

  return (
    <>
      <CommonFields control={control} />
      <div className="space-y-2">
        <Label className="block text-sm font-medium text-muted-foreground">
          Schedule
        </Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"} className="w-full">
              {value || "Select Schedule"}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule</DialogTitle>
              <DialogDescription>
                Select a schedule for your activity.
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label className="block text-sm font-medium text-muted-foreground">
                  Date
                </Label>
                <Input
                  type="date"
                  name="date"
                  placeholder="Date"
                  value={schedule.date}
                  onChange={handleChange}
                />{" "}
              </div>

              <div className="space-y-2">
                <Label className="block text-sm font-medium text-muted-foreground">
                  From
                </Label>
                <Input
                  type="time"
                  name="from"
                  className="w-full"
                  placeholder="From"
                  value={schedule.from}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label className="block text-sm font-medium text-muted-foreground">
                  To
                </Label>
                <Input
                  type="time"
                  name="to"
                  placeholder="To"
                  value={schedule.to}
                  onChange={handleChange}
                  disabled={!schedule.from}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="w-full" asChild>
                <Button variant="signature">Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ImageFields control={control} />
    </>
  );
};

export default ActivityForm;
