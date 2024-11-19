import Container from "@/components/Container";
<<<<<<< HEAD
import LineChart from "@/components/dashboard/LineChart";
=======
>>>>>>> e72ae288a02cc5d02773d2a9d51df97d4c220365
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("headings");
  return (
    <Container className="text-5xl text-center p-10 font-black">
<<<<<<< HEAD
      <LineChart />
=======
      {t("dashboard")}
>>>>>>> e72ae288a02cc5d02773d2a9d51df97d4c220365
    </Container>
  );
}
