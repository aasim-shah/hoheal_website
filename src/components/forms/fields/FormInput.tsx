import { Control, useController, useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  type?: string;
  params?: any;
}

const FormInput = ({
  name,
  control,
  label,
  placeholder,
  type = "text",
  params,
  ...rest
}: FormInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const { setValue } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (type === "number") {
      setValue(name, value ? Number(value) : 0);
    } else {
      setValue(name, value);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label className="block text-sm font-medium text-muted-foreground">
          {label}
        </Label>
      )}
      <Input
        {...field}
        {...rest}
        type={type}
        placeholder={placeholder}
        className={`bg-secondary/50 ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
        onChange={handleChange}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
