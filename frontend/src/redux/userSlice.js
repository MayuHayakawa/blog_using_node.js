import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMyInfo = createAsyncThunk("user/me", async({ token, email }) => {
    try {
        const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/user/me", { email: email }, { headers: { authentization: token } });
        console.log(res.data);
        return res.data;
    } catch(error) {
        console.log(error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userid: "",
        username: "",
        email: "",
        password: "",
        articles: [],
        like: []
    },
    reducers: {}
});

export default userSlice.reducers;