import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate, axiosPublic } from "../libs/axios";
import axios from "axios";

const fetchUsers = createAsyncThunk(
    "users/list",
    async (query: string, thunkAPI) => {
        try {
            const get = await axiosPrivate.get("/api/users" + query)
            if (get.status === 200) {
                return get.data.result
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.erros)
        }
    }
)

const fetchRoom = createAsyncThunk(
    'rooms/search',
    async (query: string, thunkAPI) => {
        try {
            const get = await axiosPublic.get("/api/rooms" + query)
            if (get.status === 200) {
                return get.data.data
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.errors);
        }
    }
)

const fetchfacility = createAsyncThunk(
    "facility/list",
    async (query: string, thunkAPI) => {
        try {
            const get = await axiosPrivate.get("/api/facility" + query)            
            if (get.status === 200) {                
                return get.data.result
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.errors)
        }
    }
)

const fetchCategory = createAsyncThunk(
    "category/list",
    async (_, thunkAPI) => {
        try {
            const get = await axiosPrivate.get("/api/category")
            if (get.status === 200) {
                return get.data.result
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.errors)
        }
    }
)

const fetchLogin = createAsyncThunk(
    "users/notif",
    async (data: {username: string, password: string}, thunkAPI) => {
        try {
            const get = await axiosPublic.post("/auth/login", data, {
                withCredentials: true
            })
            if (get.status === 200) {
                console.log(get.data);
                // return get.data.result
            }
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.errors)
        }
    }
)

const fetchCompany = createAsyncThunk(
    "company",
    async(_, thunkAPI) => {
        try {
            const get = await axiosPrivate.get("/api/company")
            if (get.status === 200) {
                return get.data.result
            }
        } catch(e: any){
            return thunkAPI.rejectWithValue(e.response.data.errors)
        }
    }
)

export {
    fetchRoom,
    fetchfacility,
    fetchCategory,
    fetchUsers,
    fetchLogin,
    fetchCompany
}