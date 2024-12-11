import ServicesForm from "@/components/forms/ServicesForm";
import { HotelsCombobox } from "@/components/HotelsCombobox";
import ServiceDropdown from "@/components/services/ServiceDropdown";

const AddServicesPage = () => {
  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <HotelsCombobox />
        <ServiceDropdown />
      </div>
      <ServicesForm />
    </div>
  );
};

export default AddServicesPage;
