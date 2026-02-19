import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";

const store = configureStore({
  // we add reducers in it
  reducer: {
    // ? : What does this line do?
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, and polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
