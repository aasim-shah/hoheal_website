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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormInput from "./FormInput";

const MenuItems = ({ control }: { control: any }) => {
  const { menuTitle } = useWatch({ control });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });
  const { fields: timingFields } = useFieldArray({
    control,
    name: "timing",
  });
  const timingOptions = timingFields
    ? timingFields.map((field: any) => field.timing)
    : [];

  const initialValues = {
    title: "",
    timing: "",
    price: "",
    availability: false,
  };
  const [menuItem, setMenuItem] = useState(initialValues);

  const handleMenuItem = () => {
    if (
      menuItem.title &&
      menuItem.price &&
      (menuTitle !== "meals" || menuItem.timing)
    ) {
      append(menuItem);
      setMenuItem(initialValues);
      toast.success("Menu item added successfully!");
    } else {
      toast.error(
        "Please fill in all required fields before adding menu item!"
      );
    }
  };

  const handleRemoveMenuItem = (index: number) => {
    remove(index);
    toast.success("Menu item removed!");
  };

  return (
    <>
      {(menuTitle !== "meals" || menuItem.timing) && (
        <Dialog>
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-muted-foreground">
              Menu Items
            </Label>
            <DialogTrigger asChild>
              <Button variant={"secondary"} className="w-full">
                Add Menu Items
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Menu Item</DialogTitle>
                <DialogDescription>
                  Add a new menu item with details like title, price, and
                  availability.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 py-4">
                  <Input
                    type="text"
                    placeholder="Title"
                    value={menuItem.title}
                    onChange={(e) =>
                      setMenuItem((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  {menuTitle === "meals" && (
                    <Select
                      value={menuItem.timing}
                      onValueChange={(e) =>
                        setMenuItem((prev) => ({ ...prev, timing: e }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Timing" />
                      </SelectTrigger>
                      <SelectContent>
                        {timingOptions.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <Input
                    type="number"
                    placeholder="Price"
                    value={menuItem.price}
                    onChange={(e) =>
                      setMenuItem((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                  />
                  <div className="flex items-center w-full space-x-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        type="checkbox"
                        checked={menuItem.availability}
                        onChange={(e) =>
                          setMenuItem((prev) => ({
                            ...prev,
                            availability: e.target.checked,
                          }))
                        }
                        className="h-8 w-8"
                      />
                      <Label className="text-sm">Available</Label>
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  variant={"signature"}
                  onClick={handleMenuItem}
                  className="w-full"
                >
                  Add
                </Button>
              </div>

              {fields?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 max-h-40 overflow-scroll">
                  {fields.map((field: any, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between border p-2 rounded-md bg-secondary text-sm"
                    >
                      <div className="flex flex-col">
                        <span className="capitalize font-semibold">
                          {field.title}
                        </span>
                        {menuTitle === "meal" && <span>{field.timing}</span>}
                        <span>Price: ${field.price}</span>
                        <span className="text-xs">
                          {field.availability ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant={"destructive"}
                        size={"sm"}
                        onClick={() => handleRemoveMenuItem(index)}
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
      )}
    </>
  );
};

export default MenuItems;
