import { createSlice } from "@reduxjs/toolkit";
import { fetchfacility } from "../../../services/redux";

interface FacilityRedux {
    status: "idle" | "loading" | "success" | "error";
    data: any;
    pagging: {
        page: number;
        take: number;
        total_item: number;
        total_page: number;
    }
    error: string;
}

const initialState: FacilityRedux = {
    data: [],
    pagging: {
        page: 0,
        take: 0,
        total_item: 0,
        total_page: 0
    },
    status: "idle",
    error: ""
}

const facilitySlice = createSlice({
    name: "facility",
    initialState,
    reducers: {
        addFacility: (state, action) => {
            state.data = [
                ...state.data
                , action.payload
            ]
        },
        removeFacility: (state, action) => {
            state.data = state.data.filter((data: any) => data.id !== action.payload)
        },
        updateFacility: (state, action) => {
            state.data = state.data.map((data: any) => {
                if (data.id === action.payload.id) {
                    return action.payload
                } else {
                    return data
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchfacility.pending, (state, action) => {
            state.status = "loading"
        }),
            builder.addCase(fetchfacility.fulfilled, (state, action) => {
                state.status = "success"                
                state.data = action.payload?.result
                state.pagging = action.payload?.pagging
            }),
            builder.addCase(fetchfacility.rejected, (state, action) => {
                state.status = "error"
            })
    },
})

export const {
    addFacility,
    removeFacility,
    updateFacility
} = facilitySlice.actions

export default facilitySlice.reducer