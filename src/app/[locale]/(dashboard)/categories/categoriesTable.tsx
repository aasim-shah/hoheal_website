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
import { H } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import MyImage from "@/components/MyImage";
import useApi from "@/hooks/useApi";
import { markAsAcceptedReject } from "@/lib/api/department";
import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import Tabs from "@/components/Tabs";
import { toast } from "sonner";
import { getCustomers } from "@/lib/api/hotel";
import { baseUrl } from "@/constants";
import { format, formatDate } from "date-fns";
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
  const {
    data: createCatSuperAdminResponse,
    loading: createCatSuperAdminLoading,
    error: createCatSuperAdminError,
    execute: createCatSuperAdmin,
  } = useApi(createCategorySuperAdmin);
  const {
    data: createCatHotelAdminResponse,
    loading: createCatHotelAdminLoading,
    error: createCatHotelAdminError,
    execute: createCatHotelAdmin,
  } = useApi(createCategoryHotelAdmin);

  const {
    data: createSubCatSuperADminResponse,
    loading: createSubCatSuperADminLoading,
    error: createSubCatSuperADminError,
    execute: createSubCatSuperADminExecute,
  } = useApi(createSubCatSuperADmin);
  const {
    data: createSubCatHotelADminResponse,
    loading: createSubCatHotelADminLoading,
    error: createSubCatHotelADminError,
    execute: createSubCatHotelADminExecute,
  } = useApi(createSubCatHotelADmin);

  const userInfo = useSelector((state: RootState) => state.auth.userProfile);

  useEffect(() => {
    if (userInfo?.role?.value === "hotelAdmin") {
      execute(userInfo?.hotel._id);
    } else {
      execute();
    }
  }, [selectedTab]);

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
  }, [
    data,
    selectedTab,
    createCatHotelAdminResponse,
    createCatSuperAdminResponse,
  ]);

  const handleAddCategory = (data: any) => {
    if (userInfo?.role?.value === "hotelAdmin") {
      const payload = {
        title: data.title,
        id: data.categoryId,
        hotel:
          userInfo?.role?.value === "hotelAdmin" ? userInfo?.hotel._id : null,
      };
      createCatHotelAdmin(payload);
    } else {
      createCatSuperAdmin({ title: data.title });
    }
  };
  const handleAddSubCategory = (data: any) => {
    console.log({ dataSubCat: data });
    if (userInfo?.role?.value === "hotelAdmin") {
      const payload = {
        title: data.title,
        category: data.category,
        subcategory: data.subCategory,
        hotel:
          userInfo?.role?.value === "hotelAdmin" ? userInfo?.hotel._id : null,
      };
      createSubCatHotelADminExecute(payload);
    } else {
      createSubCatSuperADminExecute({
        title: data.title,
        category: data.category,
      });
    }
  };

  useEffect(() => {
    if (createCatHotelAdminResponse || createCatSuperAdminResponse) {
      toast.success("Category added successfully!");
      setAddCatModal(false);
    }
  }, [createCatHotelAdminResponse, createCatSuperAdminResponse]);

  return (
    <>
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
          >
            Add Category
          </Button>
        )}
        {selectedTab === "subcategories" && (
          <Button
            onClick={() => setAddSubCatModal(true)}
            variant={"signature"}
            className=""
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

        {selectedTab === "categories" && categories && categories.length > 0 ? (
          <>
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
                {categories.map((doc: (typeof data)[0]) => (
                  <TableRow key={doc._id}>
                    <TableCell>{doc.title}</TableCell>
                    <TableCell>
                      {(doc.createdAt && format(doc.createdAt, "dd/MM/yyyy")) ||
                        ""}
                    </TableCell>
                    <TableCell className="flex gap-3 justify-center items-center">
                      <Button variant={"outline"} className="">
                        Edit
                      </Button>
                      <Button variant={"outline"} className="text-red-500">
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AddCategoryForm
              role={userInfo?.role?.value}
              onSubmit={handleAddCategory}
              isOpen={addCatModal}
              setIsOpen={setAddCatModal}
            />
          </>
        ) : (
          ""
        )}

        {selectedTab === "subcategories" &&
        subCategories &&
        subCategories.length > 0 ? (
          <>
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
                {subCategories.map((doc: (typeof data)[0]) => (
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
                      <Button variant={"outline"} className="">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <AddSubCategoryModel
              role={userInfo?.role?.value}
              hotel={userInfo?.hotel?._id}
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
