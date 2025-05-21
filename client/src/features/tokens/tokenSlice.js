import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: "0",
    loading: false,
    error: null
}
const tokenSlice = createSlice({
    name: "tokens",
    initialState,
    reducers: {
            setLoading: (state) => {
                state.loading = true;
                state.error = null;
            },
                setBalances: (state, action) => {
                    state.loading = false;
                    state.balance = action.payload;
                    state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
                }
    }
})
export const { setLoading, setBalances, setError } = tokenSlice.actions;
export default tokenSlice.reducer;
