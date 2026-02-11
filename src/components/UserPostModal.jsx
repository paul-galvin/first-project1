import { X, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react'
import { usePostStore } from '../store/usePostStore'

export default function UserPostsModal() {
  const { userPosts, userPostsLoading, userPostsError, modalOpen, closeModal } = usePostStore()

  if (!modalOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={closeModal}
    >
       <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      > 
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">User Posts</h2>
          <button 
            onClick={closeModal}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="p-3 sm:p-4 overflow-y-auto max-h-[calc(90vh-64px)] sm:max-h-[calc(80vh-80px)]">
          {userPostsLoading && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
          )}

          {userPostsError && (
            <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base">
              Error: {userPostsError}
            </div>
          )}

          {!userPostsLoading && !userPostsError && (
            <div className="space-y-3 sm:space-y-4">

              {userPosts.map((post) => (
                <div key={post.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-600">
                      <ThumbsUp size={16} />
                      <span>{post.reactions?.likes || 0}</span>
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <ThumbsDown size={16} />
                      <span>{post.reactions?.dislikes || 0}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
