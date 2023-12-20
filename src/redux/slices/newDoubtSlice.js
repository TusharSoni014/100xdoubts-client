import { createSlice } from "@reduxjs/toolkit";

const doubtPostSlice = createSlice({
  name: "doubtPostSlice",
  initialState: {
    title: "",
    description: "",
    topic: "",
  },
  reducers: {
    updatePostTitle: (state, action) => {
      state.title = action.payload;
    },
    updatePostDescription: (state, action) => {
      state.description = action.payload;
    },
    updatePostTopic: (state, action) => {
      state.topic = action.payload;
    },
  },
});

export const { updatePostDescription, updatePostTitle, updatePostTopic } =
  doubtPostSlice.actions;
export default doubtPostSlice.reducer;
