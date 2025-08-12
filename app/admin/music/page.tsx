"use client"

import AddMusicForm from "../../../components/AddMusicForm"
import { useTheme } from "../../../contexts/ThemeContext"

export default function AdminMusicPage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen py-12 px-4 ${
      theme === "dark" 
        ? "bg-gradient-to-br from-gray-900 to-black" 
        : "bg-gradient-to-br from-gray-50 to-white"
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}>
            Music Management
          </h1>
          <p className={`text-lg ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}>
            Add new music tracks with Spotify integration
          </p>
        </div>

        <AddMusicForm />

        <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Quick Guide: Linking Spotify Tracks
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                📱 From Spotify Mobile App:
              </h3>
              <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>1. Find your track</li>
                <li>2. Tap the "..." (three dots)</li>
                <li>3. Tap "Share"</li>
                <li>4. Tap "Copy Link"</li>
                <li>5. Paste in the form above</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                💻 From Spotify Web/Desktop:
              </h3>
              <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>1. Right-click on track</li>
                <li>2. Select "Share"</li>
                <li>3. Click "Copy Song Link"</li>
                <li>4. Paste in the form above</li>
              </ol>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded border-l-4 border-yellow-500">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Note:</strong> Make sure the Spotify URL starts with "https://open.spotify.com/track/" 
              for it to work properly with the music player.
            </p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
            Example Spotify URLs:
          </h3>
          <div className="space-y-2 text-sm font-mono">
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <span className="text-green-600 dark:text-green-400">✓ Correct:</span> 
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh
              </span>
            </div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">
              <span className="text-green-600 dark:text-green-400">✓ Also works:</span> 
              <span className="ml-2 text-gray-600 dark:text-gray-300">
                https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh?si=abc123
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
