import { useState } from 'react'
import { usePostStore } from '../store/usePostStore'
import { X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CreatePostModal() {
  const {
    createPostModalOpen,
    createPostLoading,
    closeCreatePostModal,
    createPost
  } = usePostStore()

  const [title, setTitle] = useState('')
  const [userId, setUserId] = useState('')
     
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !userId.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    if (isNaN(Number(userId)) || Number(userId) <= 0) {
      toast.error('Please enter a Valid User ID')
      return
    }

    const result = await createPost(title.trim(), userId)

    if (result.success) {
      toast.success('Post Created successfully!')
      setTitle('')
      setUserId('')
    } else {
      toast.error('Failed to create post.Please try again.')
    }
  }

  const handleClose = () => {
    setTitle('')
    setUserId('')
    closeCreatePostModal()
  }

  if (!createPostModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create New Post</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={createPostLoading}
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={createPostLoading}
            />
          </div>
           

          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
             Add New UserID
            </label>
            <input
              type="number"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter user ID..."
              min="1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={createPostLoading}
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              disabled={createPostLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={createPostLoading}
            >
              {createPostLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Adding...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}