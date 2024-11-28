"use client";

import { useWatch } from "react-hook-form";
import FormSelect from "./fields/FormSelect";
import MealTiming from "./fields/MealTiming";
import MenuItems from "./fields/MenuItems";
import { CommonFields, ImageFields } from "./fields/SharedFields";

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
      />
      {menuTitle === "meals" && <MealTiming control={control} />}
      {menuTitle && <MenuItems control={control} />}
      <ImageFields control={control} />
    </>
  );
};

export default RoomServiceForm;
