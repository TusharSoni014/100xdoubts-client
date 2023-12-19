import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./slices/appSlice";
import doubtPageSlice from "./slices/doubtPageSlice";
import homeSlice from "./slices/homeSlice";
import newDoubtSlice from "./slices/newDoubtSlice";

const appSlicePersistConfig = {
  key: "appSlice", // key is a unique identifier for the persisted data
  storage,
};
const newDoubtSlicePersistConfig = {
  key: "newDoubtSlice",
  storage,
};

const persistedAppReducer = persistReducer(appSlicePersistConfig, appSlice);
const persistedDoubtReducer = persistReducer(
  newDoubtSlicePersistConfig,
  newDoubtSlice
);

const rootReducer = combineReducers({
  appSlice: persistedAppReducer,
  newDoubtSlice: persistedDoubtReducer,
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
