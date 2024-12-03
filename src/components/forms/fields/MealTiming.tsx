import { useFieldArray, useWatch } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const MealTiming = ({ control }: { control: any }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "timing",
  });

  const [newTiming, setNewTiming] = useState({
    title: "",
    from: "",
    to: "",
  });

  const handleAddTiming = () => {
    if (newTiming.title && newTiming.from && newTiming.to) {
      append(newTiming);
      setNewTiming({ title: "", from: "", to: "" });
    } else {
      toast.error("Please fill in all fields before adding meal timing!");
    }
  };

  const handleRemoveTiming = (index: number) => {
    remove(index);
    toast.success("Meal timing removed!");
  };

  const menuTimingButtonTitle =
    fields?.length > 0
      ? `${fields?.length} Meal Timing/s Added`
      : "Add Meal Timing";
  return (
    <Dialog>
      <div className="space-y-2">
        <Label className="block text-sm font-medium text-muted-foreground">
          Meal Timing
        </Label>
        <DialogTrigger asChild>
          <Button variant={"secondary"} className="w-full">
            {menuTimingButtonTitle}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Meal Timing</DialogTitle>
            <DialogDescription>
              Specify the start and end time for meals.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Input
              type="text"
              placeholder="Title"
              value={newTiming.title}
              onChange={(e) =>
                setNewTiming((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
            />
            <div className="grid md:col-span-2 grid-cols-2 gap-2">
              <Input
                type="time"
                placeholder="From"
                value={newTiming.from}
                onChange={(e) =>
                  setNewTiming((prev) => ({
                    ...prev,
                    from: e.target.value,
                  }))
                }
              />
              <Input
                type="time"
                placeholder="To"
                value={newTiming.to}
                onChange={(e) =>
                  setNewTiming((prev) => ({
                    ...prev,
                    to: e.target.value,
                  }))
                }
              />
            </div>
            <Button
              type="button"
              variant={"signature"}
              onClick={handleAddTiming}
            >
              Add
            </Button>
          </div>
          {fields?.length > 0 && (
            <div className="grid grid-cols-1 gap-2 mt-4 max-h-40 overflow-scroll">
              {fields.map((field: any, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border p-2 rounded-md capitalize"
                >
                  <span>
                    {field.title} ({field.from} - {field.to})
                  </span>
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"sm"}
                    onClick={() => handleRemoveTiming(index)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {/* <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter> */}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default MealTiming;
