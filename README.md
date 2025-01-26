# NLP Spotify Playlist Curator

This project leverages Natural Language Processing (NLP) and the Spotify API to generate Spotify playlists based on a user's textual description of their desired mood and their existing liked songs. The application comprises a Next.js frontend and a FastAPI backend (Python). The backend utilizes the Google Gemini API for NLP tasks and a custom similarity algorithm to match user preferences with their liked tracks.  The frontend manages user authentication, data retrieval, and playlist generation initiation. The generated playlist is returned as JSON data but isn't yet visually displayed in the UI.


## Features

* **Secure Spotify Authentication:** Uses the Authorization Code Flow with PKCE for secure access to user Spotify accounts.  Access and refresh tokens are managed for persistent access.
* **Efficient Liked Tracks Retrieval:** Retrieves all saved tracks from the user's Spotify library, handling pagination efficiently.
* **NLP-powered Playlist Mood Analysis:** Analyzes user text descriptions (e.g., "energetic workout playlist") using the Google Gemini API to extract audio features representing the desired mood and suggest relevant genres.
* **Custom Audio Feature Matching Algorithm:** A sophisticated algorithm compares extracted audio features from NLP analysis with the audio features of the user's saved tracks, ranking tracks by similarity scores (prioritizing energy and valence).
* **Playlist Generation:** The backend generates a playlist of track IDs.
* **Intuitive Next.js Frontend:** Provides a user-friendly interface for connecting a Spotify account and inputting playlist descriptions.
* **Dark Mode Support:** Implicitly supported through Next.js and Tailwind CSS.



## Usage

1.  Open `http://localhost:3000` in your browser.
2.  Click "Connect with Spotify" to authenticate. You'll be redirected to Spotify for authorization.
3.  After successful authorization, enter a sentence describing your desired playlist mood (e.g., "chill lofi beats for studying").
4.  Click "Generate Playlist". The app will fetch your liked songs and send the description and track data to the backend.
5.  The backend returns a JSON response (currently logged to the console, not visually displayed).



## Installation

This project needs Node.js (version 16 or higher recommended) and Python 3.10+.  Use virtual environments for both frontend and backend dependencies.  Obtain API keys for Spotify and Google Gemini.

**Backend (Python):**

1.  Clone the repository: `git clone <repository_url>`
2.  Navigate: `cd spotify-playlist-curator/lib/python`
3.  Create a virtual environment:
    ```bash
    python3.10 -m venv venv
    source venv/bin/activate  # Linux/macOS
    venv\Scripts\activate  # Windows
    ```
4.  Install dependencies: `pip install -r requirements.txt`
5.  Set environment variables: Create a `.env` file and add:
    ```
    GOOGLE_API_KEY=<your_api_key>
    SPOTIFY_CLIENT_ID=<your_client_id>
    SPOTIFY_CLIENT_SECRET=<your_client_secret> # Optional - For Refresh Token Implementation
    ```

**Frontend (Next.js):**

1.  Navigate: `cd ../../..`
2.  Install dependencies:  `npm install` or `yarn install` or `pnpm install` or `bun install`
3.  Set environment variables: Add to your `.env.local` file:
    ```
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID=<your_client_id>
    NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=<your_redirect_uri>
    ```

**Running:**

1.  Start the backend: `cd spotify-playlist-curator/lib/python; python server.py`
2.  Start the frontend: `cd ../../..; npm run dev` (or yarn/pnpm/bun)
3. Open `http://localhost:3000`



## Technologies Used

* **Frontend:** Next.js, Axios, Tailwind CSS, crypto-js
* **Backend:** FastAPI, uvicorn, Pydantic, NumPy, google-generativeai, python-dotenv



## Configuration

**Backend (.env file in `spotify-playlist-curator/lib/python`):**

*   `GOOGLE_API_KEY`: Your Google Gemini API key.
*   `SPOTIFY_CLIENT_ID`: Your Spotify Client ID.
*   `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret (optional).

**Frontend (.env.local file in the root directory):**

*   `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`: Your Spotify Client ID.
*   `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI`: Your Spotify Redirect URI (e.g., `http://localhost:3000/api/callback`).



## API Documentation

**Endpoint:** `/api/analyze`

**Method:** `POST`

**Request Body (JSON):**

```json
{
  "sentence": "a chill lofi playlist for studying",
  "tracks": [
    {
      "id": "track_id_1",
      "features": {
        "acousticness": 0.8,
        "danceability": 0.3,
        "energy": 0.2,
        "instrumentalness": 0.9,
        // ...other audio features
      }
    },
    {
      "id": "track_id_2",
      "features": {
        "acousticness": 0.5,
        "danceability": 0.6,
        "energy": 0.7,
        "instrumentalness": 0.1,
        // ...other audio features
      }
    }
    // ...more tracks
  ]
}
```

**Response Body (JSON):**

```json
{
  "analysis": {
    "audioFeatures": {
      "acousticness": 0.7,
      "danceability": 0.4,
      "energy": 0.3,
      // ...other audio features
    },
    "genres": ["lofi", "chillhop", "ambient"]
  },
  "matching_tracks": ["track_id_x", "track_id_y", ...]
}
```



## Dependencies

**Frontend (`package.json`):**

*   Next.js
*   Axios
*   Tailwind CSS
*   crypto-js

**Backend (`requirements.txt`):**

*   FastAPI
*   uvicorn
*   Pydantic
*   NumPy
*   google-generativeai
*   python-dotenv
