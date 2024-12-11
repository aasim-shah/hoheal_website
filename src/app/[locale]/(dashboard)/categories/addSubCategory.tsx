import React, { useEffect, useState } from "react";
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
import useApi from "@/hooks/useApi";
import { getCategoriesList } from "@/lib/api/admin";
import { toast } from "sonner";
import { set } from "date-fns";
import FormFileDropzone from "@/components/forms/fields/FormFileDropzone";
import appendFormData from "@/utils/appendFormData";

interface Category {
  _id: string;
  value: string;
  createdAt: string;
  title: string;
}

interface SubCategory {
  _id: string;
  title: string;
  categoryId: string;
  categoryValue: string;
}

interface AddCategoryFormProps {
  role: string;
  hotel: any;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSubmit: (values: {
    title?: string;
    category: string;
    subCategory?: string;
    image: any;
  }) => void;
}

const formSchema = z.object({
  title: z.string().optional(),
  category: z.string().min(1, { message: "Category should be selected." }),
  subCategory: z.string().optional(),
  image: z.instanceof(File).nullable().optional(),
});

export default function AddSubCategoryModel({
  role,
  isOpen,
  hotel,
  setIsOpen,
  onSubmit,
}: AddCategoryFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<
    SubCategory[]
  >([]);
  const formMethods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      image: "",
    },
  });

  const labelsT = useTranslations("form.labels");
  const placeholderT = useTranslations("form.placeholders");

  const { data, execute } = useApi(getCategoriesList);

  useEffect(() => {
    const fetchCategories = async () => {
      // if (role === "hotelAdmin" && hotel !== "") {
      //   const resp = await execute(hotel);
      //   setCategories(resp?.categories || []);
      // } else if (role === "superAdmin") {
      //   const resp = await execute();
      //   setCategories(resp?.categories || []);
      // }
      const resp = await execute(hotel);
      setCategories(resp?.categories || []);
    };
    fetchCategories();
  }, [role, hotel, execute]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      const resp = await execute();
      const allSubCategories = resp?.categories?.flatMap((cat: any) =>
        cat.subCategories.map((subCat: any) => ({
          _id: subCat._id,
          title: subCat.title,
          categoryId: cat._id,
          categoryValue: cat.value,
        }))
      );
      setSubCategories(allSubCategories || []);
      setFilteredSubCategories(allSubCategories || []);
    };
    fetchSubCategories();
  }, [execute]);

  const handleClose = () => {
    setIsOpen(false);
    formMethods.reset();
  };

  const handleCategoryChange = (categoryId: string) => {
    const selectedCategory = categories.find(
      (cat: Category) => cat._id === categoryId
    );

    if (!selectedCategory) {
      console.warn("Selected category not found");
      return;
    }

    formMethods.setValue("subCategory", "");

    const filteredSubCategories = subCategories.filter(
      (subCat: SubCategory) => subCat.categoryValue === selectedCategory.value
    );

    console.log({ subCategories, selectedCategory });
    setFilteredSubCategories(filteredSubCategories);
  };

  // const handleSubmit = (values: {
  //   title?: string;
  //   category: string;
  //   subCategory?: string;
  //   image: string;
  // }) => {
  //   onSubmit(values);
  //   console.log({ values });
  // };

  const handleSubmit = async (values: any) => {
    try {
      console.log({ values });

      onSubmit(values);
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ categories });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{labelsT("addCategory")}</DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* {role === "superAdmin" && (
              <>
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

                <FormField
                  control={formMethods.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labelsT("category")}</FormLabel>
                      <FormControl>
                        <select className="w-full py-2 rounded-md" {...field}>
                          <option value="" disabled>
                            {placeholderT("category")}
                          </option>
                          {categories &&
                            categories.map((category: any) => (
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

                <div className="space-y-4">
                  <FormFileDropzone
                    name="image"
                    control={formMethods.control}
                    label="Image"
                    multiple={false}
                  />
                </div>
              </>
            )} */}

            <>
              <FormField
                control={formMethods.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("category")}</FormLabel>
                    <FormControl>
                      <select
                        className="w-full py-2 rounded-md"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleCategoryChange(e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          {placeholderT("category")}
                        </option>
                        {categories &&
                          categories.map((category: any) => (
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

              <FormField
                control={formMethods.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labelsT("subcategory")}</FormLabel>
                    <FormControl>
                      <select
                        className="w-full py-2 rounded-md"
                        {...field}
                        disabled={!filteredSubCategories.length}
                      >
                        <option value="" disabled>
                          {labelsT("subcategory")}
                        </option>
                        {filteredSubCategories &&
                          filteredSubCategories.map((subCategory: any) => (
                            <option
                              key={subCategory._id}
                              value={subCategory._id}
                            >
                              {subCategory.title}
                            </option>
                          ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormFileDropzone
                  name="image"
                  control={formMethods.control}
                  label="Image"
                  multiple={false}
                />
              </div>
            </>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="secondary" onClick={handleClose}>
                {labelsT("cancel")}
              </Button>
              <Button type="submit">{labelsT("submit")}</Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
