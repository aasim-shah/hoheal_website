import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedService {
  title: string;
  category: Category;
  subCategory?: SubCategory;
}

interface CategoryState {
  expandedCategory: string | null;
  selectedService: SelectedService | null;
}

const initialState: CategoryState = {
  expandedCategory: null,
  selectedService: null,
};

const serviceCategorySlice = createSlice({
  name: "categoryUi",
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<string>) => {
      state.expandedCategory =
        state.expandedCategory === action.payload ? null : action.payload;
    },

    selectOption: (
      state,
      action: PayloadAction<{
        title: string;
        category: Category;
        subCategory?: SubCategory;
      }>
    ) => {
      state.selectedService = {
        title: action.payload.title,
        category: action.payload.category,
        subCategory: action.payload.subCategory,
      };
      state.expandedCategory = null;
    },
  },
});

export const { toggleCategory, selectOption } = serviceCategorySlice.actions;

export default serviceCategorySlice.reducer;
