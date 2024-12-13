"use client";

import DataTable from "@/components/DataTable";
import { Label } from "@/components/ui/label";
import { TableCell } from "@/components/ui/table";
import useApi from "@/hooks/useApi";
import { getDashboardHotels } from "@/lib/api/dashboard";
import { formatContractDate } from "@/utils/formatDateAndTime";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HotelsSkeleton from "../skeletons/HotelsSkeleton";
import MyCard from "../MyCard";

const Hotels = ({ timeFilter }: { timeFilter: TimeFilter }) => {
  const { execute, loading, error, data } = useApi(getDashboardHotels);
  const [hotels, setHotels] = useState<[] | null>(null);

  useEffect(() => {
    execute(timeFilter);
  }, [timeFilter, execute]);

  useEffect(() => {
    if (data) {
      setHotels(data.body?.hotels || []);
    }
  }, [data]);

  const renderHotelRow = ({ name, email, periodOfContract }: any) => (
    <>
      <TableCell className="text-signature">{name || "-"}</TableCell>
      <TableCell className="text-base font-medium">{email || "-"}</TableCell>
      <TableCell>{formatContractDate(periodOfContract) || "-"}</TableCell>
      <TableCell>...</TableCell>
    </>
  );

  if (loading) {
    return <HotelsSkeleton />;
  }
  if (error) {
    toast.error(error);
    console.log(error);
  }

  return (
    <MyCard className="flex flex-col h-32 gap-2 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <Label className="font-semibold">Hotels</Label>
        <Link href="/all-hotels" className="underline">
          View all
        </Link>
      </div>
      <div className="whitespace-nowrap overflow-scroll border p-1">
        {hotels && hotels.length > 0 ? (
          <DataTable data={hotels} renderRow={renderHotelRow} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">No data</p>
          </div>
        )}
      </div>
    </MyCard>
  );
};

export default Hotels;
