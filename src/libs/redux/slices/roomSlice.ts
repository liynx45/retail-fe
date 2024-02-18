import { createSlice, isAction } from "@reduxjs/toolkit";
import { IRoom } from "../../../types/schema";
import { fetchRoom } from "../../../services/redux";

interface RoomsRedux {
    status: "idle" | "loading" | "success" | "error";
    pagging: {
        page: number;
        take: number;
        total_item: number;
        total_page: number;
    },
    data: any;
    error: string;
}

const initialState = {
    data: [],
    pagging: {
        page: 0,
        take: 0,
        total_item: 0,
        total_page: 0
    },
    status: "idle",
    error: ""
} as RoomsRedux

const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {
        addRooms: (state, action) => {
            state.data = [...state.data, action.payload]
        },
        removeRooms: (state, action) => {
            state.data = state.data.filter((data: IRoom) => data.id !== action.payload)
        },
        updateRooms: (state, action) => {
            state.data = state.data.map((data: IRoom) => {
                if (data.id === action.payload.id) {
                    return action.payload
                } else {
                    return data
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRoom.pending, (state, action) => {
            state.status = "loading"
        }),
            builder.addCase(fetchRoom.fulfilled, (state, action) => {
                state.status = "success"                
                state.data = action.payload?.result
                state.pagging = action.payload?.pagging
            }),
            builder.addCase(fetchRoom.rejected, (state, action) => {
                state.status = "error"
            })
    },
})

export const {
    addRooms,
    removeRooms,
    updateRooms
} = roomSlice.actions

export default roomSlice.reducer