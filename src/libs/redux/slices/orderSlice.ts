import { createSlice } from "@reduxjs/toolkit"
import { fetchOrder } from "../../../services/redux"
import { ITransaction } from "../../../types/schema"
import { LoadingProps } from "../../../hooks/useLoading";

interface initialState {
    data: ITransaction[];
    pagging: {
        page: number;
        take: number;
        total_item: number;
        total_page: number;
    },
    status: LoadingProps
    error: string
}

const initialState: initialState = {
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

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.data = action.payload.result
        },
        removeOrder: (state, action) => {
            state.data = state.data.filter((data) => data.id !== action.payload)
        },
        updateOrder: (state, action) => {
            state.data = state.data.map((data) => {
                if (data.id === action.payload.id) {
                    return action.payload
                } else {
                    return data
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state, action) => {
            state.status = "loading"
        }),
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.data = action.payload.result
            state.pagging = action.payload.pagging
            state.status = "success"
        }),
        builder.addCase(fetchOrder.rejected, (state, action) => {
            state.status = "error"
        })
    }
})

export const {
    removeOrder,
    addOrder,
    updateOrder
} = orderSlice.actions

export default orderSlice.reducer