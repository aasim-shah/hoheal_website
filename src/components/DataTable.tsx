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
import { H } from "./ui/typography";

interface Props {
  headers: string[];
  data: any[];
  hasAction?: boolean;
}

const DataTable = ({ headers, data, hasAction }: Props) => {
  return (
    <>
      {data && data.length > 0 ? (
        <Table className="overflow-auto text-start h-full">
          <TableHeader>
            <TableRow className="sticky top-0 z-40 bg-secondary capitalize hover:bg-muted">
              {headers.map((header: string) => (
                <TableHead key={header} className="font-bold">
                  {formatTableHeader(header)}
                </TableHead>
              ))}
              {hasAction && (
                <TableHead className="text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((doc: (typeof data)[0]) => (
              <TableRow key={doc._id}>
                {headers.map((header: string) => (
                  <TableCell key={header}>
                    {doc[header as keyof typeof doc] !== undefined
                      ? doc[header as keyof typeof doc]
                      : "-"}
                  </TableCell>
                ))}

                {hasAction && (
                  <TableCell className="text-center">
                    <button className="btn btn-primary">Edit</button>
                  </TableCell>
                )}
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
    </>
  );
};

export default DataTable;
