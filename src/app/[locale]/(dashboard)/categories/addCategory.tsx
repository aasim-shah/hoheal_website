import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RootState } from "@/store/store";
import useApi from "@/hooks/useApi";
import { getCategoriesList } from "@/lib/api/admin";
import { toast } from "sonner";

interface AddCategoryFormProps {
  role: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSubmit: (values: { title: string }) => void;
}

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
});

export default function AddCategoryForm({
  role,
  isOpen,
  setIsOpen,
  onSubmit,
}: AddCategoryFormProps) {
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");

  function handleSubmit(values: { title: string }) {
    onSubmit(values);
    formMethods.reset(); // Reset the form after submission
  }

  const handleClose = () => {
    setIsOpen(false);
    formMethods.reset(); // Reset the form on close
  };

  const { data, loading, error, execute } = useApi(getCategoriesList);

  useEffect(() => {
    execute();
  }, [execute]);

  const categories = data?.categories || [];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {role === "superAdmin" && (
              <FormField
                control={formMethods.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("title")}</FormLabel>
                    <FormControl>
                      <input
                        type="text"
                        className="w-full p-2 rounded-md"
                        placeholder={placeholderT("title")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {role === "hotelAdmin" && (
              <FormField
                control={formMethods.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("title")}</FormLabel>
                    <FormControl>
                      <select className="w-full py-2 rounde-md" {...field}>
                        <option value="" disabled>
                          Select
                        </option>
                        {categories.map((category: any) => (
                          <option key={category._id} value={category._id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">Add Category</Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
