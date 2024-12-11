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
  headers?: string[];
  data: T[];
  renderRow: (item: T) => ReactNode;
}

const DataTable = <T,>({ headers, data, renderRow }: DataTableProps<T>) => {
  return (
    <div className="">
      {data && (
        <Table className="text-start h-full min-w-full">
          {headers && (
            <TableHeader>
              <TableRow className="sticky top-0 z-40 bg-white capitalize hover:bg-muted">
                {headers?.map((header: string) => (
                  <TableHead key={header} className="font-bold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>{renderRow(item)}</TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default DataTable;
