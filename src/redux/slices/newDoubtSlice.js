import { createSlice } from "@reduxjs/toolkit";

const doubtPostSlice = createSlice({
  name: "doubtPostSlice",
  initialState: {
    title: "",
  },
  reducers: {
    updatePostTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { updatePostTitle } = doubtPostSlice.actions;
export default doubtPostSlice.reducer;
