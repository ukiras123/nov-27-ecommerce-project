import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import userReducer from "./auth/userSlice";
import categoryReducer from "./category/categorySlice";
import productReducer from "./product/productSlice";

const persistConfig = {
    key: 'root',
    storage: storage,
}

const persistedUserReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        userInfo: persistedUserReducer,
        category: categoryReducer,
        product: productReducer
    }
})