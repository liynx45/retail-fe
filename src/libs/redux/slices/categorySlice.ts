import { createSlice } from "@reduxjs/toolkit";
import { fetchCategory } from "../../../services/redux";

interface categoryProps {
    id: string;
    name: string;
}

interface CategoryRedux {
    status: "idle" | "loading" | "success" | "error";
    data: categoryProps[];
    error: string;
}

const initialState: CategoryRedux = {
    status: "idle",
    data: [],
    error: ""
} 

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        addcategory: (state, action) => {
            state.data = [
                ...state.data,
                action.payload
            ]
        },
        removeCategory: (state, action) => {
            state.data = state.data.filter((data: categoryProps) => data.id !== action.payload)
        },
        updateCategory: (state, action) => {
            state.data = state.data.map((data: categoryProps) => {
                if (action.payload.id === data.id) {
                    return action.payload
                } else {
                    return data
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategory.pending, (state, action) => {
            state.status = "loading"
        }),
        builder.addCase(fetchCategory.fulfilled, (state, action) => {
            state.status = "success"
            state.data = action.payload
        }),
        builder.addCase(fetchCategory.rejected, (state, action) => {
            state.status = "error"
        })
    },
})

export const {
    addcategory,
    removeCategory,
    updateCategory
} = categorySlice.actions

export default categorySlice.reducer