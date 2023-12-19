import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleCatch } from "../../utils/utilFunctions";
import axiosClient from "../../utils/axiosClient";

export const fetchLatestPosts = createAsyncThunk(
  "fetchLatestPosts",
  async (body) => {
    const { page } = body;
    try {
      const response = await axiosClient.get(`/get-all-posts/${page}`);
      return response.data;
    } catch (error) {
      handleCatch(error);
    }
  }
);

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    allPosts: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLatestPosts.fulfilled, (state, action) => {
        state.allPosts = action.payload;
        state.loading = false;
      })
      .addCase(fetchLatestPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default homeSlice.reducer;
