import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateMo: [],
    stateRefreshMo: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch Mo
export const moFetch = createAsyncThunk(
    "mo/moFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/ordermo`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create Mo
export const moCreate = createAsyncThunk(
    "mo/moCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/ordermo`,
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

//edit Mo
export const moEdit = createAsyncThunk(
    "mo/moEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/ordermo/${values.mo.moId}`,
                values.mo,
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

//delete Mo
export const moDelete = createAsyncThunk(
    "mo/moDelete",
    async (moId) => {
        try {
            const response = await axios.delete(
                `${url}/ordermo/${moId}`,
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

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceMo = createSlice({
    name: "mo",
    initialState,
    reducers: {},
    extraReducers: {
        [moFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [moFetch.fulfilled]: (state, action) => {
            state.stateMo = action.payload;
            state.status = "success";
        },
        [moFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [moCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [moCreate.fulfilled]: (state, action) => {
            state.stateMo.push(action.payload);
            state.createStatus = "success";
            state.stateRefreshMo = Math.random();
            toast.success("MO Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [moCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [moEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [moEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.stateMo.map((mo) =>
                    mo.material_products_id === action.payload.material_products__id ? action.payload : mo
                );
                state.stateMo = updatedCategory;
                state.editStatus = "success";
                state.stateRefreshMo = Math.random();
                toast.info("MO Telah Diedit!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("MO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [moEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [moDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [moDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.stateMo.filter(
                    (item) => item.orderMO_id !== action.payload.orderMO_id
                );
                state.stateMo = newList;
                state.deleteStatus = "success";
                state.stateRefreshMo = Math.random();
                toast.success("MO Telah Didelete!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("MO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
    },
});

export default sliceMo.reducer;