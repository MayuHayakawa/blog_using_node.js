import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk("auth/register", async({ username, email, password }) => {
    console.log(username, email, password);
    try {
        const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/register", { username, email, password });
        return res.data;
    } catch(error) {
        console.log(error);
    }
});

export const login = createAsyncThunk("auth/login", async({ email, password }) => {
    console.log(email, password);
    try {
        const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/login", { email, password });
        return res.data;
    } catch(error) {
        console.log(error);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        data: null,
        error: null,
        loading: false
    },
    reducers: {
        updataPostList: (state, action) => {
            state.data.user.articles.push(action.payload);
        },
        removePostList: (state, action) => {
            state.data.user.articles = state.data.user.articles.filter((article) => article != action.payload);
        },
        updataLikeList: (state, action) => {
            if(state.data.user.like != undefined) {
                if(state.data.user.like.includes(action.payload)) {
                    state.data.user.like = state.data.user.like.filter((article) => article != action.payload);
                } else {
                    state.data.user.like.push(action.payload);
                }
            }
        },
        logOutUser: (state) => {
            state.data = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            console.log(state.data);
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }).addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            console.log(state.data);
        }).addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { updataPostList, removePostList, updataLikeList, logOutUser } = authSlice.actions;
export default authSlice.reducer;
