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
import { DatePicker } from "@/components/DatePicker";

const formSchema = z.object({
  hotelName: z
    .string()
    .min(2, { message: "Hotel name must be at least 2 characters." }),
  address: z
    .string()
    .min(2, { message: "address must be at least 2 characters." }),
  ownerName: z
    .string()
    .min(2, { message: "Owner name must be at least 2 characters." }),
  hotelEmail: z.string().email({ message: "Enter a valid email." }),
  ownerEmail: z.string().email({ message: "Enter a valid email." }),
  hotelPhoneNumber: z
    .string()
    .min(10, { message: "Enter a valid phone number." }),
  ownerPhoneNumber: z
    .string()
    .min(10, { message: "Enter a valid phone number." }),
  numberOfRooms: z.string().min(1, { message: "Enter the number of rooms." }),
  hotelType: z.string().min(2, { message: "Hotel type is required." }),
  country: z.string().min(2, { message: "Please select a country." }),
  city: z.string().min(2, { message: "Please select a city." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  periodOfContract: z
    .string()
    .min(1, { message: "Period of contract is required." }),
  servicesRequested: z.string().min(2, { message: "Services are required." }),
  startingDate: z.string().min(2, { message: "Starting date is required." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
});

export default function AddHotel() {
  const [step, setStep] = useState(1); // Track current step
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hotelName: "",
      hotelPhoneNumber: "",
      hotelEmail: "",
      numberOfRooms: "",
      hotelType: "",
      address: "",
      periodOfContract: "",
      servicesRequested: "",
      startingDate: "",
      description: "",
      country: "",
      city: "",
      // logo: "",
      // images: "",
      // businessDocs: "",
      ownerName: "",
      ownerEmail: "",
      ownerPhoneNumber: "",
      // profilePicture: "",
      password: "",
      confirmPassword: "",
    },
  });

  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");
  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  return (
    <div className="w-10/12 mx-auto">
      {/* Step Tracker */}
      <div className="flex items-center justify-center mb-6 space-x-4">
        <button onClick={handleBack} className="flex flex-col items-center">
          <span
            className={`h-8 flex justify-center items-center text-white w-8 rounded-full  ${
              step === 1
                ? "bg-black dark:bg-white dark:text-black"
                : "bg-gray-400"
            }`}
          >
            1
          </span>
          <span
            className={`text-sm mt-1 ${
              step === 1 ? "text-black dark:text-white " : "text-gray-400"
            }`}
          >
            Hotel Info
          </span>
        </button>
        <div className="w-10 h-1 bg-gray-300 rounded-lg" />
        <button onClick={handleNext} className="flex flex-col items-center">
          <span
            className={`h-8 flex justify-center items-center text-white w-8 rounded-full  ${
              step === 2
                ? "bg-black dark:text-black dark:bg-white"
                : "bg-gray-400 "
            }`}
          >
            2
          </span>
          <span
            className={`text-sm mt-1 ${
              step === 2 ? "text-black dark:text-white " : "text-gray-400"
            }`}
          >
            User Info
          </span>
        </button>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 border rounded-lg p-4"
        >
          {step === 1 && (
            <>
              <div className="flex flex-wrap gap-5 justify-evenly">
                <div className="w-full lg:w-5/12">
                  <FormField
                    control={form.control}
                    name="hotelName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("hotelName")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("hotelName")}
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
                    name="hotelEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("hotelEmail")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("hotelEmail")}
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
                    name="hotelPhoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("phoneNumber")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("phoneNumber")}
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
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("country")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("country")}
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
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("city")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("city")}
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
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("address")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("address")}
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
                    name="numberOfRooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("numberOfRooms")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={labelsT("numberOfRooms")}
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
                    name="hotelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("hotelType")}</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-none placeholder:text-gray-400 placeholder:text-sm text-sm p-2 focus:ring-2 focus:ring-black"
                          >
                            <option value="" disabled>
                              {placeholderT("hotelType")}
                            </option>
                            <option value="budget">2 Stars</option>
                            <option value="luxury">3 Stars</option>
                            <option value="business">4 Stars</option>
                            <option value="resort">5 Stars</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full lg:w-5/12">
                  {/* <FormField
                    control={form.control}
                    name="periodOfContract"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("periodOfContract")}</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <span className="text-sm">{labelsT("periodOfContract")}</span>
                  <DatePicker date={selectedDate} setDate={setSelectedDate} />
                </div>
                <div className="w-full lg:w-5/12">
                  <FormField
                    control={form.control}
                    name="servicesRequested"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("servicesRequested")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={labelsT("servicesRequested")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full lg:w-5/12">
                  {/* <FormField
                    control={form.control}
                    name="startingDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("startingDate")}</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                  <span className="text-sm">{labelsT("startingDate")}</span>
                  <DatePicker date={selectedDate} setDate={setSelectedDate} />
                </div>

                <div className="w-full lg:w-5/12">
                  <FormField
                    control={form.control}
                    name="businessDocs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("businessDocs")}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
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
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("logo")}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
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
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("images")}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-11/12 mx-auto">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labelsT("description")}</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={4}
                          className="w-full bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm rounded-none text-sm p-3 focus:ring-2 focus:ring-black resize-none"
                          placeholder={placeholderT("description")}
                        ></textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-44 mx-auto">
                <Button
                  type="button"
                  onClick={handleNext}
                  className="mt-4 w-full "
                >
                  Next
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-wrap justify-evenly gap-5">
                <div className="w-full  lg:w-5/12">
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("fullName")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("fullName")}
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
                    name="ownerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("email")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("email")}
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
                    name="ownerPhoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("phoneNumber")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("phoneNumber")}
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
                    name="profilePicture"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("profilePicture")}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("password")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("password")}
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
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{labelsT("confirmPassword")}</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-gray-100 dark:bg-gray-800 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                            placeholder={placeholderT("confirmPassword")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* <div className="w-full flex justify-between mt-4">
                <Button type="submit">Submit</Button>
                </div> */}
              </div>
              <div className="w-44 mx-auto">
                <Button type="submit" className="mt-4 w-full ">
                  {labelsT("submit")}
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </div>
  );
}
