"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

const MyDialog = ({
  title,
  description,
  handleClick,
  variant = "destructive",
}: {
  title: string;
  description: string;
  handleClick: () => void;
  variant?:
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "default"
    | "default";
}) => {
  const t = useTranslations("common");
  const handleButton = () => {
    console.log("clicked");
    handleClick();
  };
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">{t("cancel")}</Button>
        </DialogClose>
        <Button type="button" variant={variant} onClick={handleButton}>
          {title}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default MyDialog;
