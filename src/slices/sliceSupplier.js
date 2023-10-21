import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateSupplier: [],
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch supplier
export const supplierFetch = createAsyncThunk(
    "supplier/supplierFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/supplier`);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create supplier
export const supplierCreate = createAsyncThunk(
    "supplier/supplierCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/supplier`,
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

//edit supplier
export const supplierEdit = createAsyncThunk(
    "supplier/supplierEdit",
    async (values) => {
        console.log(values);
        try {
            const response = await axios.put(
                `${url}/supplier/${values.supplier.supplierId}`,
                values.supplier,
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

//delete supplier
export const supplierDelete = createAsyncThunk(
    "supplier/supplierDelete",
    async (supplierId) => {
        console.log(supplierId);
        try {
            const response = await axios.delete(
                `${url}/supplier/${supplierId}`,
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

//fetch supplier by ID
export const supplierFetchById = createAsyncThunk(
    "supplier/supplierFetchById",
    async (supplierId) => {
        try {
            const response = await axios.get(`${url}/supplier/${supplierId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceSupplier = createSlice({
    name: "supplier",
    initialState,
    reducers: {},
    extraReducers: {
        [supplierFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [supplierFetch.fulfilled]: (state, action) => {
            state.stateSupplier = action.payload;
            state.status = "success";
        },
        [supplierFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [supplierCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [supplierCreate.fulfilled]: (state, action) => {
            state.stateSupplier.push(action.payload);
            state.createStatus = "success";
            toast.success("Produk Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [supplierCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [supplierEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [supplierEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.stateSupplier.map((material) =>
                    material.supplier_id === action.payload.supplier_id ? action.payload : material
                );
                state.stateSupplier = updatedCategory;
                state.editStatus = "success";
                toast.info("Bahan Baku Telah Diedit!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("Bahan Baku Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [supplierEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [supplierDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [supplierDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.stateSupplier.filter(
                    (item) => item._id !== action.payload.supplier_id
                );
                state.stateSupplier = newList;
                state.deleteStatus = "success";
                toast.success("Bahan Baku Telah Didelete!", {
                    position: "bottom-left",
                });
            } else {
                toast.error("Bahan Baku Masih Digunakan!", {
                    position: "bottom-left",
                });
            }
        },
        [supplierDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
        [supplierFetchById.pending]: (state, action) => {
            state.status = "pending";
        },
        [supplierFetchById.fulfilled]: (state, action) => {
            state.stateSelectedProd = action.payload;
            state.status = "success";
        },
        [supplierFetchById.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default sliceSupplier.reducer;