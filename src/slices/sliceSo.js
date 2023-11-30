import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateSo: [],
    stateRefreshSo: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch So
export const soFetch = createAsyncThunk(
    "so/soFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/order`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create So
export const soCreate = createAsyncThunk(
    "so/soCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/order`,
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

//edit So
export const soEdit = createAsyncThunk(
    "so/soEdit",
    async (values) => {
        console.log(values);
        try {
            const response = await axios.put(
                `${url}/order/${values.so.soId}`,
                values.so,
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

//delete So
export const soDelete = createAsyncThunk(
    "so/soDelete",
    async (soId) => {
        console.log(soId);
        try {
            const response = await axios.delete(
                `${url}/order/${soId}`,
                setHeaders(),
            );

            return ressonse.data;
        } catch (error) {
            console.log(error.ressonse.data);
            toast.error(error.ressonse?.data, {
                sosition: "bottom-left",
            });
        }
    }
);

//fetch So by ID
export const soFetchById = createAsyncThunk(
    "so/soFetchById",
    async (soId) => {
        try {
            const response = await axios.get(`${url}/order/${soId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceSo = createSlice({
    name: "so",
    initialState,
    reducers: {},
    extraReducers: {
        [soFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [soFetch.fulfilled]: (state, action) => {
            state.stateSo = action.payload;
            state.status = "success";
        },
        [soFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [soCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [soCreate.fulfilled]: (state, action) => {
            state.stateSo.push(action.payload);
            state.createStatus = "success";
            state.stateRefreshSo = Math.random();
            toast.success("SO Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [soCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [soEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [soEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.stateSo.map((so) =>
                    so.order_id === action.payload.order_id ? action.payload : so
                );
                state.stateSo = updatedCategory;
                state.editStatus = "success";
                state.stateRefreshSo = Math.random();
                toast.info("SO Telah Diedit!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("SO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [soEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [soDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [soDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.stateSo.filter(
                    (item) => item.order_id !== action.payload.order_id
                );
                state.stateSo = newList;
                state.deleteStatus = "success";
                state.stateRefreshSo = Math.random();
                toast.success("SO Telah Didelete!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("SO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [soDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
        [soFetchById.pending]: (state, action) => {
            state.status = "pending";
        },
        [soFetchById.fulfilled]: (state, action) => {
            state.stateSelectedProd = action.payload;
            state.status = "success";
        },
        [soFetchById.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default sliceSo.reducer;