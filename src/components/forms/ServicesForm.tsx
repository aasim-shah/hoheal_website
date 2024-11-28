"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import ActivityForm from "./ActivityForm";
import RestaurantForm from "./RestaurantForm";
import RoomServiceForm from "./RoomServiceForm";
import RoomUpgradeForm from "./RoomUpgradeForm";
import TechnicalServiceForm from "./TechnicalServiceForm";
import { zodResolver } from "@hookform/resolvers/zod";

const ServicesForm = () => {
  const { selectedService } = useSelector((state: RootState) => state.services);
  const { userProfile } = useSelector((state: RootState) => state.auth);
  const hotelId = userProfile?.hotel?._id;
  const category = selectedService?.category._id;
  const subCategory = selectedService?.subCategory?._id;

  const router = useRouter();

  const formSchema = z.object({
    hotel: z.string().min(1, "Hotel ID is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    roomType: z.string(),
    features: z.array(z.string()),
    checklist: z.array(z.string()),
    menu: z.string().nullable(),
    menuTitle: z.string().nullable(),
    timing: z.array(z.string()),
    menuItems: z.array(z.string()),
    images: z.string().optional(),
    icon: z.string().nullable(),
    openingHours: z.array(z.string()),
    menuType: z.string(),
    reservation: z.string(),
    schedule: z.object({
      date: z.string(),
      from: z.string(),
      to: z.string(),
    }),
  });

  const defaultValues = {
    hotel: "", // default value for hotel
    title: "",
    description: "",
    roomType: "",
    features: [],
    checklist: [],
    menu: null,
    menuTitle: "",
    timing: [],
    menuItems: [],
    images: undefined,
    icon: null,
    openingHours: [],
    menuType: "",
    reservation: "",
    schedule: {
      date: "",
      from: "",
      to: "",
    },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { control, setValue, handleSubmit, reset, watch } = form;

  // Set the hotel field value
  hotelId && setValue("hotel", hotelId);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data: ", { ...data, category, subCategory });
  };

  const renderSubCategoryForm = () => {
    if (!selectedService?.subCategory) {
      return <p>Please select a subcategory first.</p>;
    }

    const subCategoryTitle = selectedService.subCategory.title.toLowerCase();
    switch (subCategoryTitle) {
      case "room upgrade":
        return <RoomUpgradeForm control={control} />;
      case "room service":
        return <RoomServiceForm control={control} />;
      case "technical services":
        return <TechnicalServiceForm control={control} />;
      case "buffet restaurants":
      case "ala carte restaurants":
      case "bars":
        return <RestaurantForm control={control} />;
      case "sports":
      case "kids":
      case "shows":
        return <ActivityForm control={control} />;
      default:
        return <p>Form for this subcategory is not implemented yet.</p>;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 items-start lg:grid-cols-2 gap-4">
          {renderSubCategoryForm()}
        </div>

        {selectedService && selectedService.subCategory && (
          <div className="flex justify-end w-full">
            <div className="flex justify-end md:w-1/2 w-full space-x-4">
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => router.push("/services")}
              >
                Cancel
              </Button>
              <Button className="w-full" type="submit" variant="signature">
                Save
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default ServicesForm;
