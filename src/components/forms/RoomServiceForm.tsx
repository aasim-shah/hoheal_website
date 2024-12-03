"use client";

import { useWatch } from "react-hook-form";
import FormFileDropzone from "./fields/FormFileDropzone";
import FormSelect from "./fields/FormSelect";
import MealTiming from "./fields/MealTiming";
import MenuItems from "./fields/MenuItems";
import { CommonFields, RoomServicesCommonFields } from "./fields/SharedFields";

const RoomServiceForm = ({ control }: { control: any }) => {
  const { menuTitle } = useWatch({ control });

  return (
    <>
      <CommonFields control={control} />
      <FormSelect
        name="menuTitle"
        control={control}
        label="Menu Title"
        placeholder="Select menu title"
        options={[
          { value: "snacks", label: "Snacks" },
          { value: "meals", label: "Meals" },
        ]}
        valueKey="value"
        labelKey="label"
      />
      {menuTitle === "meals" && <MealTiming control={control} />}
      {menuTitle && <MenuItems control={control} />}
      <RoomServicesCommonFields control={control} />
      {/* <ImageFields control={control} /> */}
      <div className="lg:col-span-2">
        <FormFileDropzone
          name="icon"
          control={control}
          label="Icon"
          multiple={false}
        />
      </div>
    </>
  );
};

export default RoomServiceForm;
