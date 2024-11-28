"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { H } from "@/components/ui/typography";
import { useLogin } from "@/hooks/useLogin";
import FormInput from "@/components/forms/fields/FormInput"; // Import the reusable input component

const LoginForm = () => {
  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");
  const formErrorsT = useTranslations("form.errors");
  const authT = useTranslations("auth");

  // Form validation schema
  const formSchema = z.object({
    email: z.string().email(formErrorsT("emailInvalid")),
    password: z.string().min(4, formErrorsT("passwordMin")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // React Query mutation hook for login
  const { mutate, status, isError, error } = useLogin();
  const loading = status === "pending";

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <div className="w-full max-w-[400px] mx-4">
      <div className="space-y-4">
        <H size="4xl" className="font-semibold">
          {authT("login")}
        </H>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              name="email"
              control={form.control}
              label={labelsT("email")}
              placeholder={placeholderT("email")}
            />
            <FormInput
              name="password"
              control={form.control}
              label={labelsT("password")}
              placeholder={placeholderT("password")}
              type="password"
            />
            <Button
              variant={"signature"}
              type="submit"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? authT("loading") : authT("login")}
            </Button>
            {isError && (
              <p className="text-red-500 mt-2">
                {error instanceof Error
                  ? error.message
                  : formErrorsT("loginFailed")}
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
