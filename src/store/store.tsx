import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import serviceCategoryReducer from "./features/serviceCategorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
