import ServicesForm from "@/components/forms/ServicesForm";
import { HotelsCombobox } from "@/components/HotelsCombobox";
import MyCard from "@/components/MyCard";
import ServiceDropdown from "@/components/services/ServiceDropdown";

const AddServicesPage = () => {
  return (
    <div className="space-y-8">
      <MyCard className="grid sm:grid-cols-2 gap-4 p-4">
        <HotelsCombobox />
        <ServiceDropdown />
      </MyCard>
      <ServicesForm />
    </div>
  );
};

export default AddServicesPage;
