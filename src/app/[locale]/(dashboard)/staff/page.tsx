import Link from "next/link";
import StaffTable from "./staffTable";

export default function StaffPage() {
  return (
    <div className=" ">
      <div className="flex mr-5 mb-4  w-full justify-end">
        <Link
          href={"/staff/add"}
          className="bg-signature px-4 py-2 text-white rounded-md"
        >
          Add Staff
        </Link>
      </div>
      <StaffTable />
    </div>
  );
}
