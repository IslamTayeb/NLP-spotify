# NLP Spotify Playlist Curator

## 1. Project Overview

This project leverages Natural Language Processing (NLP) to generate Spotify playlists based on a user's textual description of their desired mood and their existing Spotify liked songs. The system consists of a Python backend and a Next.js frontend.

The backend, residing in the `spotify-playlist-curator/lib/python` directory, uses the Google Gemini API for NLP analysis to extract audio features and relevant genres from the user's description. A custom similarity algorithm then compares these features with the audio features of the user's saved tracks (fetched via the Spotify API).  The backend, built with FastAPI, returns a JSON response containing the analyzed audio features, suggested genres, and a list of matching track IDs.

The frontend, located in the root `spotify-playlist-curator` directory, provides a user-friendly interface built with Next.js and styled with Tailwind CSS. It handles Spotify authentication (Authorization Code Flow with PKCE), retrieves the user's liked songs, and sends the playlist description and track data to the backend for processing. Currently, the generated playlist is only returned as JSON data and not visually displayed in the UI.


## 2. Main Features and Functionality

* **Secure Spotify Authentication:**  Utilizes the Authorization Code Flow with PKCE for secure connection to the user's Spotify account.  Handles both access token retrieval and refresh token management for long-term access.
* **Efficient Liked Tracks Retrieval:**  Fetches all the user's saved tracks from their Spotify library, efficiently handling pagination to accommodate large libraries.
* **NLP-powered Playlist Mood Analysis:**  Processes a user-supplied text description (e.g., "energetic workout playlist") using the Google Gemini API to extract audio features representing the desired mood.
* **Custom Audio Feature Matching Algorithm:**  A sophisticated algorithm in the Python backend compares the extracted audio features from the NLP analysis with the audio features of the user's saved tracks.  Tracks are ranked based on a weighted similarity score, prioritizing features like energy and valence.
* **Playlist ID Generation:** The backend generates a playlist of track IDs based on the similarity scores and returns this list in the JSON response.
* **Intuitive Next.js Frontend:** Provides a clean and easy-to-use interface for users to connect their Spotify account and input their playlist description.
* **Dark Mode Support:**  The application automatically adapts to the user's system's preferred color scheme.


## 3. Setup and Installation Instructions

This project requires Node.js (version 16 or higher recommended) and Python 3.10+. A virtual environment is highly recommended for managing Python dependencies.

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

5. **Set GOOGLE_API_KEY:** Create a `.env` file in the `spotify-playlist-curator/lib/python` directory and add your Google Gemini API key:
   ```
   GOOGLE_API_KEY=<your_api_key>
   ```  (Replace `<your_api_key>` with your actual key).

**Frontend (Next.js):**

1. **Navigate to the frontend directory:**
   ```bash
   cd ../../..
   ```

2. **Install Node.js dependencies:** Choose your preferred package manager:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
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
3. After successful authorization, enter a sentence describing your desired playlist mood in the text area (e.g., "chill lofi beats for studying").
4. Click "Generate Playlist". The application will fetch your liked songs and send the description and track data to the backend for processing.
5. The backend will return a JSON response containing the analyzed mood, suggested genres, and a list of matching track IDs (currently not displayed on the frontend).


## 5. Dependencies

**Frontend (`spotify-playlist-curator/package.json`):**

* Next.js
* Axios
* Tailwind CSS
* ... (other dependencies listed in `package.json`)

**Backend (`spotify-playlist-curator/lib/python/requirements.txt`):**

* FastAPI
* uvicorn
* Pydantic
* NumPy
* google-generativeai
* python-dotenv
* ... (other dependencies listed in `requirements.txt`)


## 6. How to Contribute

1. **Fork** the repository on GitHub.
2. **Create a new branch:** `git checkout -b <feature_name>`
3. **Make your changes** and commit them with descriptive messages.
4. **Push** your branch: `git push origin <feature_name>`
5. **Create a pull request** explaining your changes. Adhere to the existing coding style, include thorough tests where applicable, and ensure the application remains fully functional.  A well-written pull request description detailing the changes and their impact is highly appreciated.
