"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useApi from "@/hooks/useApi";
import { checkIn } from "@/lib/api/hotel";
import { toast } from "sonner";
import FormInput from "@/components/forms/fields/FormInput";

const formSchema = z.object({
  idCardNumber: z
    .string()
    .min(2, { message: "ID card number must be at least 2 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().min(2, { message: "Email must be at least 2 characters." }),
  roomNumber: z.string(),
  roomType: z.string().min(1, { message: "Please select a room type." }),
  checkInDate: z
    .string()
    .min(1, { message: "Please select  a check in date." }),
});

export default function CheckIn() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idCardNumber: "",
      name: "",
      email: "",
      reservationNumber: "",
      roomNumber: "",
      hotel: "",
      checkInDate: "",
      roomType: "",
    },
  });

  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");

  const { data, loading, error, execute } = useApi(checkIn);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      hotel: "6729b6b3b9dd6d75e6006b25",
    };
    execute(payload);
  }

  useEffect(() => {
    if (data && data.success) {
      toast.success("User CheckedIn !");
    }
  }, [data]);
  return (
    <div className="w-10/12 mx-auto">
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border rounded-lg p-4"
        >
          <div className="flex flex-wrap gap-5 justify-evenly">
            <div className="w-full lg:w-5/12">
              <FormInput
                name="name"
                control={form.control}
                label={labelsT("name")}
                placeholder={placeholderT("name")}
              />
            </div>

            <div className="w-full lg:w-5/12">
              <FormInput
                name="email"
                control={form.control}
                label={labelsT("email")}
                placeholder={placeholderT("email")}
              />
            </div>

            {/* ID Card Number */}
            <div className="w-full lg:w-5/12">
              <FormInput
                name="idCardNumber"
                control={form.control}
                label={labelsT("idCardNumber")}
                placeholder={placeholderT("idCardNumber")}
              />
            </div>

            {/* Room Number */}
            <div className="w-full lg:w-5/12">
              <FormInput
                type="number"
                name="roomNumber"
                control={form.control}
                label={labelsT("roomNumber")}
                placeholder={placeholderT("roomNumber")}
              />
            </div>

            {/* Room Type Dropdown */}
            <div className="w-full lg:w-5/12">
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("roomType")}</FormLabel>
                    <FormControl>
                      <select
                        className={`bg-secondary/50 w-full py-3 px-3 rounded-md ${
                          error ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                        {...field}
                      >
                        <option value="" disabled>
                          {placeholderT("roomType")}
                        </option>
                        <option value="single">Room</option>
                        <option value="deluxe">Suite</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full lg:w-5/12">
              <FormInput
                name="checkInDate"
                control={form.control}
                type="date"
                label={labelsT("checkIn")}
                placeholder={placeholderT("checkIn")}
              />
            </div>
            {/* <div className="w-full lg:w-5/12">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("attachments")}</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                        placeholder={placeholderT("date")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </div>

          {/* Submit Button */}
          <div className="w-44 mx-auto">
            <Button type="submit" className="mt-4 w-full">
              {labelsT("checkIn")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
