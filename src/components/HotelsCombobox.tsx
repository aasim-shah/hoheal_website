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
import { resetHotel, setHotelId } from "@/store/features/hotelSlice";
import { resetServices } from "@/store/features/serviceSlice";
import { RootState } from "@/store/store";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyImage from "./MyImage";

export function HotelsCombobox() {
  const { data, loading, error, execute } = useApi(getAllHotels);
  const { hotelId } = useSelector((state: RootState) => state.hotels);
  const [hotels, setHotels] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<any>({});
  const dispatch = useDispatch();
  const { role } = useSelector((state: RootState) => state.auth);

  const handleSelect = (id: string) => {
    setOpen(false);
    const selected = hotels.find((hotel: any) => hotel._id === id);
    setSelectedHotel(selected);
    dispatch(setHotelId(id));
    dispatch(resetServices());
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

  useEffect(() => {
    if (hotelId && hotels.length) {
      const selected = hotels.find((hotel: any) => hotel._id === hotelId);
      setSelectedHotel(selected || null);
    }
  }, [hotelId, hotels]);

  const handleReset = () => {
    setSelectedHotel(null);
    dispatch(resetHotel(hotelId));
    dispatch(resetServices());
  };

  return (
    <>
      {role === "superAdmin" && (
        <div className=" w-full">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="w-full" asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className=" justify-between"
                disabled={loading}
              >
                {loading ? (
                  "Loading..."
                ) : selectedHotel?.name ? (
                  <div className="flex items-center gap-2">
                    <MyImage
                      src={selectedHotel.logo}
                      alt={selectedHotel.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      containerClasses="w-6 h-6 rounded-full"
                    />
                    <p className="font-semibold">{selectedHotel.name}</p>
                  </div>
                ) : (
                  "Select Hotel"
                )}
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
                    {hotelId && (
                      <Button
                        variant={"destructive"}
                        className="w-full capitalize my-2"
                        onClick={handleReset}
                      >
                        reset
                      </Button>
                    )}
                    {hotels.map((hotel: any) => (
                      <CommandItem
                        key={hotel._id}
                        value={hotel._id}
                        onSelect={handleSelect}
                        className="flex items-center justify-between gap-2"
                      >
                        <MyImage
                          src={hotel.logo}
                          alt={hotel.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          containerClasses="w-6 h-6 rounded-full"
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
                            hotel._id === (selectedHotel?._id || null)
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
        </div>
      )}
    </>
  );
}
