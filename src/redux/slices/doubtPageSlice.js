import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleCatch } from "../../utils/utilFunctions";
import axiosClient from "../../utils/axiosClient";

export const fetchDoubtPost = createAsyncThunk(
  "fetchDoubtPost",
  async (body) => {
    const { doubtId } = body;
    try {
      const response = await axiosClient.post("/get-doubt", {
        doubtId: doubtId,
      });
      return response.data;
    } catch (error) {
      handleCatch(error);
    }
  }
);

const doubtPageSlice = createSlice({
  name: "doubtPageSlice",
  initialState: {
    doubtPostData: {},
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoubtPost.fulfilled, (state, action) => {
        state.doubtPostData = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoubtPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoubtPost.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default doubtPageSlice.reducer;
