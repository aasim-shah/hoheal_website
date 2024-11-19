"use client";

import { useTranslations } from "next-intl";
import MyDialog from "./MyDialog";

const SignOut = () => {
  const t = useTranslations();
  const handleSignOut = () => {
    console.log("Sign out");
  };
  return (
    <MyDialog
      title={t("headings.signOut")}
      description={t("text.signOutConfirmation")}
      handleClick={handleSignOut}
    />
  );
};

export default SignOut;
