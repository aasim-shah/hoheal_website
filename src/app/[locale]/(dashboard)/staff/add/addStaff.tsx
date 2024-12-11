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
import FormInput from "@/components/forms/fields/FormInput";
import useApi from "@/hooks/useApi";
import { addStaff } from "@/lib/api/department";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FormFileDropzone from "@/components/forms/fields/FormFileDropzone";
import { profile } from "console";
import { useSelector } from "react-redux";
import { HotelsCombobox } from "@/components/HotelsCombobox";
import { RootState } from "@/store/store";
import { DepartmentsDropdown } from "@/components/forms/fields/DepartmentsDropdown";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z
      .string()
      .email({ message: "Email must be a valid email address." })
      .min(2, { message: "Email must be at least 2 characters." }),
    employeeId: z
      .string()
      .min(2, { message: "Employee ID must be at least 2 characters." }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters." }),
    role: z.string().min(1, { message: "Please select a role." }),
    phoneNumber: z.string().min(9, { message: "Phone Number must be valid." }),
    password: z
      .string()
      .min(4, { message: "Password must be at least 4 characters long." }),
    confirmPassword: z.string().min(4, {
      message: "Confirm Password must be at least 4 characters long.",
    }),
    profilePicture: z.instanceof(File).nullable().optional(),
    department: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

export default function AddStaff() {
  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const router = useRouter();
  const [roleOptions, setRoleOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const { role, userProfile } = useSelector((state: RootState) => state.auth);

  console.log({ userProfile });
  // const department = "6729bd3e5a9f963581db7890";
  const department =
    role && role === "serviceManager"
      ? userProfile?.employee?.department || selectedDepartment
      : selectedDepartment;

  interface DepartmentUIProps {
    form: any;
    labelsT: (key: string) => string;
    placeholderT: (key: string) => string;
  }
  const DepartmentUI: React.FC<DepartmentUIProps> = ({
    form,
    labelsT,
    placeholderT,
  }) => {
    if (role === "hotelAdmin") {
      return (
        <div className="lg:col-span-2">
          <DepartmentsDropdown
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            hotel={userProfile?.hotel?._id}
          />
        </div>
      );
    } else {
      return (
        <div className="lg:col-span-2">
          <FormInput
            name="department"
            disabled={true}
            control={form.control}
            label={labelsT("department")}
            placeholder={placeholderT("department")}
          />
        </div>
      );
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      employeeId: "",
      address: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      department: department,
      profilePicture: null,
    },
  });

  const { data, loading, error, execute } = useApi(addStaff);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const staffData = {
      ...values,
      department: department,
      hotel: userProfile?.hotel?._id,
      profilePicture:
        values.profilePicture instanceof File ? values.profilePicture : null,
    };

    execute(staffData);
  }

  useEffect(() => {
    if (data && data.success) {
      toast.success("Staff added !");
      router.back();
    }
  }, [data]);

  useEffect(() => {
    const currentRole = userProfile?.role?.value;
    if (currentRole === "hotelAdmin") {
      setRoleOptions([
        { value: "staff", label: "Staff Member" },
        { value: "serviceManager", label: "Department Manager" },
        { value: "reception", label: "Reception" },
      ]);
    } else if (currentRole === "serviceManager") {
      setRoleOptions([{ value: "staff", label: "Staff Member" }]);
    } else {
      setRoleOptions([]);
    }
  }, [form.watch("role")]);

  return (
    <div className="w-10/12 mx-auto">
      <div className="flex flex-row justify-e">
        {role === "superAdmin" && (
          <div className="lg:col-span-2">
            {/* <HotelsCombobox /> */}
            Hello
          </div>
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row flex-wrap my-10 items-center justify-between gap-5"
        >
          <div className="w-10/12 lg:w-5/12">
            <FormInput
              name="name"
              control={form.control}
              label={labelsT("name")}
              placeholder={placeholderT("name")}
            />
          </div>
          <div className="w-10/12 lg:w-5/12">
            <FormInput
              name="employeeId"
              control={form.control}
              label={labelsT("employeeId")}
              placeholder={placeholderT("employeeId")}
            />
          </div>
          <div className="w-10/12 lg:w-5/12">
            <FormInput
              name="phoneNumber"
              control={form.control}
              label={labelsT("phoneNumber")}
              placeholder={placeholderT("phoneNumber")}
            />
          </div>
          <div className="w-10/12 lg:w-5/12">
            {/* <FormInput
              name="department"
              disabled={true}
              control={form.control}
              label={labelsT("department")}
              placeholder={placeholderT("department")}
            /> */}
            {/* <DepartmentsDropdown hotel={"6729bd3e5a9f963581db7890"} /> */}
            <DepartmentUI
              form={form}
              labelsT={labelsT}
              placeholderT={placeholderT}
            />
          </div>
          <div className="w-10/12 lg:w-5/12">
            <FormInput
              name="email"
              control={form.control}
              label={labelsT("email")}
              placeholder={placeholderT("email")}
            />
          </div>
          <div className="w-10/12 lg:w-5/12">
            <FormInput
              name="address"
              control={form.control}
              label={labelsT("address")}
              placeholder={placeholderT("address")}
            />
          </div>
          <div className="w-10/12 lg:w-5/12">
            <FormInput
              type="password"
              name="password"
              control={form.control}
              label={labelsT("password")}
              placeholder={placeholderT("password")}
            />
          </div>
          <div className="w-10/12 lg:w-5/12">
            <FormInput
              type="password"
              name="confirmPassword"
              control={form.control}
              label={labelsT("confirmPassword")}
              placeholder={placeholderT("confirmPassword")}
            />
          </div>
          <div className="w-10/12 lg:w-5/12">
            <FormFileDropzone
              name="profilePicture"
              control={form.control}
              label="profilePicture"
              multiple={false}
            />
          </div>
          {/* <div className="w-10/12 lg:w-5/12">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("role")}</FormLabel>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="flex justify-evenly items-center mt-3 flex-row"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="staff" id="staffMember" />
                      <Label htmlFor="staffMember">Staff Member</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="serviceManager"
                        id="serviceManager"
                      />
                      <Label htmlFor="serviceManager">Department Manager</Label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}
          <div className="w-10/12 lg:w-5/12">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{labelsT("role")}</FormLabel>
                  <RadioGroup
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    className="flex justify-evenly items-center mt-3 flex-row"
                  >
                    {roleOptions.map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={option.value}
                          id={option.value}
                        />
                        <Label htmlFor={option.value}>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="mt-4 w-10/12 mx-auto"
            variant="signature"
          >
            {labelsT("submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
