import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMyInfo = createAsyncThunk("user/me", async(email) => {
    // console.log(email);
    try {
        const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/user/me", email );
        return res.data;
    } catch(error) {
        console.log(error);
    }
});

// export const getMyInfo = createAsyncThunk("user/me", async(email) => {
//     try {
//         const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/user/me", { email });
//         console.log(res.data.user);
//         return res.data;
//     } catch(error) {
//         console.log(error);
//     }
// });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMyInfo.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getMyInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            // console.log(state.data);
        }).addCase(getMyInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default userSlice.reducer;