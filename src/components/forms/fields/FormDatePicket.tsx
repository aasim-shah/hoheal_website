import DatePicker from "@/components/forms/fields/DatePicker"; // Use your existing DatePicker logic
import { Label } from "@/components/ui/label";
import { Control, useController } from "react-hook-form";
import { FormMessage } from "../../ui/form";

interface FormDatePickerProps {
  name: string;
  control: Control<any>;
  label: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  control,
  label,
}) => {
  const { field } = useController({ name, control });

  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      <DatePicker
        name={field.name}
        value={field.value}
        onChange={(value) => field.onChange(value)}
      />
      <FormMessage />
    </div>
  );
};

export default FormDatePicker;
