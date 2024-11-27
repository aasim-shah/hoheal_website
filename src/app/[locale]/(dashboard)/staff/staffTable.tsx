"use client";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { formatTableHeader } from "@/utils/reuseableMethods";
import { H } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import MyImage from "@/components/MyImage";
import { IoMdTrash } from "react-icons/io";
import useApi from "@/hooks/useApi";
import { getStaffList } from "@/lib/api/department";
import { useEffect } from "react";

export default function StaffTable() {
  const headers = ["Profile", "Name", "Email", "Department"];

  const { data, loading, error, execute } = useApi(getStaffList);

  console.log({ data });

  useEffect(() => {
    execute("6729bd3e5a9f963581db7890");
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     console.log({ data });
  //     setChats(data.body.chats);
  //   }
  // }, [data]);

  return (
    <div className=" border-2 shadow-sm border-gray-100   p-5 rounded-lg">
      {data && data.employees && data.employees.length > 0 ? (
        <Table className="overflow-auto text-start h-full">
          <TableHeader>
            <TableRow className="sticky top-0 z-40 bg-white capitalize hover:bg-muted">
              {headers.map((header: string) => (
                <TableHead key={header} className="font-bold">
                  {formatTableHeader(header)}
                </TableHead>
              ))}

              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.employees.map((doc: (typeof data)[0]) => (
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

                <TableCell className="text-center">
                  <Button size="sm" variant={"outline"}>
                    <IoMdTrash color="red" size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <H
          size="3xl"
          className="text-center text-muted h-[85vh] flex items-center justify-center"
        >
          No data found
        </H>
      )}
    </div>
  );
}
