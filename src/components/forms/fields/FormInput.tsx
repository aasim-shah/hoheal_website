import { useController, Control } from "react-hook-form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface FormInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="space-y-2">
      {label && (
        <Label className="block text-sm font-medium text-muted-foreground">
          {label}
        </Label>
      )}
      <Input
        {...field}
        type={type}
        placeholder={placeholder}
        className={`bg-secondary/50 ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
