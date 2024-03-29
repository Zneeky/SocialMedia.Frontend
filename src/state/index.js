import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  profile:null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.profile= action.payload.profile;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.profile= null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.FollowedUsers = action.payload.FollowedUsers;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setProfile:(state, action) =>{
      state.profile= action.payload.profile;
    },
    removePost: (state, action) => {
      state.posts.$values = state.posts.$values.filter(post => post.PostId !== action.payload);
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setProfile, removePost } =
  authSlice.actions;
export default authSlice.reducer;
