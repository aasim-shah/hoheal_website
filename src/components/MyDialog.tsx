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
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="capitalize text-start">{title}</DialogTitle>
        <DialogDescription className="text-start">
          {description}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex flex-col gap-2 sm:flex-auto">
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
