"use client"

import { useState, useEffect } from "react"

interface YouTubeEmbedProps {
  videoId: string
  title: string
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if the iframe loads correctly
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleError = () => {
    setError(true)
    setLoading(false)
  }

  if (error) {
    return (
      <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-center p-4">
          <p className="text-gray-500 font-medium">Video unavailable</p>
          <p className="text-sm text-gray-400">This video could not be loaded</p>
        </div>
      </div>
    )
  }

  return (
    <div className="aspect-video relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-modia-red"></div>
        </div>
      )}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        className="absolute inset-0 w-full h-full rounded-lg"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onError={handleError}
      ></iframe>
    </div>
  )
}

