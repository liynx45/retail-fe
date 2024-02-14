import { createSlice } from "@reduxjs/toolkit";
import { encryptData } from "../../crypto";
import { fetchLogin } from "../../../services/redux";

interface data {
    username: string,
    role: number,
    first_name: string,
    last_name: string,
    profile: string
}

export interface UserRedux {
    data: data ,
    status: "idle" | "loading" | "success" | "error",
    error: ""
}

const initialState = {
    data: {
        username: "",
        first_name: "",
        last_name: "",
        profile: "",
        role: 0
    },
    status: "idle",
    error: ""
} as UserRedux

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        loadingAuth: (state, action) => {
            state.status = action.payload
        },
        updateAuth: (state , action) => {
            state.data = {
                ...state.data,
                ...action.payload
            }
            window.localStorage.setItem("_user", encryptData(JSON.stringify(state.data)))
        },
        logout: (state, action) => {
            state.data = {
                username: "",
                first_name: "",
                last_name: "",
                profile: "",
                role: 0
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.pending, (state, action) => {
            state.status = "loading"
        }),
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.status = "success"
            // state.data = action.payload
        }),
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.status = "error"
        })
    },
})

export const {
    loadingAuth,
    updateAuth,
    logout
} = authSlice.actions
export default authSlice.reducer
