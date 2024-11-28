import CategoryDropdown from "@/components/services/ServiceDropdown";
import TopBar from "@/components/TopBar";
import Services from "./Services";

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <TopBar addButtonTitle="service">
        <CategoryDropdown />
      </TopBar>
      <Services />
    </div>
  );
}
