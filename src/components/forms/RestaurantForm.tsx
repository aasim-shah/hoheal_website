import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FormFileDropzone from "./fields/FormFileDropzone";
import { CommonFields, ImageFields } from "./fields/SharedFields";

const RestaurantForm = ({ control }: { control: any }) => {
  const openingHours = useWatch({ control, name: "openingHours" });
  const { setValue } = useFormContext();
  const [timing, setTiming] = useState({
    from: "",
    to: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTiming({
      ...timing,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (timing.from && timing.to) {
      const joinedTiming = `${timing.from} - ${timing.to}`;
      setValue("openingHours", [...openingHours, joinedTiming]);
      setTiming({ from: "", to: "" });
      toast.success("Opening hours added successfully!");
    } else {
      toast.error("Please fill in all fields before adding meal timing!");
    }
  };

  const removeOpeningHour = (index: number) => {
    const updatedOpeningHours = [...openingHours];
    updatedOpeningHours.splice(index, 1);
    setValue("openingHours", updatedOpeningHours);
    toast.success("Opening hours removed!");
  };

  return (
    <>
      <CommonFields control={control} />
      <div className="space-y-2">
        <Label className="block text-sm font-medium text-muted-foreground">
          Opening Hours
        </Label>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"secondary"} className="w-full">
              Select Opening Hours
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule</DialogTitle>
              <DialogDescription>
                Select a schedule for your activity.
              </DialogDescription>
            </DialogHeader>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label className="block text-sm font-medium text-muted-foreground">
                  From
                </Label>
                <Input
                  type="time"
                  name="from"
                  className="w-full"
                  placeholder="From"
                  value={timing.from}
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
                  value={timing.to}
                  onChange={handleChange}
                  disabled={!timing.from}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                className="w-full"
                type="button"
                onClick={handleSave}
                variant="signature"
              >
                Save
              </Button>
            </DialogFooter>
            {openingHours?.length > 0 && (
              <div className="grid md:grid-cols-2 gap-2 max-h-40 overflow-scroll">
                {openingHours.map((openingHour: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 shadow bg-secondary"
                  >
                    <p>{openingHour}</p>
                    <Button
                      variant={"destructive"}
                      size={"sm"}
                      onClick={() => removeOpeningHour(index)}
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <FormFileDropzone
        name="menu"
        control={control}
        label="Menu"
        multiple={false}
      />
      <ImageFields control={control} />
    </>
  );
};

export default RestaurantForm;
