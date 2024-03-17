import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./slices/roomSlice";
import facilitySlice from "./slices/facilitySlice";
import categorySlice from "./slices/categorySlice";
import usersSlice from "./slices/usersSlice";
import companySlice from "./slices/companySlice";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
    reducer: {
        rooms: roomSlice,
        facility: facilitySlice,
        category: categorySlice,
        users: usersSlice,
        company: companySlice,
        order: orderSlice
    }
})

store.subscribe(() => {
    console.log("Redux Store =>", store.getState())
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store