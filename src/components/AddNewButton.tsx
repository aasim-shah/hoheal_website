import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SquarePlus } from "lucide-react";
import { useTranslations } from "next-intl";

type Title = "hotel" | "service" | "category" | "subcategory";

const AddNewButton = ({ title }: { title: Title }) => {
  const t = useTranslations("form.labels");
  const routes: Record<Title, string> = {
    hotel: "all-hotels",
    service: "services",
    category: "categories",
    subcategory: "subcategories",
  };

  return (
    <Link href={`/${routes[title]}/add`}>
      <Button variant="signature" className="flex items-center gap-2">
        <SquarePlus /> <span>{t("addNew", {title})}</span>
      </Button>
    </Link>
  );
};

export default AddNewButton;
