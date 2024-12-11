"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { camelCaseToNormalCase } from "@/utils/reuseableMethods";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import { toast } from "sonner";
import { baseUrl } from "@/constants";
import { format } from "date-fns";
import {
  createCategoryHotelAdmin,
  createCategorySuperAdmin,
  createSubCatHotelADmin,
  createSubCatSuperADmin,
  getCategoriesList,
} from "@/lib/api/admin";
import Image from "next/image";
import AddCategoryForm from "./addCategory";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AddSubCategoryModel from "./addSubCategory";
import appendFormData from "@/utils/appendFormData";
import { HotelsCombobox } from "@/components/HotelsCombobox";

export default function CategoriesTable() {
  const [addCatModal, setAddCatModal] = useState<boolean>(false);
  const [addSubCatModal, setAddSubCatModal] = useState<boolean>(false);

  const tabData = ["categories", "subcategories"];
  const [selectedTab, setSelectedTab] = useState(tabData[0] || "");

  const headers = ["title", "createdAt"];
  const headersSubCategories = ["icon", "title", "category"];

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const { data, loading, error, execute } = useApi(getCategoriesList);

  const userInfo = useSelector((state: RootState) => state.auth.userProfile);
  console.log({ userInfo });

  const userRole = userInfo?.role?.value;
  const { hotelId } = useSelector((state: RootState) => state.hotels);
  const hotel =
    userInfo?.role?.value === "hotelAdmin" ? userInfo?.hotel._id : hotelId;

  // const {
  //   data: createCatSuperAdminResponse,
  //   loading: createCatSuperAdminLoading,
  //   error: createCatSuperAdminError,
  //   execute: createCatSuperAdmin,
  // } = useApi(createCategorySuperAdmin);
  const {
    data: createCatHotelAdminResponse,
    loading: createCatHotelAdminLoading,
    error: createCatHotelAdminError,
    execute: createCatHotelAdmin,
  } = useApi(createCategoryHotelAdmin);

  // const {
  //   data: createSubCatSuperADminResponse,
  //   loading: createSubCatSuperADminLoading,
  //   error: createSubCatSuperADminError,
  //   execute: createSubCatSuperADminExecute,
  // } = useApi(createSubCatSuperADmin);
  const {
    data: createSubCatHotelADminResponse,
    loading: createSubCatHotelADminLoading,
    error: createSubCatHotelADminError,
    execute: createSubCatHotelADminExecute,
  } = useApi(createSubCatHotelADmin);

  useEffect(() => {
    if (userInfo?.role?.value === "hotelAdmin") {
      execute(userInfo?.hotel._id);
    } else {
      execute(hotelId);
    }
  }, [selectedTab, execute, hotelId]);

  useEffect(() => {
    if (data?.categories?.length) {
      const allCategories = data.categories.map((cat: any) => ({
        _id: cat._id,
        title: cat.title,
        createdAt: cat.createdAt,
      }));

      const allSubCategories = data.categories.flatMap((cat: any) =>
        cat.subCategories.map((subCat: any) => ({
          _id: subCat._id,
          title: subCat.title,
          image: subCat.image,
          category: subCat.category?.title,
        }))
      );

      setCategories(allCategories);
      setSubCategories(allSubCategories);
    }
  }, [data, selectedTab, execute, hotelId]);

  console.log({ categories, subCategories });
  const handleAddCategory = (data: any) => {
    const payload = {
      title: data.title,
      id: data.categoryId,
      hotel: hotel,
    };
    createCatHotelAdmin(payload);
  };
  const handleAddSubCategory = (data: any) => {
    console.log({ dataSubCat: data });
    const payload = {
      title: data.title,
      category: data.category,
      subcategory: data.subCategory,
      image: data.image,
      hotel: hotel,
    };
    const formData = new FormData();
    appendFormData(formData, payload);
    createSubCatHotelADminExecute(formData);
    // execute(hotel);
  };

  useEffect(() => {
    if (createCatHotelAdminResponse) {
      toast.success("Category added successfully!");
      setAddCatModal(false);
    }
  }, [createCatHotelAdminResponse]);

  useEffect(() => {
    if (createSubCatHotelADminResponse) {
      toast.success("Sub Category added successfully!");
      setAddSubCatModal(false);
    }
  }, [createSubCatHotelADminResponse]);

  return (
    <>
      <div className="flex  justify-end my-4">
        {userRole === "superAdmin" && <HotelsCombobox />}
      </div>
      <div className="my-5 flex flex-row justify-between items-center">
        <Tabs
          tabData={tabData}
          selectedTab={selectedTab}
          handleTabClick={setSelectedTab}
        />
        {selectedTab === "categories" && (
          <Button
            onClick={() => setAddCatModal(true)}
            variant={"signature"}
            className=""
            disabled={!hotel}
          >
            Add Category
          </Button>
        )}
        {selectedTab === "subcategories" && (
          <Button
            onClick={() => setAddSubCatModal(true)}
            variant={"signature"}
            className=""
            disabled={!hotel}
          >
            Add SubCategory
          </Button>
        )}
      </div>
      {/* </TopBar> */}
      <div className=" shadow-md  p-5 rounded-lg">
        {!data && error && (
          <div className="w-full text-red-500 flex justify-center items-center">
            Something went wrong
          </div>
        )}

        {selectedTab === "categories" ? (
          <>
            {" "}
            {categories && categories.length > 0 ? (
              <Table className="overflow-auto text-start h-full">
                <TableHeader>
                  <TableRow className="sticky top-0 z-40 bg-white capitalize hover:bg-muted">
                    {headers.map((header: string) => (
                      <TableHead key={header} className="font-bold">
                        {camelCaseToNormalCase(header)}
                      </TableHead>
                    ))}
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((doc: any) => (
                    <TableRow key={doc._id}>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell>
                        {doc.createdAt &&
                          format(new Date(doc.createdAt), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell className="flex gap-3 justify-center items-center">
                        <Button variant={"outline"}>Edit</Button>
                        <Button variant={"outline"} className="text-red-500">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center text-gray-500">
                No categories found. Please add one!
              </div>
            )}
            <AddCategoryForm
              role={userInfo?.role?.value}
              onSubmit={handleAddCategory}
              isOpen={addCatModal}
              setIsOpen={setAddCatModal}
            />
          </>
        ) : null}

        {selectedTab === "subcategories" ? (
          <>
            {subCategories && subCategories.length > 0 ? (
              <Table className="overflow-auto text-start h-full">
                <TableHeader>
                  <TableRow className="sticky top-0 z-40 bg-white capitalize hover:bg-muted">
                    {headersSubCategories.map((header: string) => (
                      <TableHead key={header} className="font-bold">
                        {camelCaseToNormalCase(header)}
                      </TableHead>
                    ))}
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subCategories.map((doc: any) => (
                    <TableRow key={doc._id}>
                      <TableCell>
                        <div className="w-12 h-12">
                          <Image
                            width={200}
                            height={200}
                            src={`${baseUrl}/${doc.image}`}
                            alt="icon"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell>{doc.category}</TableCell>
                      <TableCell className="text-center">
                        <Button variant={"outline"}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center text-gray-500">
                No subcategories found. Please add one!
              </div>
            )}
            <AddSubCategoryModel
              role={userInfo?.role?.value}
              hotel={hotel}
              onSubmit={handleAddSubCategory}
              isOpen={addSubCatModal}
              setIsOpen={setAddSubCatModal}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
