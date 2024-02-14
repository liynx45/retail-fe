import { createSlice, isAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/schema";
import { fetchUsers } from "../../../services/redux";

interface UserRedux {
    status: "idle" | "loading" | "success" | "error";
    pagging: {
        page: number;
        take: number;
        total_item: number;
        total_page: number;
    },
    data: IUser[];
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
} as UserRedux

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        removeUser: (state, action) => {
            state.data = state.data.filter((data: IUser) => data.username !== action.payload)
        },
        updateUser: (state, action) => {
            state.data = state.data.map((data: IUser) => {
                if (data.id === action.payload.id) {
                    return action.payload
                } else {
                    return data
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.status = "loading"
        }),
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "success"                
                state.data = action.payload?.result
                state.pagging = action.payload?.pagging
            }),
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.status = "error"
            })
    },
})

export const {
    removeUser,
    updateUser
} = userSlice.actions

export default userSlice.reducer