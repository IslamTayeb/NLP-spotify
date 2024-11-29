# NLP Spotify Playlist Curator

## 1. Project Overview

This project leverages Natural Language Processing (NLP) to enhance Spotify playlist curation.  Users provide a textual description of their desired playlist mood, and the application generates a playlist based on their Spotify liked songs.  The backend uses a Python server with a Google Gemini API for NLP analysis and a custom similarity algorithm to match user descriptions with audio features of saved tracks. The frontend is built with Next.js.


## 2. Main Features and Functionality

* **Spotify Authentication:** Securely connects to the user's Spotify account using the Authorization Code Flow with PKCE for enhanced security.
* **Liked Tracks Retrieval:** Fetches all the user's saved tracks from their Spotify library.  Handles pagination and token refreshing efficiently.
* **NLP-driven Playlist Generation:**  Accepts a user-provided sentence describing the desired playlist mood. This sentence is sent to a Python backend utilizing the Google Gemini API for NLP analysis to extract relevant musical characteristics and genres.
* **Audio Feature Matching:** The backend uses a custom algorithm to compare the extracted audio features with those of the user's liked tracks and select the best matches based on weighted similarity.
* **Playlist Output:** Returns a list of track IDs representing the generated playlist (currently not displayed in the UI, but the groundwork is in place).
* **Frontend:** A user-friendly Next.js application provides the interface for connecting with Spotify and inputting the playlist description.

## 3. Setup and Installation Instructions

This project requires Node.js and Python 3.10+.  A virtual environment is recommended for Python dependencies.

**Backend (Python):**

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd spotify-playlist-curator/lib/python
    ```
3.  **Create a virtual environment (recommended):**
    ```bash
    python3.10 -m venv venv  # Or your preferred virtual environment creation method
    source venv/bin/activate  # Activate the virtual environment
    ```
4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
5. **Set GOOGLE_API_KEY:** Add your Google Gemini API key to a `.env` file in the `spotify-playlist-curator/lib/python` directory.  The `.env` file should contain:
    ```
    GOOGLE_API_KEY=<your_api_key>
    ```

**Frontend (Next.js):**

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../../..
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

**Start the Backend:**

```bash
cd spotify-playlist-curator/lib/python
python server.py
```

**Start the Frontend:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 4. Usage Guide

1.  Open [http://localhost:3000](http://localhost:3000) in your browser.
2.  Click "Connect with Spotify" to authenticate. You will be redirected to Spotify for authorization.
3.  After successfully connecting, enter a sentence describing the desired playlist mood into the text area.
4.  Click "Generate Playlist".  The application will fetch your liked tracks and send the description and track data to the backend for analysis. The generated playlist (list of track IDs) will then be available  (currently not shown in the UI).


## 5. Dependencies

**Frontend (Next.js):**

*   Next.js
*   Axios
*   Tailwind CSS
*   (Other Next.js dependencies as listed in `package.json`)

**Backend (Python):**

*   FastAPI
*   uvicorn
*   Pydantic
*   NumPy
*   Google Generative AI
*   `python-dotenv`
*   (Other Python dependencies as listed in `requirements.txt`)


## 6. How to Contribute

1.  **Fork** the repository.
2.  **Create a new branch:** `git checkout -b <feature_name>`
3.  **Make your changes** and commit them: `git commit -m "<your_message>"`
4.  **Push** the branch: `git push origin <feature_name>`
5.  **Create a pull request** detailing your changes.  Please follow the existing coding style and include tests where applicable.  Ensure the application remains functional after your changes.
