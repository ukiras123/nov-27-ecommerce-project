import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    productList: []
}
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProductList: (state, action) => {
            state.productList = action.payload
        }
    }
})
const { actions, reducer } = productSlice;
export const { setProductList } = actions
export default reducer;