import DatePickerWithRange from "@/components/forms/fields/DatePickerWithRange"; // Use your existing DatePickerWithRange logic
import { Label } from "@/components/ui/label";
import { Control, useController } from "react-hook-form";
import { FormMessage } from "../../ui/form";

interface FormDatePickerWithRangeProps {
  name: string;
  control: Control<any>;
  label: string;
}

const FormDatePickerWithRange: React.FC<FormDatePickerWithRangeProps> = ({
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
      <DatePickerWithRange
        value={field.value}
        onChange={(value) => field.onChange(value)}
      />
      <FormMessage />
    </div>
  );
};

export default FormDatePickerWithRange;
