import { createSlice } from "@reduxjs/toolkit";

const doubtPostSlice = createSlice({
  name: "doubtPostSlice",
  initialState: {
    title: "",
    description: "",
    folder: "",
  },
  reducers: {
    updatePostTitle: (state, action) => {
      state.title = action.payload;
    },
    updatePostDescription: (state, action) => {
      state.description = action.payload;
    },
  },
});

export const { updatePostDescription, updatePostTitle } =
  doubtPostSlice.actions;
export default doubtPostSlice.reducer;
