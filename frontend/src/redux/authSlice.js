import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk("auth/register", async({ username, email, password }) => {
    try {
        const res = await axios.post(import.meta.env.VITE_BASE_URL + "/api/auth/register", { username, email, password });
        return res.data;
    } catch(error) {
        console.log(error);
    }
});

export const login = createAsyncThunk("auth/login", async({ email, password }) => {
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default authSlice.reducer;
