from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .analyzer import PlaylistAnalyzer, AnalysisRequest

app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
async def analyze_playlist(request: AnalysisRequest):
    analyzer = PlaylistAnalyzer()
    analysis = await analyzer.analyze_sentence(request.sentence)
    matching_tracks = analyzer.find_matching_tracks(
        request.tracks,
        analysis['audioFeatures']
    )

    return {
        "analysis": analysis,
        "matching_tracks": matching_tracks
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
