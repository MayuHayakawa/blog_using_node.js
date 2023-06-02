import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import useReducer from "./userSlice";
import articleReducer from "./articleSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: useReducer,
        article: articleReducer
    }
});

export default store;