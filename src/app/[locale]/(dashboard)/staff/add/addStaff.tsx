"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function AddStaff() {
  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      employeeId: "",
      department: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePicture: "",
    },
  });

  // function onSubmit(values) {
  //   // Do something with the form values.
  //   console.log(values); // Type-safe and validated
  // }

  return (
    <div className="w-10/12 mx-auto">
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col lg:flex-row  flex-wrap  my-10 items-center justify-between gap-5"
        >
          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="employeeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("employeeId")}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder={placeholderT("employeeId")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("phoneNumber")}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder={placeholderT("phoneNumber")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("department")}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder={placeholderT("department")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("email")}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder={placeholderT("email")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("address")}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder={placeholderT("address")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("password")}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder={placeholderT("password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("confirmPassword")}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder={placeholderT("confirmPassword")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-10/12  lg:w-5/12">
            <FormField
              control={form.control}
              name="profilePicture"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("profilePicture")}</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="bg-gray-100 border-none placeholder:text-gray-400 placeholder:text-sm  rounded-none"
                      placeholder={placeholderT("profilePicture")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-10/12  lg:w-5/12 ">
            <RadioGroup
              defaultValue="option-one"
              className="flex justify-evenly items-center mt-3 flex-row"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one">Staff Member</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two"> Department Manager</Label>
              </div>
            </RadioGroup>
          </div>
          {/* submit button from shadcn */}
          <Button
            type="submit"
            className="mt-4 w-4/12 mx-auto"
            variant="signature"
          >
            {labelsT("submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
