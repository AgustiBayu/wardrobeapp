import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    statePayPo: [],
    stateRefreshPayPo: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch po
export const payPoFetch = createAsyncThunk(
    "payPo/payPoFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/paymentPo`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create po
export const payPoCreate = createAsyncThunk(
    "payPo/payPoCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/paymentPo`,
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

//edit po
export const payPoEdit = createAsyncThunk(
    "payPo/payPoEdit",
    async (values) => {
        console.log(values);
        try {
            const response = await axios.put(
                `${url}/paymentPo/${values.payPo.payPoId}`,
                values.payPo,
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

//delete po
export const payPoDelete = createAsyncThunk(
    "payPo/payPoDelete",
    async (poId) => {
        console.log(poId);
        try {
            const response = await axios.delete(
                `${url}/paymentPo/${poId}`,
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

//fetch po by ID
export const payPoFetchById = createAsyncThunk(
    "payPo/payPoFetchById",
    async (poId) => {
        try {
            const response = await axios.get(`${url}/paymentPo/${poId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const slicePayPo = createSlice({
    name: "payPo",
    initialState,
    reducers: {},
    extraReducers: {
        [payPoFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [payPoFetch.fulfilled]: (state, action) => {
            state.statePayPo = action.payload;
            state.status = "success";
        },
        [payPoFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [payPoCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [payPoCreate.fulfilled]: (state, action) => {
            state.statePayPo.push(action.payload);
            state.createStatus = "success";
            state.stateRefreshPayPo = Math.random();
            toast.success("Peyment PO Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [payPoCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [payPoEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [payPoEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.statePayPo.map((payPo) =>
                    payPo.paymentPO_id === action.payload.paymentPO_id ? action.payload : payPo
                );
                state.statePayPo = updatedCategory;
                state.editStatus = "success";
                state.stateRefreshPayPo = Math.random();
                toast.info("Payment PO Telah Diedit!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("Payment PO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [payPoEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [payPoDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [payPoDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.statePayPo.filter(
                    (item) => item.paymentPO_id !== action.payload.paymentPO_id
                );
                state.statePayPo = newList;
                state.deleteStatus = "success";
                state.stateRefreshPayPo = Math.random();
                toast.success("Payment PO Telah Didelete!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("PO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [payPoDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
        [payPoFetchById.pending]: (state, action) => {
            state.status = "pending";
        },
        [payPoFetchById.fulfilled]: (state, action) => {
            state.status = "success";
        },
        [payPoFetchById.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default slicePayPo.reducer;