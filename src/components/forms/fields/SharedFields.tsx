import { HotelsCombobox } from "@/components/HotelsCombobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/store/store";
import { useFormContext, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import FormFileDropzone from "./FormFileDropzone";
import FormInput from "./FormInput";

export const CommonFields = ({ control }: { control: any }) => {
  const { role } = useSelector((state: RootState) => state.auth);
  return (
    <>
      {role === "superAdmin" && (
        <div className="lg:col-span-2">
          <HotelsCombobox />
        </div>
      )}
      <FormInput
        name="title"
        control={control}
        label="Title"
        placeholder="Enter title"
      />
      <FormInput
        name="description"
        control={control}
        label="Description"
        placeholder="Enter description"
        type="textarea"
      />
    </>
  );
};

export const RoomServicesCommonFields = ({ control }: { control: any }) => {
  const paid = useWatch({ control, name: "paid" });
  const { setValue } = useFormContext();

  const handlePaidChange = () => {
    setValue("paid", !paid);
    if (!paid) {
      setValue("price", 0);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label className="block text-sm font-medium text-muted-foreground">
          Completion Time (In minutes)
        </Label>
        <FormInput
          name="completionTime"
          control={control}
          placeholder="Enter completion time"
          type="number"
          min={0}
        />
      </div>
      <div className="space-y-2">
        <div className="flex space-x-2 justify-between">
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-muted-foreground">
              Paid Status
            </Label>
            <div className="flex gap-2 items-center">
              <Input
                className="h-8 w-8"
                type="checkbox"
                defaultChecked={paid}
                onChange={handlePaidChange}
              />
              <Label className="block text-sm font-medium text-muted-foreground">
                Paid
              </Label>
            </div>
          </div>
          {paid && (
            <FormInput
              label="Price"
              type="number"
              name="price"
              control={control}
              placeholder="Enter price"
            />
          )}
        </div>
      </div>
    </>
  );
};

export const ImageFields = ({ control }: { control: any }) => {
  return (
    <div className="lg:col-span-2">
      <FormFileDropzone
        name="images"
        control={control}
        label="Images"
        multiple={true}
      />
      <FormFileDropzone
        name="icon"
        control={control}
        label="Icon"
        multiple={false}
      />
    </div>
  );
};
