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

// items [{title, price, timing, availability}]

const ServicesForm = () => {
  const { selectedService } = useSelector((state: RootState) => state.services);
  const category = selectedService?.category._id;
  const subCategory = selectedService?.subCategory?._id;

  const router = useRouter();

  const formSchema = z.object({});
  const defaultValues = {
    hotel: "",
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
    // resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { control, handleSubmit, reset, watch } = form;

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
