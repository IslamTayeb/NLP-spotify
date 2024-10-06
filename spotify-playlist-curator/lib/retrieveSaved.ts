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

    let allTracks: Track[] = []; // Explicitly define type for allTracks
    let nextUrl = 'https://api.spotify.com/v1/me/tracks?limit=50'; // Initial URL

    try {
      while (nextUrl) {
        const response = await axios.get(nextUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = response.data;
        allTracks = [...allTracks, ...data.items]; // Append fetched tracks to allTracks
        nextUrl = data.next; // Update nextUrl for the next batch of results
      }

      console.log("All liked tracks:", allTracks); // Log all liked tracks
      return allTracks; // Return the entire liked tracks array
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.warn("Access token expired, refreshing...");
          accessToken = await refreshAccessToken();
          return await getLikedTracks(); // Retry after refreshing token
        }
        console.error("Error fetching liked tracks:", error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw error; // Properly rethrow the error
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
