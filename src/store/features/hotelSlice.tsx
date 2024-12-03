import { createSlice, Slice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  hotels: [],
  hotelId: null,
  status: "",
  page: 1,
  pagination: {
    currentPage: 1,
    limit: 10,
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
  },
});

export const {
  setHotels,
  setHotelId,
  changeStatus,
  setLoading,
  setError,
  changePage,
  changePagination,
} = hotelSlice.actions;
export default hotelSlice.reducer;
