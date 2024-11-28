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

export default function CheckIn() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idCardNumber: "",
      name: "",
      reservationNumber: "",
      roomNumber: "",
      date: "",

      roomType: "",
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
            <div className="w-full lg:w-5/12">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("name")}</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                        placeholder={placeholderT("name")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                        className="bg-gray-100 dark:bg-gray-800 border-none text-gray-900 text-sm rounded-none w-full p-2"
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
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("date")}</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                        placeholder={placeholderT("date")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full lg:w-5/12">
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
            </div>
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
