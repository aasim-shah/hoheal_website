"use client";

import { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T) => ReactNode;
}

const DataTable = <T,>({ headers, data, renderRow }: DataTableProps<T>) => {
  return (
    <>
      {data && (
        <Table className="overflow-auto text-start h-full">
          <TableHeader>
            <TableRow className="sticky top-0 z-40 bg-secondary capitalize hover:bg-muted">
              {headers.map((header) => (
                <TableHead key={header} className="font-bold">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>{renderRow(item)}</TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default DataTable;
