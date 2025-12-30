import { createSlice } from '@reduxjs/toolkit'


export interface CounterState {
  usersPosts: ({ postId: number, reposted: boolean, commented: boolean, liked: boolean, userLogo: string, name: string, userName: string, data: string, text: string, userImg: string, like: number, repost: number, comment: number }
  )[]
  users: ({ name: string, userName: string })[]
}



const initialState: CounterState = {
  usersPosts: [{
    postId: 1, reposted: false, commented: false, liked: false,
    userLogo: "https://picsum.photos/200/200?random1", name: "Lara", userName: "laraGG",
    data: "24 September 2025", text: "I miss my shool", userImg: "https://picsum.photos/200/200?random2",
    like: 1, repost: 1, comment: 1
  },
  {
    postId: 12, reposted: false, commented: false, liked: false,
    userLogo: "https://picsum.photos/200/200?random3", name: "Mark", userName: "Avreliy",
    data: "14 December 2025", text: "This is so funny", userImg: "https://picsum.photos/200/200?random4",
    like: 2, repost: 2, comment: 2
  },
  {
    postId: 23, reposted: false, commented: false, liked: false,
    userLogo: "https://picsum.photos/200/200?random5", name: "Dante", userName: "Aligyery",
    data: "9 October 2025", text: "Remember this day", userImg: "https://picsum.photos/200/200?random6",
    like: 3, repost: 3, comment: 3
  }],
  users: [{ name: "Lara", userName: "laraGG" },
  { name: "Mark", userName: "Avreliy" },
  { name: "Dante", userName: "Aligyery" }]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    UserSlice: (state, action) => {
      state.users.push(action.payload);
    },

    PostSlice: (state, action) => {
      state.usersPosts.unshift(action.payload);
    },

    LikeSlice: (state, action) => {
      const post = state.usersPosts.find(p => p.postId === action.payload);
      if (post) {
        if (!post.liked) {
          post.like += 1;
          post.liked = true;
        }
        else {
          post.like -= 1;
          post.liked = false;
        }
      }
    },
    CommentSlice: (state, action) => {
      const post = state.usersPosts.find(p => p.postId === action.payload);
      if (post) {
        if (!post.commented) {
          post.comment += 1;
          post.commented = true;
        }
        else {
          post.comment -= 1;
          post.commented = false;
        }
      }
    },

    RepostSlice: (state, action) => {
      const post = state.usersPosts.find(p => p.postId === action.payload);
      if (post) {
        if (!post.reposted) {
          post.repost += 1;
          post.reposted = true;
        }
        else {
          post.repost -= 1;
          post.reposted = false;
        }
      }
    },

  }
})

export const { UserSlice, PostSlice, LikeSlice, CommentSlice, RepostSlice } = counterSlice.actions

export default counterSlice.reducer