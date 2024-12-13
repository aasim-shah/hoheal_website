import useApi from "@/hooks/useApi";
import { getRoomTypes } from "@/lib/api/formData";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import FormSelect from "./fields/FormSelect";
import MultiSelect from "./fields/MultiSelect";
import {
  CommonFields,
  ImageFields,
  RoomServicesCommonFields,
} from "./fields/SharedFields";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const RoomUpgradeForm = ({ control }: { control: any }) => {
  const features = [
    "Balcony",
    "Sea View",
    "Garden View",
    "Lobby",
    "Pool View",
    "Spa",
  ];

  const fields = useWatch({ control });
  // const { hotel } = fields || {};
  const { hotelId } = useSelector((state: RootState) => state.hotels);

  const { data, loading, error, execute } = useApi(getRoomTypes);

  const [roomTypes, setRoomTypes] = useState([]);

  console.log({ data, hotelId });
  useEffect(() => {
    if (hotelId) {
      execute(hotelId);
    }
  }, [execute, hotelId]);

  useEffect(() => {
    if (data) {
      if (data?.body) {
        setRoomTypes(data.body);
      }
    }
  }, [data]);

  return (
    <>
      <CommonFields control={control} />
      <MultiSelect fieldName="features" values={features} control={control} />
      <FormSelect
        control={control}
        name="roomType"
        placeholder="Room Type"
        label="Room Type"
        options={roomTypes}
        valueKey="_id"
        labelKey="title"
      />
      {/* <RoomServicesCommonFields control={control} /> */}
      <ImageFields control={control} />
    </>
  );
};

export default RoomUpgradeForm;
