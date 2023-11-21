import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    statePo: [],
    stateRefreshPo: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch po
export const poFetch = createAsyncThunk(
    "po/poFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/purchaseOrder`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create po
export const poCreate = createAsyncThunk(
    "po/poCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/purchaseOrder`,
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
export const poEdit = createAsyncThunk(
    "po/poEdit",
    async (values) => {
        console.log(values);
        try {
            const response = await axios.put(
                `${url}/purchaseOrder/${values.po.poId}`,
                values.po,
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
export const poDelete = createAsyncThunk(
    "po/poDelete",
    async (poId) => {
        console.log(poId);
        try {
            const response = await axios.delete(
                `${url}/purchaseOrder/${poId}`,
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
export const poFetchById = createAsyncThunk(
    "po/poFetchById",
    async (poId) => {
        try {
            const response = await axios.get(`${url}/purchaseOrder/${poId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const slicePo = createSlice({
    name: "po",
    initialState,
    reducers: {},
    extraReducers: {
        [poFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [poFetch.fulfilled]: (state, action) => {
            state.statePo = action.payload;
            state.status = "success";
        },
        [poFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [poCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [poCreate.fulfilled]: (state, action) => {
            state.statePo.push(action.payload);
            state.createStatus = "success";
            state.stateRefreshPo = Math.random();
            toast.success("PO Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [poCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [poEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [poEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.statePo.map((po) =>
                    po.orderPO_id === action.payload.orderPO_id ? action.payload : po
                );
                state.statePo = updatedCategory;
                state.editStatus = "success";
                state.stateRefreshPo = Math.random();
                toast.info("PO Telah Diedit!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("PO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [poEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [poDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [poDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.statePo.filter(
                    (item) => item.orderPO_id !== action.payload.orderPO_id
                );
                state.statePo = newList;
                state.deleteStatus = "success";
                state.stateRefreshPo = Math.random();
                toast.success("PO Telah Didelete!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("PO Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [poDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
        [poFetchById.pending]: (state, action) => {
            state.status = "pending";
        },
        [poFetchById.fulfilled]: (state, action) => {
            state.stateSelectedProd = action.payload;
            state.status = "success";
        },
        [poFetchById.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default slicePo.reducer;