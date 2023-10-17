import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from './api';

const initialState = {
    stateCategoryProducts: [],
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch products
export const categoryProductsFetch = createAsyncThunk(
    "categoryProducts/categoryProductsFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/productCategory`);
            //console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
        
    }
);

//create products
export const categoryProductsCreate = createAsyncThunk(
    "categoryProducts/categoryProductsCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/productCategory`,
                values,
            );

            return response.data;
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data, {
                position: "bottom-left",
            });
        }
    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceCategoryProducts = createSlice({
    name: "categoryProducts",
    initialState,
    reducers: {},
    extraReducers: {
        [categoryProductsFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [categoryProductsFetch.fulfilled]: (state, action) => {
            state.stateCategoryProducts = action.payload;
            state.status = "success";
        },
        [categoryProductsFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [categoryProductsCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [categoryProductsCreate.fulfilled]: (state, action) => {
            state.stateCategoryProducts.push(action.payload)
            state.createStatus = "success";
            toast.success("Produk Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [categoryProductsCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default sliceCategoryProducts.reducer;