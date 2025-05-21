import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "../features/wallet/walletSlice"
import taskReducer from "../features/tasks/taskSlice"
import tokenReducer from "../features/tokens/tokenSlice"
export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        tasks: taskReducer,
        tokens: tokenReducer,
    }
})
