import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import categoryReducer from "./category/categorySlice";

export const store = configureStore({
    reducer: {
        userInfo: userReducer,
        category: categoryReducer
    }
})