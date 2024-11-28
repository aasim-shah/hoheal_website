"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useApi from "@/hooks/useApi";
import { getAllHotels } from "@/lib/api/hotel";
import { useEffect, useState } from "react";

export function ComboboxDemo() {
  const { data, loading, error, execute } = useApi(getAllHotels);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data) {
      setHotels(data.body?.hotels);
    }
  }, [data]);

  const frameworks = hotels;

  console.log(frameworks);

  console.log(hotels);

  return (
    <></>
    // <Popover open={open} onOpenChange={setOpen}>
    //   <PopoverTrigger className="w-full" asChild>
    //     <Button
    //       variant="outline"
    //       role="combobox"
    //       aria-expanded={open}
    //       className=" justify-between"
    //     >
    //       {value
    //         ? frameworks.find((framework: any) => framework.value === value)
    //             ?.label
    //         : "Select framework..."}
    //       <ChevronsUpDown className="opacity-50" />
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent align="start" className="w-full p-0">
    //     <Command>
    //       <CommandInput placeholder="Search framework..." />
    //       <CommandList>
    //         <CommandEmpty>No framework found.</CommandEmpty>
    //         <CommandGroup>
    //           {frameworks.map((framework) => (
    //             <CommandItem
    //               key={framework.value}
    //               value={framework.value}
    //               onSelect={(currentValue) => {
    //                 setValue(currentValue === value ? "" : currentValue);
    //                 setOpen(false);
    //               }}
    //             >
    //               {framework.label}
    //               <Check
    //                 className={cn(
    //                   "ml-auto",
    //                   value === framework.value ? "opacity-100" : "opacity-0"
    //                 )}
    //               />
    //             </CommandItem>
    //           ))}
    //         </CommandGroup>
    //       </CommandList>
    //     </Command>
    //   </PopoverContent>
    // </Popover>
  );
}
