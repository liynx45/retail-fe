import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./slices/roomSlice";
import facilitySlice from "./slices/facilitySlice";
import categorySlice from "./slices/categorySlice";
import usersSlice from "./slices/usersSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        rooms: roomSlice,
        facility: facilitySlice,
        category: categorySlice,
        users: usersSlice
    }
})

store.subscribe(() => {
    console.log("Redux Store :", store.getState())
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store