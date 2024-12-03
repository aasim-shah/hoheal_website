"use client";

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
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export function HotelsCombobox() {
  const { data, loading, error, execute } = useApi(getAllHotels);
  const [hotels, setHotels] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>({});

  const { setValue } = useFormContext();

  const handleSelect = (id: string) => {
    setOpen(false);
    const selected = hotels.find((hotel: any) => hotel._id === id);
    setSelectedHotel(selected || {});
    setValue("hotel", id);
  };

  useEffect(() => {
    execute();
  }, [execute]);

  useEffect(() => {
    if (data) {
      if (data?.body?.hotels) {
        setHotels(data.body.hotels);
      }
    }
  }, [data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=" justify-between"
          disabled={loading}
        >
          {loading
            ? "Loading..."
            : selectedHotel.email
            ? hotels.find((hotel: any) => hotel.email === selectedHotel.email)
                ?.name
            : "Select hotel..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Search hotel..." />
          <CommandList>
            <CommandEmpty className="text-muted-foreground text-sm p-4">
              No hotel found.
            </CommandEmpty>
            <CommandGroup>
              {hotels.map((hotel: any) => (
                <CommandItem
                  key={hotel._id}
                  value={hotel._id}
                  onSelect={handleSelect}
                  className="flex items-center justify-between gap-2"
                >
                  <Image
                    src={hotel.logo || "/images/placeholder.png"}
                    alt={hotel.name}
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">{hotel.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {hotel.email}
                    </p>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      hotel._id === selectedHotel._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
