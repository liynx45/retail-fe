import { createSlice } from "@reduxjs/toolkit";
import { fetchCompany } from "../../../services/redux"; 
import { IBannerCompany, ICompanyInfo } from "../../../types/schema";

interface companyRedux {
    status: "idle" | "loading" | "success" | "error";
    data: ICompanyInfo;
    error: unknown;
}

const initialState: companyRedux = {
    status: "idle",
    data: {
        address: "",
        banner: [],
        id: "",
        name: 'No Name',
        phone: 0,
        owner: "",
        about: "",
        email: ""
    },
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
        },
        updateBanner: (state, action) => {
            state.data.banner = [...state.data.banner, action.payload]
        },
        removeBanner: (state, action) => {
            state.data.banner = state.data.banner.filter((banner: IBannerCompany) => banner.id != action.payload)},
    },
    extraReducers(builder) {
        builder.addCase(fetchCompany.pending, (state, action) => {
            state.status = "loading"
        }),
        builder.addCase(fetchCompany.fulfilled, (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload
            }
            state.status = "success"
        }),
        builder.addCase(fetchCompany.rejected, (state, action) => {
            state.error = action.payload
            state.status = "error"
        })
    },
})

export const {
    updateCompany,
    updateBanner,
    removeBanner
} = companySlice.actions

export default companySlice.reducer
