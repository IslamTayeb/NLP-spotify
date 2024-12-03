# NLP Spotify Playlist Curator


## 1. Project Overview

This project uses Natural Language Processing (NLP) and the Spotify API to create Spotify playlists based on a user's textual description of their desired mood and their existing Spotify liked songs. The application is built with a Next.js frontend and a FastAPI backend written in Python.  The backend utilizes the Google Gemini API for NLP analysis and a custom similarity algorithm to match user preferences with their liked tracks. The frontend handles user authentication, data retrieval, and (currently) displays the user input and a button to trigger playlist generation.  The generated playlist is returned as JSON data by the backend but isn't yet visually displayed in the UI.



## 2. Main Features and Functionality

* **Secure Spotify Authentication:** Employs the Authorization Code Flow with PKCE for secure access to user Spotify accounts.  Manages both access and refresh tokens for persistent access.
* **Efficient Liked Tracks Retrieval:** Retrieves all the user's saved tracks from their Spotify library, handling pagination for large libraries.
* **NLP-powered Playlist Mood Analysis:**  Analyzes a user's text description (e.g., "energetic workout playlist") using the Google Gemini API to extract audio features representing the desired mood and suggest relevant genres.
* **Custom Audio Feature Matching Algorithm:** A sophisticated algorithm compares the extracted audio features from the NLP analysis with the audio features of the user's saved tracks, ranking tracks by weighted similarity scores (prioritizing energy and valence).
* **Playlist Generation:** The backend generates a playlist of track IDs based on similarity scores and returns this list.
* **Intuitive Next.js Frontend:** Provides a user-friendly interface for connecting a Spotify account and inputting playlist descriptions.
* **Dark Mode Support:** (Implicit from Next.js and Tailwind CSS usage, but not explicitly coded in visible portions of the app)
* **Backend API:** Exposes a `/api/analyze` endpoint for the frontend to send data to and receive the generated playlist.



## security bu=erjbalk jrnabdlkjf nfdksnakjdnfkjasnfkjsdf

This project utilizes the Authorization Code Flow with PKCE for Spotify authentication, providing a robust security mechanism against unauthorized access.  Sensitive API keys (Spotify Client Secret, Google Gemini API Key) are stored in environment variables and are not directly exposed in the codebase.  The frontend only handles publicly accessible information, while sensitive operations are performed on the backend.  All communication between the frontend and backend is over HTTPS (implied by using `http://localhost:3000` in development, which resolves to HTTPS automatically when deployed on a secure server).  Further security improvements could include input validation and rate limiting.


<div align="center">
blob:http://localhost:3000/f8720057-d159-465f-9aec-e1c7bdacccf7
</div>


## 3. Setup and Installation Instructions

This project requires Node.js (version 16 or higher recommended) and Python 3.10+.  It's strongly recommended to use virtual environments for both the frontend and backend dependencies.  You will also need to obtain API keys for both Spotify and Google Gemini.

**Backend (Python):**

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to the backend directory:**
   ```bash
   cd spotify-playlist-curator/lib/python
   ```

3. **Create a virtual environment:**
   ```bash
   python3.10 -m venv venv
   source venv/bin/activate  # On Linux/macOS
   venv\Scripts\activate  # On Windows
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set environment variables:** Create a `.env` file in the `spotify-playlist-curator/lib/python` directory and add your Google Gemini API key and Spotify Client ID/Secret (if using refresh tokens)
   ```
   GOOGLE_API_KEY=<your_api_key>
   SPOTIFY_CLIENT_ID=<your_client_id>
   SPOTIFY_CLIENT_SECRET=<your_client_secret> #Optional - For Refresh Token Implementation
   ```

**Frontend (Next.js):**

1. **Navigate to the frontend directory:**
   ```bash
   cd ../../..
   ```

2. **Install Node.js dependencies:**  Choose your preferred package manager:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set environment variables:** Add your Spotify Client ID and Redirect URI to your `.env.local` file.
   ```
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=<your_client_id>
   NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=<your_redirect_uri>
   ```


**Running the Application:**

1. **Start the Backend:**
   ```bash
   cd spotify-playlist-curator/lib/python
   python server.py
   ```

2. **Start the Frontend:**
   ```bash
   cd ../../..
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) in your browser.



## 4. Usage Guide

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Click "Connect with Spotify" to authenticate. You will be redirected to Spotify for authorization.
3. After successful authorization, enter a sentence describing your desired playlist mood (e.g., "chill lofi beats for studying").
4. Click "Generate Playlist". The application will fetch your liked songs and send the description and track data to the backend for processing.
5. The backend will return a JSON response containing the analyzed mood, suggested genres, and a list of matching track IDs.  This response is currently logged to the console and not visually displayed on the frontend.



## 5. Dependencies

**Frontend (`spotify-playlist-curator/package.json`):**

* Next.js
* Axios
* Tailwind CSS
* `crypto-js` (implied for hashing in `spotifyAuth.ts`)


**Backend (`spotify-playlist-curator/lib/python/requirements.txt`):**

* FastAPI
* uvicorn
* Pydantic
* NumPy
* google-generativeai
* python-dotenv



## 6. How to Contribute

1. **Fork** the repository on GitHub.
2. **Create a new branch:** `git checkout -b <feature_name>`
3. **Make your changes** and commit them with descriptive messages.
4. **Push** your branch: `git push origin <feature_name>`
5. **Create a pull request** explaining your changes.  Adhere to the existing coding style, include thorough tests where applicable, and ensure the application remains fully functional.  A well-written pull request description is highly appreciated.  Consider adding unit tests for your changes.



## Configuration

This project requires several API keys and environment variables.  Obtain the necessary keys from the respective providers (Spotify and Google Gemini).

**Backend (.env file in `spotify-playlist-curator/lib/python`):**

* `GOOGLE_API_KEY`: Your Google Gemini API key.
* `SPOTIFY_CLIENT_ID`: Your Spotify Client ID.
* `SPOTIFY_CLIENT_SECRET`: Your Spotify Client Secret (optional, for refresh token implementation).

**Frontend (.env.local file in the root directory):**

* `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`: Your Spotify Client ID (must match the backend's ID).
* `NEXT_PUBLIC_SPOTIFY_REDIRECT_URI`: Your Spotify Redirect URI.  This should be set to the appropriate URL for your development environment (e.g., `http://localhost:3000/api/callback`).

