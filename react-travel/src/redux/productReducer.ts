import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductList {
    productList: any[];
    loading: boolean;
    error: string | null;
}

const defaultState: ProductList = {
    loading: true,
    error: null,
    productList: [],
};

export const getProductDetail = createAsyncThunk("product", async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(
        `https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/shop/1/products`
    );
    return data.data[touristRouteId]
})


export const productReducer = createSlice({
    name: "product",
    initialState: defaultState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProductDetail.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getProductDetail.fulfilled, (state, action) => {
            state.loading = false,
                state.productList = action.payload
        })
        builder.addCase(getProductDetail.rejected, (state, action) => {
            state.loading = false,
                state.error = action.payload
        })
    }
})