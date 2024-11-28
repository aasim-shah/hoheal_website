import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { camelCaseToNormalCase } from "@/utils/reuseableMethods";
import { useFormContext, useWatch } from "react-hook-form";

const MultiSelect = ({
  fieldName,
  values,
  control,
}: {
  fieldName: string;
  values: string[];
  control: any;
}) => {
  const formKey = useWatch({
    control,
    name: fieldName,
    defaultValue: [],
  });

  const { setValue } = useFormContext();

  const toggleValue = (value: string) => {
    const updatedValues = formKey.includes(value)
      ? formKey.filter((f: string) => f !== value)
      : [...formKey, value];
    setValue(fieldName, updatedValues);
  };

  return (
    <div className="space-y-2 capitalize">
      <Label className="block text-sm font-medium text-muted-foreground">
        {camelCaseToNormalCase(fieldName)}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full">
            {formKey.length > 0
              ? `Selected (${formKey.length})`
              : `Select ${fieldName}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="max-h-40 overflow-auto p-0 capitalize"
        >
          <Command>
            <CommandGroup>
              {values?.map((value) => (
                <CommandItem key={value} onSelect={() => toggleValue(value)}>
                  <Checkbox
                    checked={formKey.includes(value)}
                    onCheckedChange={() => toggleValue(value)}
                    className="mr-2 capitalize"
                  />
                  {value}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MultiSelect;
