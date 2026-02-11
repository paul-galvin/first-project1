import { create } from 'zustand'

export const usePostStore = create((set) => ({
  posts: [],
  loading: false,
  error: null,
  
  // userModalState
  userPosts: [],
  userPostsLoading: false,
  userPostsError: null,
  modalOpen: false,

  // CreatePostModal  
  createPostLoading: false,
  createPostError:null,

  // create post modal action
  openCreatePostModal: () => set({ createPostModalOpen: true }),
  closeCreatePostModal: () => set({ createPostModalOpen: false, createPostError: null }),

  // posts fetch
  fetchPosts: async () => {
    set({ loading: true, error: null })
    try {
      const res = await fetch('https://dummyjson.com/posts')
      if (!res.ok)
         throw new Error('Failed to fetch posts')
      const data = await res.json()
      set({ posts: data.posts, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

// userId posts
  fetchUserPosts: async (userId) => {
    set({ userPostsLoading: true, userPostsError: null, userPosts: [], modalOpen: true })
    try {
      const res = await fetch(`https://dummyjson.com/posts/user/${userId}`)
      if (!res.ok)
         throw new Error('Failed to fetch user posts')
      const data = await res.json()
      set({ userPosts: data.posts, userPostsLoading: false })
    } catch (err) {
      set({ userPostsError: err.message, userPostsLoading: false })
    }
  },

  
// add posts
    createPost: async (title, userId) => {
    set({ createPostLoading: true, createPostError: null })
    try {
      const res = await fetch('https://dummyjson.com/posts/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, userId: Number(userId) })
      })
      if (!res.ok)
        throw new Error('failed to create post')
      const data = await res.json()
      set((state) => ({
        posts: [data, ...state.posts],
        createPostLoading: false,
        createPostModalOpen: false
      }))
      return { success: true, data }
    } catch (err) {
      set({ createPostError: err.message, createPostLoading: false })
      return { success: false, error: err.message }
    }
  },

  closeModal: () => {
    set({ modalOpen: false, userPosts: [], userPostsError: null })
  },
}))
