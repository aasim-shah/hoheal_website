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
import ShowDetails from "./showDetails";
import { getCustomers } from "@/lib/api/hotel";
import { baseUrl } from "@/constants";
import { formatDate } from "date-fns";

export default function CustomersTable() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const tabData = ["All", "checkin", "checkout"];
  const [selectedTab, setSelectedTab] = useState(tabData[0] || "");

  const handleOpenDialog = (item: any) => {
    setSelectedItem(item);
    setIsOpen(true);
  };
  const headers = [
    "picture",
    "name",
    "email",
    "hotel",
    "roomNumber",
    "checkInDate",
  ];

  const { data, loading, error, execute } = useApi(getCustomers);

  const hotel = "6729b6b3b9dd6d75e6006b25";

  useEffect(() => {
    execute(selectedTab, hotel);
  }, [selectedTab, execute]);

  console.log({ data });

  return (
    <>
      {/* <TopBar addButtonTitle="hotel"> */}
      <div className="my-5">
        <Tabs
          tabData={tabData}
          selectedTab={selectedTab}
          handleTabClick={setSelectedTab}
        />
      </div>
      {/* </TopBar> */}
      <div className=" shadow-md  p-5 rounded-lg">
        {!data && error && (
          <div className="w-full text-red-500 flex justify-center items-center">
            Something went wrong
          </div>
        )}

        {data && data.length > 0 ? (
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
              {data.map((doc: (typeof data)[0]) => (
                <TableRow key={doc._id}>
                  <TableCell>
                    <MyImage
                      classNames={"rounded-full"}
                      containerClasses={"w-12 rounded-full h-12"}
                      src={`${baseUrl}/${doc.profilePicture}`}
                      w={50}
                      h={50}
                    />
                  </TableCell>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.email}</TableCell>
                  <TableCell>{doc.checkInInfo?.hotel?.name}</TableCell>
                  <TableCell>{doc.checkInInfo?.roomNumber}</TableCell>
                  <TableCell>
                    {formatDate(doc.checkInInfo?.checkInDate, "dd-MM-yyyy")}
                  </TableCell>

                  <TableCell className="text-center">
                    {doc.status === "completed" ? (
                      <div className="flex   justify-center gap-3">
                        asdfasdfa
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleOpenDialog(doc)}
                        className="px-4 py-2  bg-black dark:bg-white dark:text-black text-white rounded"
                      >
                        View Details
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <H
            size="3xl"
            className="text-center text-muted  flex items-center justify-center"
          >
            No data found
          </H>
        )}
      </div>
      <ShowDetails
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedItem={selectedItem}
      />{" "}
    </>
  );
}
