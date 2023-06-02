import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllArticles = createAsyncThunk("article/all", async() => {
    try {
        const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/article/all");
        // console.log(res.data);
        return res.data.articles;
    } catch(error) {
        console.log(error);
    }
});

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        data: [],
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllArticles.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getAllArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            // console.log(state.data);
        }).addCase(getAllArticles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default articleSlice.reducer;

