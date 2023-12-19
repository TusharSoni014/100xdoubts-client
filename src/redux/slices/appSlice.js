import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateLoginStatus: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    updateUpvotedPosts: (state, action) => {
      const postId = action.payload;
      const index = state.user.upvotedPosts.findIndex((id) => id === postId);
      if (index !== -1) {
        state.user.upvotedPosts.splice(index, 1);
      } else {
        state.user.upvotedPosts.push(postId);
      }
    },
  },
});

export const { updateUser, updateLoginStatus, updateUpvotedPosts } =
  appSlice.actions;
export default appSlice.reducer;
