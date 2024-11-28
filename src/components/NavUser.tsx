"use client";

import { ChevronUp, CircleUserRound, Power, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import Link from "next/link";
import MyDialog from "./MyDialog";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { handleLogout } from "@/store/features/authSlice";
import { useDispatch } from "react-redux";

export function NavUser() {
  const t = useTranslations("headings");
  const authT = useTranslations("auth");
  const user = {
    name: "hoheal",
    email: "hoheal@example.com",
    avatar: "/avatars/shadcn.jpg",
  };

  const options = [
    {
      title: t("account"),
      path: "/account",
      icon: CircleUserRound,
    },
    {
      title: t("settings"),
      path: "/settings",
      icon: Settings,
    },
  ];

  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(handleLogout());
  };

  return (
    <Dialog>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="w-[--radix-popper-anchor-width]"
            >
              {options.map((option) => (
                <DropdownMenuItem key={option.path}>
                  <Link
                    href={option.path}
                    className="w-full flex items-center gap-2"
                  >
                    <option.icon size={16} />
                    <span>{option.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                asChild
                className="focus:bg-red-500 focus:text-white text-red-500 w-full"
              >
                <DialogTrigger>
                  <div className="w-full flex items-center gap-2">
                    <Power size={16} /> <span>{authT("logout")}</span>
                  </div>
                </DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <MyDialog
        title={authT("logout")}
        description={authT("logoutConfirmation")}
        handleClick={handleLogoutClick}
      />
    </Dialog>
  );
}
