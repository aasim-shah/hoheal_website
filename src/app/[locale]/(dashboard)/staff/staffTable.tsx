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

export default function StaffTable() {
  const headers = ["Profile", "Name", "Email", "Department"];
  const data = [
    {
      profile: "/images/user.png",
      name: "Ali Ahmed",
      email: "aliahmed@hoheal.com",
      department: "Front Desk",
    },
    {
      profile: "/images/user.png",
      name: "Sara Khan",
      email: "sarakhan@hoheal.com",
      department: "Housekeeping",
    },
    {
      profile: "/images/user.png",
      name: "Usman Malik",
      email: "usmanmalik@hoheal.com",
      department: "Kitchen",
    },
    {
      profile: "/images/user.png",
      name: "Aisha Raza",
      email: "aisharaza@hoheal.com",
      department: "Spa",
    },
    {
      profile: "/images/user.png",
      name: "Hamza Sheikh",
      email: "hamzasheikh@hoheal.com",
      department: "Security",
    },
  ];

  return (
    <div className=" border-2 shadow-sm border-gray-100   p-5 rounded-lg">
      {data && data.length > 0 ? (
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
            {data.map((doc: (typeof data)[0]) => (
              <TableRow key={doc.profile}>
                <TableCell>
                  <MyImage
                    classNames={"rounded-full"}
                    containerClasses={"w-12 rounded-full h-12"}
                    src={doc.profile}
                    w={50}
                    h={50}
                  />
                </TableCell>
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.email}</TableCell>
                <TableCell>{doc.department}</TableCell>

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
