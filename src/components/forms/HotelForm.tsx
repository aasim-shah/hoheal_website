"use client";

import FormDatePickerWithRange from "@/components/forms/fields/FormDatePickerWithRange";
import FormInput from "@/components/forms/fields/FormInput";
import FormSelect from "@/components/forms/fields/FormSelect";
import FormFileDropzone from "@/components/forms/fields/FormFileDropzone";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormDatePicker from "./fields/FormDatePicket";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import hotelSchema from "@/validations/hotel";

const HotelForm = () => {
  const router = useRouter();

  const defaultValues = {
    hotelName: "",
    numberOfRooms: "",
    hotelType: "",
    periodOfContract: undefined,
    businessLocation: "",
    officialPhoneNumber: "",
    businessEmail: "",
    password: "",
    servicesRequested: "",
    serviceStartDate: undefined,
    detail: "",
    logo: undefined,
    images: undefined,
    ownerName: "",
    ownerPhoneNumber: "",
    ownerEmail: "",
    registrationNumber: "",
    ownerPassword: "",
    confirmOwnerPassword: "",
    ownerProfilePicture: undefined,
  };

  const form = useForm<z.infer<typeof hotelSchema>>({
    resolver: zodResolver(hotelSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset, watch } = form;

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Hotel Details</h2>
          {/* Hotel Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormInput
              name="hotelName"
              control={control}
              label="Hotel Name"
              placeholder="Enter hotel name"
            />
            <FormSelect
              name="numberOfRooms"
              control={control}
              label="Number of Rooms"
              placeholder="Select number of rooms"
              options={[
                { value: "1-10", label: "1-10" },
                { value: "11-50", label: "11-50" },
                { value: "51-100", label: "51-100" },
              ]}
            />
            <FormInput
              name="hotelType"
              control={control}
              label="Hotel Type"
              placeholder="Enter hotel type"
            />
            <FormDatePickerWithRange
              name="periodOfContract"
              control={control}
              label="Period of Contract"
            />
            <FormInput
              name="businessLocation"
              control={control}
              label="Business Location"
              placeholder="Enter location"
            />
            <FormInput
              name="officialPhoneNumber"
              control={control}
              label="Official Phone Number"
              placeholder="Enter phone number"
            />
            <FormInput
              name="businessEmail"
              control={control}
              label="Business Email"
              placeholder="Enter email"
            />
            <FormInput
              name="password"
              control={control}
              label="Password"
              placeholder="Enter password"
              type="password"
            />
            <FormSelect
              name="servicesRequested"
              control={control}
              label="Services Requested"
              placeholder="Select services"
              options={[
                { value: "service1", label: "Service 1" },
                { value: "service2", label: "Service 2" },
                { value: "service3", label: "Service 3" },
              ]}
            />
            <FormDatePicker
              name="serviceStartDate"
              control={control}
              label="Service Start Date"
            />
            <FormInput
              name="detail"
              control={control}
              label="Details"
              placeholder="Enter details"
            />
          </div>

          {/* File Fields */}
          <div className="space-y-4">
            <FormFileDropzone
              name="logo"
              control={control}
              label="Logo"
              multiple={false}
            />
            <FormFileDropzone
              name="images"
              control={control}
              label="Add Pictures"
              multiple={true}
            />
          </div>
        </div>

        {/* Owner Details Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Owner Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormInput
              name="ownerName"
              control={control}
              label="Name"
              placeholder="Enter name"
            />
            <FormInput
              name="ownerPhoneNumber"
              control={control}
              label="Phone Number"
              placeholder="Enter phone number"
            />
            <FormInput
              name="ownerEmail"
              control={control}
              label="Personal Email"
              placeholder="Enter email"
            />
            <FormInput
              name="registrationNumber"
              control={control}
              label="Registration Number"
              placeholder="Enter registration number"
            />
            <FormInput
              name="ownerPassword"
              control={control}
              label="Password"
              placeholder="Enter password"
              type="password"
            />
            <FormInput
              name="confirmOwnerPassword"
              control={control}
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
            />
          </div>

          <div className="space-y-4">
            <FormFileDropzone
              name="ownerProfilePicture"
              control={control}
              label="Owner Profile Picture"
              multiple={false}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end w-full">
          <div className="flex justify-end md:w-1/2 w-full space-x-4">
            <Button
              className="w-full"
              type="button"
              variant="outline"
              onClick={() => router.push("/all-hotels")}
            >
              Cancel
            </Button>
            <Button className="w-full" type="submit" variant="signature">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default HotelForm;
