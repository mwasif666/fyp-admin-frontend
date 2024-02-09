import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./mail-slice";
import authReducer from './authSlice'
const store = configureStore({
  reducer: {
    mail: mailSlice.reducer,
    auth:authReducer
  },
});

export default store;


