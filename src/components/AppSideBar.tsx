"use client";
import { NavUser } from "@/components/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import getNavMenuByRole from "@/utils/navMenu";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("pages");

  const role: Role = useSelector((state: any) => state.auth.role);
  const menu = getNavMenuByRole(role);

  const locale = useLocale();
  let pathname = usePathname();
  pathname = pathname.split("/")[pathname.split("/").length - 1];

  const isMenuActive = (path: string) => {
    return path === "/" ? pathname === locale : path === `/${pathname}`;
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="mx-auto"
        />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menu.map((item: NavMenuItem) => (
              <Collapsible
                key={item.title}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <Link href={item.path}>
                      <SidebarMenuButton
                        tooltip={t(item.title)}
                        isActive={isMenuActive(item.path)}
                      >
                        {item.icon && <item.icon />}
                        <span>{t(item.title)}</span>
                      </SidebarMenuButton>
                    </Link>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
