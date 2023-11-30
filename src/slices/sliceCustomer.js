import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateCustomer: [],
    stateRefreshCus: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch customer
export const customerFetch = createAsyncThunk(
    "customer/customerFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/customer`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create customer
export const customerCreate = createAsyncThunk(
    "customer/customerCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/customer`,
                values,
                setHeaders(),
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

//edit customer
export const customerEdit = createAsyncThunk(
    "customer/customerEdit",
    async (values) => {
        console.log(values);
        try {
            const response = await axios.put(
                `${url}/customer/${values.customer.customerId}`,
                values.customer,
                setHeaders(),
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

//delete customer
export const customerDelete = createAsyncThunk(
    "customer/customerDelete",
    async (customerId) => {
        console.log(customerId);
        try {
            const response = await axios.delete(
                `${url}/customer/${customerId}`,
                setHeaders(),
            );

            return response.data;
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response?.data, {
                position: "bottom-left",
            });
        }
    }
);

//fetch customer by ID
export const customerFetchById = createAsyncThunk(
    "customer/customerFetchById",
    async (customerId) => {
        try {
            const response = await axios.get(`${url}/customer/${customerId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceCustomer = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: {
        [customerFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [customerFetch.fulfilled]: (state, action) => {
            state.stateCustomer = action.payload;
            state.status = "success";
        },
        [customerFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [customerCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [customerCreate.fulfilled]: (state, action) => {
            state.stateCustomer.push(action.payload);
            state.createStatus = "success";
            state.stateRefreshCus = Math.random();
            toast.success("Customer Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [customerCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [customerEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [customerEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.stateCustomer.map((customer) =>
                    customer.customer_id === action.payload.customer_id ? action.payload : customer
                );
                state.stateCustomer = updatedCategory;
                state.editStatus = "success";
                state.stateRefreshCus = Math.random();
                toast.info("Customer Telah Diedit!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("Customer Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [customerEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [customerDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [customerDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.stateCustomer.filter(
                    (item) => item._id !== action.payload.customer_id
                );
                state.stateCustomer = newList;
                state.deleteStatus = "success";
                state.stateRefreshCus = Math.random();
                toast.success("Customer Telah Didelete!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("Customer Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [customerDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
        [customerFetchById.pending]: (state, action) => {
            state.status = "pending";
        },
        [customerFetchById.fulfilled]: (state, action) => {
            state.stateSelectedCus = action.payload;
            state.status = "success";
        },
        [customerFetchById.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default sliceCustomer.reducer;