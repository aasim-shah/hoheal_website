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
import { IoMdTrash } from "react-icons/io";
import { useState, useEffect } from "react";
import useApi from "@/hooks/useApi";
import { getStaffList } from "@/lib/api/department";
import ViewStaff from "./viewStaff";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function StaffTable() {
  const headers = ["Profile", "Name", "Email", "Role"];

  const { data, loading, error, execute } = useApi(getStaffList);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const { role, userProfile } = useSelector((state: RootState) => state.auth);
  console.log({ userProfile });

  useEffect(() => {
    if (role === "superAdmin" && userProfile?.role?.value === "superAdmin") {
      execute("");
      console.log("sueper");
    }
    if (
      role === "serviceManager" &&
      userProfile?.role?.value === "serviceManager"
    ) {
      console.log("service");

      execute(userProfile?.employee?.department);
    }
    // if (role === "hotelManager" && userProfile?.role.value === "hotelManager") {
    //   execute(userProfile?.hotel._id);
    //   console.log("hotel");
    // }
  }, []);

  console.log({ data });

  const handleView = (staff: any) => {
    console.log({ staff });
    setSelectedStaff(staff);
    setModalOpen(true);
  };

  // const handleUpdate = (updatedStaff: any) => {
  //   console.log("Updated Staff:", updatedStaff);
  //   setModalOpen(false);
  //   // execute("6729bd3e5a9f963581db7890");
  // };

  return (
    <div className="border-2 shadow-sm border-gray-100 p-5 rounded-lg">
      {data && data.length > 0 ? (
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
              {data.map((doc: any) => (
                <TableRow key={doc._id}>
                  <TableCell>
                    <MyImage
                      classNames={"rounded-full"}
                      containerClasses={"w-12 rounded-full h-12"}
                      src={doc.user.profilePicture}
                      w={50}
                      h={50}
                    />
                  </TableCell>
                  <TableCell>{doc.user.name}</TableCell>
                  <TableCell>{doc.user.email}</TableCell>
                  <TableCell>{doc.role.title}</TableCell>
                  <TableCell className="justify-center items-center flex gap-2">
                    <Button
                      size="sm"
                      variant={"outline"}
                      onClick={() => handleView(doc)}
                    >
                      View
                    </Button>
                    <Button size="sm" variant={"outline"}>
                      <IoMdTrash color="red" size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {selectedStaff && (
            <ViewStaff
              isOpen={isModalOpen}
              setIsOpen={setModalOpen}
              selectedStaff={selectedStaff}
            />
          )}
        </>
      ) : (
        <H
          size="3xl"
          className="text-center text-muted flex items-center justify-center"
        >
          No data found
        </H>
      )}
    </div>
  );
}
