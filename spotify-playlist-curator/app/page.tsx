"use client";
import { useEffect, useState } from "react";
import { initiateSpotifyAuth } from "@/lib/spotifyAuth";
import { getLikedTracks } from "@/lib/retrieveSaved";

// Define the Track type based on Spotify's response structure
interface Track {
  track: {
    id: string;
    name: string;
    artists: { name: string }[];
  };
}

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]); // Set the correct type for tracks
  const [error, setError] = useState<string | null>(null); // Allow error to be a string or null

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    setIsAuthenticated(!!accessToken);
  }, []);

  const fetchLikedTracks = async () => {
    try {
      const likedTracks = await getLikedTracks(); // Fetch liked tracks using the stored token
      setTracks(likedTracks); // Store the fetched tracks in state
    } catch (error) {
      console.error(error);
      setError("Failed to fetch liked tracks."); // Set error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-400">
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-black">
            Sentence to Spotify Playlist
          </h1>

          {!isAuthenticated ? (
            <button
              onClick={initiateSpotifyAuth}
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
              <button
                onClick={fetchLikedTracks} // Trigger fetching liked tracks
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
              >
                Generate Playlist
              </button>
              {error && <p className="text-red-500">{error}</p>}
              {tracks.length > 0 && (
                <ul className="mt-4">
                  {tracks.map((track) => (
                    <li key={track.track.id}>
                      {track.track.name} by {track.track.artists[0].name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
