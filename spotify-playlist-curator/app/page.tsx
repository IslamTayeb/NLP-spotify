// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { initiateSpotifyAuth } from "@/lib/spotifyAuth";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsAuthenticated(!!accessToken);
  }, []);

  return (
    <div className="min-h-screen bg-gray-400">
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-black">
            Sentence to Spotify Playlist
          </h1>

          {!isAuthenticated ? (
            <button
              onClick={() => initiateSpotifyAuth()}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Connect with Spotify
            </button>
          ) : (
            <div className="space-y-4">
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Describe your playlist mood..."
                rows={4}
              />
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
                Generate Playlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
