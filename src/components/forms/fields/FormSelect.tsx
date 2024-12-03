import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, useController } from "react-hook-form";

interface FormSelectProps {
  name: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  options: any[];
  valueKey: string;
  labelKey: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  control,
  label,
  placeholder,
  options,
  valueKey,
  labelKey,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-2">
      <Label className="block text-sm font-medium text-muted-foreground">
        {label}
      </Label>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger className="bg-secondary/50 text-muted-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option[valueKey]} value={option[valueKey]}>
              {option[labelKey]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormSelect;
