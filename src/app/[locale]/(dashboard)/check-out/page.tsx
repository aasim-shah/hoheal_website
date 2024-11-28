"use client";

import { useState } from "react";
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

const formSchema = z.object({
  idCardNumber: z
    .string()
    .min(2, { message: "ID card number must be at least 2 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  roomNumber: z.string(),
  roomType: z.string().min(1, { message: "Please select a room type." }),
});

export default function CheckOut() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idCardNumber: "",
      name: "",

      roomNumber: "",
    },
  });

  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  return (
    <div className="w-10/12 mx-auto">
      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border rounded-lg p-4"
        >
          <div className="flex flex-wrap gap-5 justify-evenly">
            {/* ID Card Number */}
            <div className="w-full lg:w-5/12">
              <FormField
                control={form.control}
                name="idCardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("idCardNumber")}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                        placeholder={placeholderT("idCardNumber")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Room Number */}
            <div className="w-full lg:w-5/12">
              <FormField
                control={form.control}
                name="roomNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("roomNumber")}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                        placeholder={placeholderT("roomNumber")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-44 mx-auto">
            <Button type="submit" className="mt-4 w-full">
              {labelsT("checkOut")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
