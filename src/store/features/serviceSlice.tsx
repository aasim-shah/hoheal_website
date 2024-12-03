import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedService {
  title: string;
  category: Category;
  subCategory?: SubCategory;
}

interface CategoryState {
  expandedCategory: string | null;
  selectedService: SelectedService | null;
  loading: boolean;
  error: string | null;
  services: [];
  page: number;
  pagination: {
    currentPage: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const initialState: CategoryState = {
  expandedCategory: null,
  selectedService: null,
  loading: false,
  error: null,
  services: [],
  page: 1,
  pagination: {
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
};

const serviceSlice = createSlice({
  name: "service",
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
    setServices: (state, action) => {
      state.services = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    changePage: (state, action) => {
      state.page = action.payload;
    },
    changePagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
});

export const {
  toggleCategory,
  selectOption,
  setServices,
  setLoading,
  setError,
  changePage,
  changePagination,
} = serviceSlice.actions;

export default serviceSlice.reducer;
