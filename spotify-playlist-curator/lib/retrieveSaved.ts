// utils/spotify.ts
import axios from 'axios';
import { spotifyConfig } from './spotifyAuth';

// Define the Track interface
interface Track {
    track: {
      id: string;
      name: string;
      artists: { name: string }[];
    };
  }

// getLikedTracks function
export const getLikedTracks = async (): Promise<Track[]> => {
  let accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("No access token found");
  }

  let allTracks: Track[] = [];
  let nextUrl = 'https://api.spotify.com/v1/me/tracks?limit=50'; // Initial URL

  try {
    while (nextUrl) {
      const response = await axios.get(nextUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data;
      allTracks = [...allTracks, ...data.items];
      nextUrl = data.next;
    }

    // Save all tracks to localStorage as a JSON string
    localStorage.setItem("liked_tracks", JSON.stringify(allTracks));

    // console.log("All liked tracks saved to localStorage:", allTracks);
    return allTracks;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.warn("Access token expired, refreshing...");
        accessToken = await refreshAccessToken();
        return await getLikedTracks();
      }
      console.error("Error fetching liked tracks:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
    throw error;
  }
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        throw new Error("No refresh token found");
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: spotifyConfig.clientId,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Failed to refresh token');
    }

    localStorage.setItem('access_token', data.access_token); // Update access token
    return data.access_token;
};
