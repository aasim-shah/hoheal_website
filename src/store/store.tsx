import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import serviceReducer from "./features/serviceSlice";
import hotelReducer from "./features/hotelSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    hotels: hotelReducer,
  },
});

export const resetStore = () => store.dispatch({ type: "RESET" });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
