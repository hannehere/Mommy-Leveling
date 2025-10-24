"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface Post {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  liked: boolean
  comments: number
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Sarah M.",
      avatar: "S",
      content: "Just finished my first week of sleep tracking! Baby's sleeping better already.",
      timestamp: "2h ago",
      likes: 24,
      liked: false,
      comments: 5,
    },
    {
      id: 2,
      author: "Emma L.",
      avatar: "E",
      content: "Reached Level 10 today! Celebrating with a well-deserved nap.",
      timestamp: "4h ago",
      likes: 18,
      liked: false,
      comments: 3,
    },
    {
      id: 3,
      author: "Jessica T.",
      avatar: "J",
      content: "Baby hit a new milestone - first smile! Feeling so proud.",
      timestamp: "6h ago",
      likes: 42,
      liked: false,
      comments: 8,
    },
  ])

  const toggleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-peach/20">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Community Moments</h2>

      {/* Posts */}
      <div className="space-y-4 mb-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-cream rounded-lg border border-peach/20 hover:shadow-md transition-shadow"
          >
            {/* Author */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-peach to-lavender flex items-center justify-center">
                <span className="text-sm font-bold text-white">{post.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{post.author}</p>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-700 mb-3">{post.content}</p>

            {/* Interactions */}
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex items-center gap-1 hover:text-peach transition-colors"
              >
                <Heart className={`w-4 h-4 ${post.liked ? "fill-peach text-peach" : ""}`} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-baby-blue transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-1 hover:text-mint transition-colors ml-auto">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button className="w-full py-2 bg-gradient-to-r from-peach to-lavender text-white font-semibold rounded-lg hover:shadow-lg transition-all">
        Join the Conversation
      </button>
    </div>
  )
}
