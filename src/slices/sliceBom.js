import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateBom: [],
    stateSummaryBom: [],
    stateRefreshBom: 0,
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch Bom
export const bomFetch = createAsyncThunk(
    "bom/bomFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/materialProduct`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create bom
export const bomCreate = createAsyncThunk(
    "bom/bomCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/materialProduct`,
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

//edit bom
export const bomEdit = createAsyncThunk(
    "bom/bomEdit",
    async (values) => {
        try {
            const response = await axios.put(
                `${url}/materialProduct/${values.bom.matProdId}`,
                values.bom,
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

//delete bom
export const bomDelete = createAsyncThunk(
    "bom/bomDelete",
    async (bomId) => {
        try {
            const response = await axios.delete(
                `${url}/materialProduct/${bomId}`,
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

//fetch bom by ID
export const bomFetchById = createAsyncThunk(
    "bom/bomFetchById",
    async (materialId) => {
        try {
            const response = await axios.get(`${url}/material/${materialId}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//fetch Summary Bom
export const summaryBomFetch = createAsyncThunk(
    "summaryBom/summaryBomFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/materialProductBOM`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceBom = createSlice({
    name: "bom",
    initialState,
    reducers: {},
    extraReducers: {
        [bomFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [bomFetch.fulfilled]: (state, action) => {
            state.stateBom = action.payload;
            state.status = "success";
        },
        [bomFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [bomCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [bomCreate.fulfilled]: (state, action) => {
            state.stateBom.push(action.payload);
            state.createStatus = "success";
            state.stateRefreshBom = Math.random();
            toast.success("Produk Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [bomCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [bomEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [bomEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.stateBom.map((bom) =>
                    bom.material_products_id === action.payload.material_products__id ? action.payload : bom
                );
                state.stateBom = updatedCategory;
                state.editStatus = "success";
                state.stateRefreshBom = Math.random();
                toast.info("Bahan Baku Telah Diedit!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("Bahan Baku Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [bomEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [bomDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [bomDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.stateBom.filter(
                    (item) => item._id !== action.payload.material_products_id
                );
                state.stateBom = newList;
                state.deleteStatus = "success";
                state.stateRefreshBom = Math.random();
                toast.success("Bahan Baku Telah Didelete!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("Bahan Baku Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [bomDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
        [bomFetchById.pending]: (state, action) => {
            state.status = "pending";
        },
        [bomFetchById.fulfilled]: (state, action) => {
            state.stateSelectedProd = action.payload;
            state.status = "success";
        },
        [bomFetchById.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [summaryBomFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [summaryBomFetch.fulfilled]: (state, action) => {
            state.stateSummaryBom = action.payload;
            state.status = "success";
        },
        [summaryBomFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default sliceBom.reducer;