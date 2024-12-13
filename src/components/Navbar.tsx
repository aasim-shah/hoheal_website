import LocaleSwitcher from "./LocaleSwitcher";
import Notifications from "./Notifications";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <div className="h-12 flex justify-between items-center gap-4 bg-background border-b sticky top-0 px-4 z-50 shadow">
      <SidebarTrigger />
      <div className="flex gap-4 items-center h-full">
        <Notifications />
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
