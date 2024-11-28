"use client";
import { useState, useEffect } from "react";
import ChatDetails from "./chatDetails";
import ChatsList from "./chatsList";
import Tabs from "@/components/Tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function ChatsPage() {
  const { role, token, userProfile } = useSelector(
    (state: RootState) => state.auth
  );

  const tabData =
    role === "serviceManager"
      ? ["hotel admin", "staff"]
      : role === "reception"
      ? ["hotel admin", "staff", "Admin"]
      : [];

  console.log({ userProfile });

  const [selectedTab, setSelectedTab] = useState<string>(tabData[0] || "");
  const [chatId, setChatId] = useState<string>("");

  useEffect(() => {
    if (tabData.length && !tabData.includes(selectedTab)) {
      setSelectedTab(tabData[0]);
    }
  }, [tabData]);

  return (
    <>
      <div className="my-5">
        <Tabs
          tabData={tabData}
          selectedTab={selectedTab}
          handleTabClick={setSelectedTab}
        />
      </div>
      <div className="grid grid-cols-12">
        <ChatsList role={selectedTab} chatId={chatId} setChatId={setChatId} />
        <ChatDetails
          chatId={chatId}
          setChatId={setChatId}
          currentUserId={userProfile?._id || ""}
        />
      </div>
    </>
  );
}
