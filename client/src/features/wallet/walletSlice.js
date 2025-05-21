import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    address: null,
    isConnected: false,
    error: null
}
const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload;
            state.isConnected = true;
            state.error = null;
        },
        setDisconnect: (state, action) => {
            state.address = null;
            state.isConnected = false;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})
export const { setAddress, setDisconnect, setError } = walletSlice.actions;
export default walletSlice.reducer;
