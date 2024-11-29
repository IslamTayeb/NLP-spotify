# NLP Spotify Playlist Curator

## 1. Project Overview

This project uses Natural Language Processing (NLP) to create Spotify playlists based on a user's textual description of their desired mood and their existing Spotify liked songs. The backend, written in Python, utilizes the Google Gemini API for NLP analysis and a custom similarity algorithm to match the user's description with the audio features of their saved tracks. The frontend is built with Next.js and provides a user-friendly interface.  The application fetches the user's liked songs, analyzes a user-provided text description, and returns a list of track IDs representing the generated playlist.  Currently, the generated playlist is not displayed in the UI, but the backend logic is complete.


## 2. Main Features and Functionality

* **Spotify Authentication:** Securely connects to the user's Spotify account using the Authorization Code Flow with PKCE.
* **Liked Tracks Retrieval:** Efficiently retrieves all the user's saved tracks from their Spotify library, handling pagination and token refresh.
* **NLP-driven Playlist Generation:** Accepts a user-provided text description of their desired playlist mood.  This description is sent to the Python backend for analysis using the Google Gemini API.
* **Audio Feature Matching:** A custom algorithm in the Python backend compares the extracted audio features from the NLP analysis with the audio features of the user's liked tracks.  Tracks are scored based on a weighted similarity metric.
* **Playlist Generation:**  The backend generates a playlist of track IDs based on the similarity scores.  This playlist is currently returned as JSON data (not yet displayed on the frontend).
* **Frontend (Next.js):** A user-friendly interface for connecting to Spotify and inputting the playlist description.  Uses Tailwind CSS for styling.


## 3. Setup and Installation Instructions

This project requires Node.js (version 16 or higher recommended) and Python 3.10+.  A virtual environment is strongly recommended for managing Python dependencies.

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
   ```

**Frontend (Next.js):**

1. **Navigate to the frontend directory:**
   ```bash
   cd ../../..
   ```

2. **Install Node.js dependencies:**  Choose one of the following package managers:
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
3. After successful connection, enter a sentence describing your desired playlist mood in the text area.
4. Click "Generate Playlist". The application will fetch your liked tracks and send the description and track data to the backend for processing. The generated playlist (a list of track IDs) will be returned by the server (currently not displayed in the UI).


## 5. Dependencies

**Frontend (Next.js, located in `spotify-playlist-curator/package.json`):**

* Next.js
* Axios
* Tailwind CSS
* ... (other dependencies listed in `package.json`)

**Backend (Python, located in `spotify-playlist-curator/lib/python/requirements.txt`):**

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
5. **Create a pull request** explaining your changes.  Adhere to the existing coding style, include thorough tests where applicable, and ensure the application remains fully functional.

