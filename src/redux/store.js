import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./slices/appSlice";
import doubtPageSlice from "./slices/doubtPageSlice";
import homeSlice from "./slices/homeSlice";

const persistConfig = {
  key: "appSlice", // key is a unique identifier for the persisted data
  storage,
};

const persistedAppReducer = persistReducer(persistConfig, appSlice);

const rootReducer = combineReducers({
  appSlice: persistedAppReducer,
  doubtPageSlice: doubtPageSlice,
  homeSlice: homeSlice,
  // Add other slices or reducers here if needed
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
