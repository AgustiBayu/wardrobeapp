import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    statePaySo: [],
    stateRefreshPaySo: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch po
export const paySoFetch = createAsyncThunk(
    "paySo/paySoFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/paymentSo`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create po
export const paySoCreate = createAsyncThunk(
    "paySo/paySoCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/paymentSo`,
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
export const paySoEdit = createAsyncThunk(
    "paySo/paySoEdit",
    async (values) => {
        console.log(values);
        try {
            const response = await axios.put(
                `${url}/paymentSo/${values.paySo.paySoId}`,
                values.paySo,
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
export const paySoDelete = createAsyncThunk(
    "paySo/paySoDelete",
    async (soId) => {
        console.log(soId);
        try {
            const response = await axios.delete(
                `${url}/paymentSo/${soId}`,
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
export const paySoFetchById = createAsyncThunk(
    "paySo/paySoFetchById",
    async (soId) => {
        try {
            const response = await axios.get(`${url}/paymentSo/${soId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const slicePaySo = createSlice({
    name: "paySo",
    initialState,
    reducers: {},
    extraReducers: {
        [paySoFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [paySoFetch.fulfilled]: (state, action) => {
            state.statePaySo = action.payload;
            state.status = "success";
        },
        [paySoFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [paySoCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [paySoCreate.fulfilled]: (state, action) => {
            state.statePaySo.push(action.payload);
            state.createStatus = "success";
            state.stateRefreshPaySo = Math.random();
            toast.success("Peyment SO Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [paySoCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [paySoEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [paySoEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.statePaySo.map((paySo) =>
                    paySo.paymentSO_id === action.payload.paymentSO_id ? action.payload : paySo
                );
                state.statePaySo = updatedCategory;
                state.editStatus = "success";
                state.stateRefreshPaySo = Math.random();
                toast.info("Payment SO Telah Diedit!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("Payment SO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [paySoEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [paySoDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [paySoDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.statePaySo.filter(
                    (item) => item.paymentSO_id !== action.payload.paymentSO_id
                );
                state.statePaySo = newList;
                state.deleteStatus = "success";
                state.stateRefreshPaySo = Math.random();
                toast.success("Payment SO Telah Didelete!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("SO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [paySoDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
        [paySoFetchById.pending]: (state, action) => {
            state.status = "pending";
        },
        [paySoFetchById.fulfilled]: (state, action) => {
            state.status = "success";
        },
        [paySoFetchById.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default slicePaySo.reducer;