import { configureStore } from "@reduxjs/toolkit";
import { save, load } from 'redux-localstorage-simple';
import authReducer from "./authSlice";
import useReducer from "./userSlice";
import articleReducer from "./articleSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: useReducer,
        article: articleReducer
    },
    preloadedState: load({namespace: 'myblog_store'}),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(save({namespace: 'myblog_store'})),
});

export default store;