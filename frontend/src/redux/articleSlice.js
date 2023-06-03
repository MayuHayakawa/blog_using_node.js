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
    reducers: {
        createPost: (state, action) => {
            state.data.push(action.payload);
        },
        updataPost: (state, action) => {
            state.data.map((article) => {
                if(article.articleid === action.payload.articleid) {
                    article.title = action.payload.title;
                    article.content = action.payload.content;
                }
            });
        },
        updataLikedList: (state, action) => {
            console.log(state.data);
            state.data.map((article) => {
                console.log(article);
                if(article.articleid === action.payload.articleid) {
                    if(article.liked.includes(action.payload.userid)) {
                        console.log('remove from list');
                        article.liked = article.liked.filter((item) => item != action.payload.userid);
                    } else {
                        console.log('add to list');
                        article.liked.push(action.payload.userid);
                    }
                }
            })
        },
        addCommentList: (state, action) => {
            state.data.map((article) => {
                if(article.articleid === action.payload.articleid) {
                    article.comment.push(action.payload);
                }
            });
        },
        deletePost: (state, action) => {
            state.data = state.data.filter((article) => article.articleid != action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllArticles.pending, (state) => {
            state.loading = true;
            state.error = null;
        }).addCase(getAllArticles.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        }).addCase(getAllArticles.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export const { createPost, updataPost, updataLikedList, addCommentList, deletePost } = articleSlice.actions;
export default articleSlice.reducer;

