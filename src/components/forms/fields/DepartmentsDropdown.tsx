"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useApi from "@/hooks/useApi";
import { getServicesList } from "@/lib/api/admin";
import { useEffect, useState } from "react";

interface DepartmentsDropdownProps {
  hotel: string;
  selectedDepartment: string;
  setSelectedDepartment: (department: string) => void;
}

export const DepartmentsDropdown = ({
  hotel,
  selectedDepartment,
  setSelectedDepartment,
}: DepartmentsDropdownProps) => {
  const { data, loading, error, execute } = useApi(getServicesList);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    execute(hotel);
  }, [execute, hotel]);

  useEffect(() => {
    if (data) {
      const departments =
        data.services?.length > 0
          ? data.services.map((service: any) => ({
              title: service.title,
              department: service.department,
            }))
          : [];
      setDepartments(departments);
    }
  }, [data]);

  console.log({ departments });
  return (
    <div>
      <Select
        value={selectedDepartment}
        onValueChange={(value) => setSelectedDepartment(value)}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((department: any) => (
            <SelectItem key={department.title} value={department.department}>
              {department.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
