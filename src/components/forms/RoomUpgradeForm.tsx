import FormSelect from "./fields/FormSelect";
import MultiSelect from "./fields/MultiSelect";
import { CommonFields, ImageFields } from "./fields/SharedFields";

const RoomUpgradeForm = ({ control }: { control: any }) => {
  const features = [
    "Balcony",
    "Sea View",
    "Garden View",
    "Lobby",
    "Pool View",
    "Spa",
  ];

  const options = [
    { value: "room", label: "Room" },
    { value: "suite", label: "Suite" },
  ];

  return (
    <>
      <CommonFields control={control} />
      <MultiSelect fieldName="features" values={features} control={control} />
      <FormSelect
        control={control}
        name="roomType"
        placeholder="Room Type"
        label="Room Type"
        options={options}
      />
      <ImageFields control={control} />
    </>
  );
};

export default RoomUpgradeForm;
