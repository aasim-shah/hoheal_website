import { AppSidebar } from "@/components/AppSideBar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="w-full flex h-screen">
        <AppSidebar side="left" />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          {/* <div className="flex-1 p-4">{children}</div> */}
          <div className="h-full flex-1 overflow-hidden">
            <main className="h-full p-4 w-full overflow-hidden overflow-y-auto flex flex-col bg-secondary">
              {/* <main className="h-full p-4 w-full overflow-hidden overflow-y-auto"> */}
              {children}
            </main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
