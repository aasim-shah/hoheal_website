import { AppSidebar } from "@/components/AppSideBar";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Navbar from "@/components/Navbar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
    <div className="w-full flex flex-row-revers min-h-screen"> {/* Added flex-row-reverse */}
      <AppSidebar side="left"/>
      <div className="w-full flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  </SidebarProvider>
  );
}
