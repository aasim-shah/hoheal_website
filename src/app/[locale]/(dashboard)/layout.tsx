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
      <div className="w-full flex h-screen">
        <AppSidebar side="left" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          {/* <div className="flex-1 p-4">{children}</div> */}
          <div className="h-full p-4 flex-1 overflow-hidden">
            <main className="h-full w-full overflow-y-auto">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
