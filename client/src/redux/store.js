import { configureStore } from "@reduxjs/toolkit";
import trReducer from "./slices/transaction";
import balReducer from "./slices/accbal";
import accReducer from "./slices/accrequests"

export const store = configureStore({
  reducer: {
    transaction: trReducer,
    balance : balReducer,
    account : accReducer,
  },
  devTools: true,
});
