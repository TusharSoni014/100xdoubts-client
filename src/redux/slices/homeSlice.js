import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleCatch } from "../../utils/utilFunctions";
import axiosClient from "../../utils/axiosClient";

export const fetchLatestPosts = createAsyncThunk(
  "fetchLatestPosts",
  async (body) => {
    const { page } = body;
    try {
      const response = await axiosClient.get(`/get-all-posts/${page}`);
      return { posts: response.data };
    } catch (error) {
      handleCatch(error);
    }
  }
);
export const fetchLoadMorePosts = createAsyncThunk(
  "fetchLoadMorePosts",
  async (body) => {
    const { page } = body;
    try {
      const response = await axiosClient.get(`/get-all-posts/${page}`);
      return { posts: response.data };
    } catch (error) {
      handleCatch(error);
    }
  }
);

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    allPosts: [],
    page: 1,
    loading: false,
    loadMoreLoading: false,
    isMorePostAvailable: true,
  },
  reducers: {
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updatePageLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateLoadMoreLoading: (state, action) => {
      state.loadMoreLoading = action.payload;
    },
    updateIsMorePostAvailable: (state, action) => {
      state.isMorePostAvailable = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestPosts.fulfilled, (state, action) => {
        const newPosts = action.payload.posts.filter((newPost) => {
          return !state.allPosts.some(
            (existingPost) => existingPost.url === newPost.url
          );
        });
        state.allPosts = [...state.allPosts, ...newPosts];
        state.loading = false;
      })
      .addCase(fetchLatestPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchLoadMorePosts.fulfilled, (state, action) => {
        const newPosts = action.payload.posts.filter((newPost) => {
          return !state.allPosts.some(
            (existingPost) => existingPost.url === newPost.url
          );
        });
        state.allPosts = [...state.allPosts, ...newPosts];
        state.loadMoreLoading = false;
      })
      .addCase(fetchLoadMorePosts.pending, (state) => {
        state.loadMoreLoading = true;
      })
      .addCase(fetchLoadMorePosts.rejected, (state) => {
        state.loadMoreLoading = false;
      });
  },
});

export const {
  updatePage,
  updatePageLoading,
  updateLoadMoreLoading,
  updateIsMorePostAvailable,
} = homeSlice.actions;
export default homeSlice.reducer;
