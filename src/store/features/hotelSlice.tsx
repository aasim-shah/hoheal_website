import { createSlice, Slice } from "@reduxjs/toolkit";

interface InitialState {
  loading: boolean;
  error: string | null;
  hotels: [];
  hotelId: string | null;
  status: string;
  page: number;
  pagination: {
    currentPage: number;
    total: number;
    totalPages: number;
  };
}

const initialState: InitialState = {
  loading: false,
  error: null,
  hotels: [],
  hotelId: null,
  status: "",
  page: 1,
  pagination: {
    currentPage: 1,
    total: 0,
    totalPages: 1,
  },
};

const hotelSlice: Slice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setHotelId: (state, action) => {
      state.hotelId = action.payload;
    },
    resetHotel: (state) => {
      state.hotelId = null;
    },
    changeStatus: (state, action) => {
      state.status = action.payload === "all" ? "" : action.payload;
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
    resetHotels: (state) => {return initialState},
  },
});

export const {
  setHotels,
  setHotelId,
  resetHotel,
  changeStatus,
  setLoading,
  setError,
  changePage,
  changePagination,
  resetHotels,
} = hotelSlice.actions;
export default hotelSlice.reducer;
