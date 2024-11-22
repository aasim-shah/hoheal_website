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

export default function CustomerDetailsTable() {
  const headers = ["icon", "serviceName", "status", "roomNumber"];
  const data = [
    {
      icon: "/images/user.png",
      serviceName: "Service Name",
      roomNumber: "307",
      status: "completed",
    },
    {
      icon: "/images/user.png",
      serviceName: "Service Name",
      roomNumber: "307",
      status: "pending",
    },
    {
      icon: "/images/user.png",
      serviceName: "Service Name",
      roomNumber: "307",
      status: "pending",
    },
    {
      icon: "/images/user.png",
      serviceName: "Service Name",
      roomNumber: "307",
      status: "pending",
    },
  ];

  return (
    <div className=" shadow-md  p-5 rounded-lg">
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
              <TableRow key={doc.icon}>
                <TableCell>
                  <MyImage
                    classNames={"rounded-full"}
                    containerClasses={"w-12 rounded-full h-12"}
                    src={doc.icon}
                    w={50}
                    h={50}
                  />
                </TableCell>
                <TableCell>{doc.serviceName}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        doc.status === "completed"
                          ? "border-green-500"
                          : doc.status === "pending"
                          ? "border-black"
                          : doc.status === "inprogress"
                          ? "border-orange-500"
                          : doc.status === "delayed"
                          ? "border-red-500"
                          : "border-gray-500" // Default border color
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          doc.status === "completed"
                            ? "bg-green-500"
                            : doc.status === "pending"
                            ? "bg-black"
                            : doc.status === "inprogress"
                            ? "bg-orange-500"
                            : doc.status === "delayed"
                            ? "bg-red-500"
                            : "bg-gray-500" // Default fill color
                        }`}
                      ></span>
                    </span>
                    <span className="ml-2 text-gray-600 text-sm font-medium">
                      {doc.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{doc.roomNumber}</TableCell>

                <TableCell className="text-center">
                  {doc.status === "completed" ? (
                    <div className="flex   justify-center gap-3">
                      <Button
                        size="sm"
                        className="text-blue-500 font-semibold"
                        variant={"outline"}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className={"text-red-500 font-semibold"}
                        variant={"outline"}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm">View Details</Button>
                  )}
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
