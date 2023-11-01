import { configureStore, createSlice } from "@reduxjs/toolkit";

let address = createSlice({
    name: 'address',
    initialState: ' '
})
export default configureStore({
    reducer: {
        adrs: address.reducer
    }
})