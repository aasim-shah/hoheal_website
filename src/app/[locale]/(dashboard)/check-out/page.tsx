"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

import { Form } from "@/components/ui/form";
import { checkOut } from "@/lib/api/hotel";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";
import FormInput from "@/components/forms/fields/FormInput";

// Define the validation schema
const formSchema = z.object({
  idCardNumber: z
    .string()
    .min(10, { message: "ID card number must be at least 2 characters." }),
  email: z.string().min(2, { message: "Email must be at least 2 characters." }),
});

export default function CheckOut() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idCardNumber: "",
      email: "",
    },
  });

  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");

  const { data, loading, error, execute } = useApi(checkOut);

  function onSubmit(values: z.infer<typeof formSchema>) {
    execute({
      idCardNumber: values.idCardNumber,
      email: values.email,
    });
  }

  useEffect(() => {
    if (data && data.success) {
      toast.success("User Checkout !");
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
            {/* Name Field */}
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
