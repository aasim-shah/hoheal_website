import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SquarePlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const AddNewButton = ({
  title,
  className,
}: {
  title: AddButtonTitle;
  className?: string;
}) => {
  const t = useTranslations("form.labels");
  const routes: Record<AddButtonTitle, string> = {
    hotel: "all-hotels",
    service: "services",
    category: "categories",
    subcategory: "subcategories",
  };

  return (
    <Link href={`/${routes[title]}/add`} className={className}>
      <Button variant="signature" className="flex items-center gap-2 w-full">
        <SquarePlus /> <span>{t("addNew", { title })}</span>
      </Button>
    </Link>
  );
};

export default AddNewButton;
