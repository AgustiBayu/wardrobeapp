import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setHeaders, url } from './api';

const initialState = {
    stateMaterials: [],
    stateSelectedMat: [],
    status: null,
    createStatus: null,
    editStatus: null,
    deleteStatus: null,
};

//fetch materials
export const materialsFetch = createAsyncThunk(
    "materials/materialsFetch",
    async () => {
        try {
            const response = await axios.get(`${url}/material`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//create materialss
export const materialsCreate = createAsyncThunk(
    "materials/materialsCreate",
    async (values) => {
        try {
            const response = await axios.post(
                `${url}/material`,
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

//edit materials
export const materialsEdit = createAsyncThunk(
    "materials/materialsEdit",
    async (values) => {
        console.log(values);
        try {
            const response = await axios.put(
                `${url}/material/${values.material.materialId}`,
                values.material,
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

//delete materials
export const materialsDelete = createAsyncThunk(
    "materials/materialsDelete",
    async (materialId) => {
        console.log(materialId);
        try {
            const response = await axios.delete(
                `${url}/material/${materialId}`,
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

//fetch materials by ID
export const materialsFetchById = createAsyncThunk(
    "materials/materialsFetchById",
    async (materialId) => {
        try {
            const response = await axios.get(`${url}/material/${materialId}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }

    }
);

//redux reducers atau pembuatan state untuk digunakan pada suatu komponen
const sliceMaterials = createSlice({
    name: "materials",
    initialState,
    reducers: {},
    extraReducers: {
        [materialsFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [materialsFetch.fulfilled]: (state, action) => {
            state.stateMaterials = action.payload;
            state.status = "success";
        },
        [materialsFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [materialsCreate.pending]: (state, action) => {
            state.status = "pending";
        },
        [materialsCreate.fulfilled]: (state, action) => {
            state.stateMaterials.push(action.payload);
            state.createStatus = "success";
            toast.success("Produk Telah Dibuat!", {
                position: "bottom-left"
            });
        },
        [materialsCreate.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [materialsEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [materialsEdit.fulfilled]: (state, action) => {
            if (action.payload) {
                const updatedCategory = state.stateMaterials.map((material) =>
                    material.materials_id === action.payload.materials_id ? action.payload : material
                );
                state.stateMaterials = updatedCategory;
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
        [materialsEdit.rejected]: (state, action) => {
            state.editStatus = "rejected";
        },
        [materialsDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [materialsDelete.fulfilled]: (state, action) => {
            if (action.payload) {
                const newList = state.stateMaterials.filter(
                    (item) => item._id !== action.payload.materials_id
                );
                state.stateMaterials = newList;
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
        [materialsDelete.rejected]: (state, action) => {
            state.deleteStatus = "rejected";
        },
        [materialsFetchById.pending]: (state, action) => {
            state.status = "pending";
        },
        [materialsFetchById.fulfilled]: (state, action) => {
            state.stateSelectedProd = action.payload;
            state.status = "success";
        },
        [materialsFetchById.rejected]: (state, action) => {
            state.status = "rejected";
        },
    },
});

export default sliceMaterials.reducer;