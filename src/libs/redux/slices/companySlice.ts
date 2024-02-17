import { createSlice } from "@reduxjs/toolkit";
import { fetchCompany } from "../../../services/redux";

interface companyProps {
    id: string;
    name: string;
}

interface companyRedux {
    status: "idle" | "loading" | "success" | "error";
    data: any;
    error: string;
}

const initialState: companyRedux = {
    status: "idle",
    data: {},
    error: ""
} 

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        updateCompany: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchCompany.pending, (state, action) => {
            state.status = "loading"
        }),
        builder.addCase(fetchCompany.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = "success"
        }),
        builder.addCase(fetchCompany.rejected, (state, action) => {
            state.data = action.payload
            state.status = "error"
        })
    },
})

export const {
    updateCompany
} = companySlice.actions

export default companySlice.reducer
