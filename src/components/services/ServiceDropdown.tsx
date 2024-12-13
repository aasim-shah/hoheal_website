"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useApi from "@/hooks/useApi";
import { getCategories } from "@/lib/api/formData";
import {
  resetServices,
  selectOption,
  toggleCategory,
} from "@/store/features/serviceSlice";
import { RootState } from "@/store/store";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryDropdown = () => {
  const { data, loading, error, execute } = useApi(getCategories);
  const hotel = useSelector((state: RootState) => state?.hotels?.hotelId);

  const dispatch = useDispatch();
  const { expandedCategory, selectedService } = useSelector(
    (state: RootState) => state.services
  );

  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    (async () => {
      await execute(hotel);
    })();
  }, [execute, hotel]);

  useEffect(() => {
    if (data) {
      setCategories(data.body?.categories || []);
    }
  }, [data]);

  const handleToggleCategory = (categoryId: string) => {
    dispatch(toggleCategory(categoryId));
  };

  const handleOptionSelect = (
    title: string,
    category: any,
    subCategory?: any
  ) => {
    dispatch(
      selectOption({
        title,
        category,
        subCategory,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetServices());
    // setValue("hotel", null);
  };

  const hasNoCategories = Array.isArray(categories) && categories.length === 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center gap-2 w-full justify-between"
          variant="outline"
          disabled={loading}
        >
          {loading ? (
            "Loading..."
          ) : categories && categories.length === 0 ? (
            "No categories found"
          ) : (
            <>
              <span className="truncate">
                {selectedService?.subCategory?.title ||
                  selectedService?.category?.title ||
                  "Select Category or Subcategory"}
              </span>
              <span>
                <ChevronDown />
              </span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-full md:w-64">
        {selectedService && (
          <Button
            variant={"destructive"}
            className="w-full capitalize my-2"
            onClick={handleReset}
          >
            reset
          </Button>
        )}
        <DropdownMenuGroup>
          {categories &&
            categories.map((category) => (
              <div key={category._id}>
                <DropdownMenuItem
                  className="flex justify-between items-center w-full md:w-64"
                  onClick={() => handleOptionSelect(category.title, category)}
                >
                  {category.title}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCategory(category._id);
                    }}
                    className="cursor-pointer h-full rounded-full bg-white text-gray-600 hover:text-signature transition duration-200"
                    title="Toggle Subcategories"
                  >
                    {expandedCategory === category._id ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </span>
                </DropdownMenuItem>

                {expandedCategory === category._id &&
                  category.subCategories?.map((subCategory) => (
                    <DropdownMenuItem
                      key={subCategory._id}
                      className="pl-6"
                      onClick={() =>
                        handleOptionSelect(
                          subCategory.title,
                          category,
                          subCategory
                        )
                      }
                    >
                      {subCategory.title}
                    </DropdownMenuItem>
                  ))}
              </div>
            ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoryDropdown;
