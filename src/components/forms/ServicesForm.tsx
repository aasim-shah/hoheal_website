"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import useApi from "@/hooks/useApi";
import { addRoomService, addService } from "@/lib/api/service";
import appendFormData from "@/utils/appendFormData";
import { useEffect } from "react";
import { toast } from "sonner";
import ActivityForm from "./ActivityForm";
import RestaurantForm from "./RestaurantForm";
import RoomServiceForm from "./RoomServiceForm";
import RoomUpgradeForm from "./RoomUpgradeForm";
import TechnicalServiceForm from "./TechnicalServiceForm";

const ServicesForm = () => {
  const { hotelId } = useSelector((state: RootState) => state.hotels);
  const { selectedService } = useSelector((state: RootState) => state.services);
  const { userProfile } = useSelector((state: RootState) => state.auth);
  // const hotelId = userProfile?.hotel?._id;

  const { title, category, subCategory } = selectedService || {};

  const serviceType = title === "Room Service" ? addRoomService : addService;
  const { data, loading, error, execute } = useApi(serviceType);

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
    paid: z.boolean(),
    price: z.number(),
    completionTime: z.number(),
    menuItems: z.array(z.string()),
    images: z.array(z.instanceof(File)).optional(),
    icon: z.instanceof(File).nullable().optional(),
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
    title: "",
    description: "",
    roomType: "",
    features: [],
    checklist: [],
    menu: null,
    menuTitle: "",
    timing: [],
    paid: false,
    price: 0,
    completionTime: 0,
    menuItems: [],
    images: [],
    icon: null,
    openingHours: [],
    menuType: "",
    reservation: false,
    schedule: {
      date: "",
      from: "",
      to: "",
    },
  };

  const form = useForm({
    defaultValues,
  });

  const { control, setValue, handleSubmit, reset, watch } = form;

  const onSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      appendFormData(formData, values);
      formData.append("hotel", hotelId || "");
      formData.append("category", category?._id || "");
      formData.append("subCategory", subCategory?._id || "");
      await execute(formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      if (data.success) {
        toast.success(data.body || `Service added successfully!`);
        reset();
        router.push("/services");
      } else {
        toast.error(data.error || "An error occurred while adding the hotel.");
      }
    }

    if (error) {
      toast.error(error || "Something went wrong. Please try again.");
    }
  }, [data, error, reset, router]);

  // hotelId && setValue("hotel", hotelId);

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
              <Button
                className="w-full"
                type="submit"
                variant="signature"
                disabled={loading}
              >
                {loading ? "Adding Service..." : "Add Service"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default ServicesForm;
