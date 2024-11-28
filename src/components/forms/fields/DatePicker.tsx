import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  name: string;
  value?: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ name, value, onChange }) => {
  const { setValue } = useFormContext(); // Optionally integrate with React Hook Form

  return (
    <Popover>
      <PopoverTrigger className="bg-secondary/50" asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(selectedDate) => {
            const isoDate = selectedDate?.toISOString();
            if (isoDate) {
              onChange(isoDate);
              setValue?.(name, isoDate, { shouldValidate: true }); // Optional integration with React Hook Form
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
