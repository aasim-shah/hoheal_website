import { ComboboxDemo } from "@/components/Combobox";
import FormFileDropzone from "./FormFileDropzone";
import FormInput from "./FormInput";
import { useSelector } from "react-redux";

export const CommonFields = ({ control }: { control: any }) => {
  const { role } = useSelector((state: any) => state.auth);
  return (
    <>
      {role === "superAdmin" && (
        <div className="col-span-2">
          <ComboboxDemo />
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
