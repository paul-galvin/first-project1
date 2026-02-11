import { ThumbsUp, ThumbsDown } from 'lucide-react'

export default function PostCard({ post, onClick }) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-4 sm:p-5 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 line-clamp-2">
        {post.title}
      </h3>

      <div className="flex items-center gap-4 sm:gap-6 text-sm">
        <span className="flex items-center gap-2 text-green-600">
          <ThumbsUp size={18} />
          <span className="font-medium">{post.reactions?.likes || 0}</span>
        </span>
        
        <span className="flex items-center gap-2 text-red-500">
          <ThumbsDown size={18} />
          <span className="font-medium">{post.reactions?.dislikes || 0}</span>
        </span>
      </div>
    </div>
  )
}