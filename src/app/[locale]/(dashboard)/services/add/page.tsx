import ServicesForm from "@/components/forms/ServicesForm";
import { HotelsCombobox } from "@/components/HotelsCombobox";
import ServiceDropdown from "@/components/services/ServiceDropdown";

const AddServicesPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 w-full">
        <div className="w-1/2">
          <HotelsCombobox />
        </div>
        <div className="w-1/2">
          <ServiceDropdown />
        </div>
      </div>
      <ServicesForm />
    </div>
  );
};

export default AddServicesPage;
