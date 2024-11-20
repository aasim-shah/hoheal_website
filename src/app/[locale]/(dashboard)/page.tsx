import AddNewButton from "@/components/AddNewButton";
import LineChart from "@/components/dashboard/LineChart";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("headings");

  return (
    <div className="">
      {/* <LineChart /> */}
      <AddNewButton title="hotel"/>
    </div>
  );
}
