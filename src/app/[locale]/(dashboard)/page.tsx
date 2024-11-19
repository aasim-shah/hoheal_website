import Container from "@/components/Container";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("headings");
  return (
    <Container className="text-5xl text-center p-10 font-black">
      {t("dashboard")}
    </Container>
  );
}
