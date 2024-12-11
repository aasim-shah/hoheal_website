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
import { useEffect, useState } from "react";
import { getCustomers, getPrecheckinData } from "@/lib/api/hotel";
import { baseUrl } from "@/constants";
import { formatDate } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ConfirmCheckIn from "./confirmCheckinModel";

export default function PrecheckInData() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDialog = (item: any) => {
    setSelectedItem(item);
    setIsOpen(true);
  };
  const headers = [
    "picture",
    "name",
    "email",
    "booking number",
    "arrival time",
    "arrival date",
  ];

  const { data, loading, error, execute } = useApi(getPrecheckinData);
  const { userProfile, role } = useSelector((state: RootState) => state.auth);
  console.log({ userProfile });

  const hotel = userProfile?.employee?.hotel || "6729b6b3b9dd6d75e6006b25";
  //   const hotel = "6752c104ecd410e33097ce93";

  useEffect(() => {
    execute(hotel);
  }, [execute]);

  console.log({ data });

  return (
    <>
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
                      src={`${baseUrl}/${doc.user.profilePicture}`}
                      w={50}
                      h={50}
                    />
                  </TableCell>
                  <TableCell>{doc.user.name}</TableCell>
                  <TableCell>{doc.user.email}</TableCell>
                  <TableCell>{doc.bookingNumber}</TableCell>
                  <TableCell>{doc.arrivalTime}</TableCell>
                  <TableCell>
                    {formatDate(doc.arrivalDate, "dd-MM-yyyy")}
                  </TableCell>

                  <TableCell className="text-center">
                    <Button
                      onClick={() => handleOpenDialog(doc)}
                      className="px-4 py-2  bg-black dark:bg-white dark:text-black text-white rounded"
                    >
                      Checkin
                    </Button>
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
      <ConfirmCheckIn
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedItem={selectedItem}
      />{" "}
    </>
  );
}
