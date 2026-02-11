import { useEffect } from 'react'
import { usePostStore } from './store/usePostStore'
import PostCard from './components/PostCard'
import UserPostsModal from './components/UserPostModal'
import CreatePostModal from './components/CreatePostModal'
import { Plus } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const { posts, loading, error, fetchPosts, fetchUserPosts, openCreatePostModal } = usePostStore()

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="bottom-right" />

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Posts Listing
          </h1>

          <button
            onClick={openCreatePostModal}
            className="absolute right-4 sm:right-6 lg:right-8 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Post</span>
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        {loading && (
          <div className="text-center py-8">Loading...</div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                post={post} 
                onClick={() => fetchUserPosts(post.userId)}
              />
            ))}
          </div>
        )}
      </main>
      <UserPostsModal />
      <CreatePostModal />
    </div>
  )
}
