"use client";

import FormDatePickerWithRange from "@/components/forms/fields/FormDatePickerWithRange";
import FormFileDropzone from "@/components/forms/fields/FormFileDropzone";
import FormInput from "@/components/forms/fields/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useApi from "@/hooks/useApi";
import { addHotel } from "@/lib/api/hotel";
import hotelSchema from "@/validations/hotel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import FormDatePicker from "./fields/FormDatePicket";
import appendFormData from "@/utils/appendFormData";

const HotelForm = () => {
  const router = useRouter();
  const { loading, data, error, execute } = useApi(addHotel);

  const defaultValues = {
    hotelName: "",
    rooms: 0,
    suits: 0,
    hotelType: 1,
    periodOfContract: undefined,
    address: "",
    city: "",
    country: "",
    officialPhoneNumber: "",
    businessEmail: "",
    servicesRequested: 0,
    serviceStartDate: undefined,
    description: "",
    logo: null,
    images: [],
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

  const { control, handleSubmit, reset } = form;

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      appendFormData(formData, values);
      await execute(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      if (data.success) {
        toast.success(data.body || "Hotel added successfully.");
        reset();
        router.push("/all-hotels");
      } else {
        toast.error(data.error || "An error occurred while adding the hotel.");
      }
    }

    if (error) {
      toast.error(error || "Something went wrong. Please try again.");
    }
  }, [data, error, reset, router]);

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
            <FormInput
              name="rooms"
              control={control}
              label="Number of Rooms"
              placeholder="Select number of rooms"
              type="number"
            />
            <FormInput
              name="suits"
              control={control}
              label="Number of Suits"
              placeholder="Select number of Suits"
              type="number"
            />
            <FormInput
              name="hotelType"
              control={control}
              label="Hotel Type"
              placeholder="Enter hotel type"
              type="number"
            />
            <FormDatePickerWithRange
              name="periodOfContract"
              control={control}
              label="Period of Contract"
            />
            <FormInput
              name="address"
              control={control}
              label="Business Address"
              placeholder="Enter Address"
            />
            <FormInput
              name="city"
              control={control}
              label="Business City"
              placeholder="Enter City"
            />
            <FormInput
              name="country"
              control={control}
              label="Business Country"
              placeholder="Enter Country"
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
              name="servicesRequested"
              control={control}
              label="Services Requested"
              placeholder="Enter number of services requested"
              type="number"
            />
            <FormDatePicker
              name="serviceStartDate"
              control={control}
              label="Service Start Date"
            />
            <FormInput
              name="description"
              control={control}
              label="Description"
              placeholder="Enter description"
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
            <Button
              className="w-full"
              type="submit"
              variant="signature"
              disabled={loading}
            >
              {loading ? "Adding Hotel..." : "Add Hotel"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default HotelForm;
