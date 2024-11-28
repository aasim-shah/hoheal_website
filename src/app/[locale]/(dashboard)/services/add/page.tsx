import ServicesForm from "@/components/forms/ServicesForm";
import ServiceDropdown from "@/components/services/ServiceDropdown";

const AddServicesPage = () => {
  return (
    <div className="space-y-8">
      <ServiceDropdown />
      <ServicesForm />
    </div>
  );
};

export default AddServicesPage;
