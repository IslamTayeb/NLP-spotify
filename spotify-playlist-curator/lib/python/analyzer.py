import numpy as np
from typing import Dict, List, TypedDict
import google.generativeai as genai
from fastapi import HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

class AudioFeatures(TypedDict):
    acousticness: float
    danceability: float
    energy: float
    instrumentalness: float
    liveness: float
    loudness: float
    speechiness: float
    valence: float
    tempo: float
    mode: int

class TrackFeatures(BaseModel):
    id: str
    features: AudioFeatures

class AnalysisRequest(BaseModel):
    sentence: str
    tracks: List[TrackFeatures]

class PlaylistAnalyzer:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY environment variable not set")
        self.genai = genai.GenerativeModel('gemini-pro')
        self.valid_genres = {
            "acoustic", "afrobeat", "alt-rock", "alternative", "ambient",
            # ... (rest of your genres)
        }

        self.feature_weights = {
            'acousticness': 1.0,
            'danceability': 1.0,
            'energy': 1.5,
            'instrumentalness': 0.8,
            'liveness': 0.5,
            'speechiness': 0.8,
            'valence': 1.5,
            'tempo': 0.5
        }

    async def analyze_sentence(self, sentence: str) -> Dict:
        prompt = f"""
        Analyze the following sentence and extract musical characteristics and genres.
        Sentence: "{sentence}"

        Provide a JSON response with two parts:
        1. Audio features (all values must be within specified ranges):
          - acousticness (0-1): how acoustic the playlist should be
          - danceability (0-1): how suitable for dancing
          - energy (0-1): intensity and activity level
          - instrumentalness (0-1): likelihood of no vocals
          - liveness (0-1): presence of live performance elements
          - loudness (-60-0): overall loudness in dB
          - speechiness (0-1): presence of spoken words
          - valence (0-1): musical positiveness
          - tempo (40-200): speed of the music in BPM
          - mode (0 for minor, 1 for major): overall tonality

        2. Up to 5 most relevant genres from: {', '.join(self.valid_genres)}

        Consider the emotional content, style descriptions, and explicit mentions in the sentence.
        """

        try:
            response = await self.genai.generate_content(prompt)
            result = response.text

            # Extract JSON from response
            import json
            start_idx = result.find('{')
            end_idx = result.rfind('}') + 1
            json_str = result[start_idx:end_idx]

            analysis = json.loads(json_str)
            return self._validate_analysis(analysis)

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

    def _validate_analysis(self, analysis: Dict) -> Dict:
        """Validate and normalize the analysis results."""
        features = analysis['audioFeatures']

        # Clamp values to valid ranges
        normalized = {
            'acousticness': np.clip(features['acousticness'], 0, 1),
            'danceability': np.clip(features['danceability'], 0, 1),
            'energy': np.clip(features['energy'], 0, 1),
            'instrumentalness': np.clip(features['instrumentalness'], 0, 1),
            'liveness': np.clip(features['liveness'], 0, 1),
            'loudness': np.clip(features['loudness'], -60, 0),
            'speechiness': np.clip(features['speechiness'], 0, 1),
            'valence': np.clip(features['valence'], 0, 1),
            'tempo': np.clip(features['tempo'], 40, 200),
            'mode': 1 if features['mode'] > 0.5 else 0
        }

        # Validate genres
        valid_genres = [g for g in analysis['genres'] if g in self.valid_genres][:5]

        return {
            'audioFeatures': normalized,
            'genres': valid_genres
        }

    def find_matching_tracks(self,
                           tracks: List[TrackFeatures],
                           target_features: Dict[str, float],
                           num_tracks: int = 30) -> List[str]:
        """Find the best matching tracks using weighted feature similarity."""

        # Convert features to numpy arrays for efficient computation
        feature_names = list(self.feature_weights.keys())

        # Normalize tempo to 0-1 range for fair comparison
        target_tempo_norm = (target_features['tempo'] - 40) / 160

        # Create target feature vector
        target_vector = np.array([
            target_features[feat] if feat != 'tempo' else target_tempo_norm
            for feat in feature_names
        ])

        # Calculate similarities for all tracks
        similarities = []
        for track in tracks:
            track_tempo_norm = (track.features['tempo'] - 40) / 160
            track_vector = np.array([
                track.features[feat] if feat != 'tempo' else track_tempo_norm
                for feat in feature_names
            ])

            # Calculate weighted Euclidean distance
            weights = np.array([self.feature_weights[feat] for feat in feature_names])
            distance = np.sqrt(np.sum(weights * (track_vector - target_vector) ** 2))

            # Convert distance to similarity score
            similarity = 1 / (1 + distance)
            similarities.append((track.id, similarity))

        # Sort by similarity and return top tracks
        similarities.sort(key=lambda x: x[1], reverse=True)
        return [track_id for track_id, _ in similarities[:num_tracks]]

app = FastAPI()

@app.post("/analyze")
async def analyze_playlist(request: AnalysisRequest):
    analyzer = PlaylistAnalyzer(api_key="your_api_key_here")

    # Analyze the sentence
    analysis = await analyzer.analyze_sentence(request.sentence)

    # Find matching tracks
    matching_tracks = analyzer.find_matching_tracks(
        request.tracks,
        analysis['audioFeatures']
    )

    return {
        "analysis": analysis,
        "matching_tracks": matching_tracks
    }
