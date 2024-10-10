import { AudioFeatures, Track, AnalysisResult, TrackWithFeatures } from './types';

export class PlaylistCurator {
    private readonly API_URL = 'http://localhost:8000';  // Add this line

    async generatePlaylist(sentence: string, tracks: Track[]): Promise<Track[]> {
        const tracksWithFeatures = await this.fetchAudioFeatures(tracks);

        // Update the fetch URL to use the Python server
        const response = await fetch(`${this.API_URL}/api/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sentence,
                tracks: tracksWithFeatures.map(track => ({
                    id: track.track.id,
                    features: track.audioFeatures
                }))
            })
        });

        if (!response.ok) {
            throw new Error('Analysis failed');
        }

        const result: AnalysisResult = await response.json();

        return tracks.filter(track =>
            result.matching_tracks.includes(track.track.id)
        );
    }

    private async fetchAudioFeatures(tracks: Track[]): Promise<Track[]> {
        // Get audio features in batches of 100 (Spotify API limit)
        const batchSize = 100;
        const batches = Math.ceil(tracks.length / batchSize);
        const allFeatures: AudioFeatures[] = [];

        for (let i = 0; i < batches; i++) {
            const start = i * batchSize;
            const end = start + batchSize;
            const batchTracks = tracks.slice(start, end);

            const ids = batchTracks.map(track => track.track.id).join(',');
            const response = await fetch(`/api/spotify/audio-features?ids=${ids}`);

            if (!response.ok) {
                throw new Error('Failed to fetch audio features');
            }

            const { audio_features } = await response.json();
            allFeatures.push(...audio_features);
        }

        // Combine tracks with their audio features
        return tracks.map((track, index) => ({
            ...track,
            audioFeatures: allFeatures[index]
        }));
    }

    private calculateSimilarity(features1: AudioFeatures, features2: AudioFeatures): number {
        const weights = {
            acousticness: 1.0,
            danceability: 1.0,
            energy: 1.5,
            instrumentalness: 0.8,
            liveness: 0.5,
            speechiness: 0.8,
            valence: 1.5,
            tempo: 0.5
        };

        let totalDiff = 0;
        let totalWeight = 0;

        for (const [key, weight] of Object.entries(weights)) {
            const k = key as keyof typeof weights;
            const diff = Math.abs(features1[k] - features2[k]);
            totalDiff += diff * weight;
            totalWeight += weight;
        }

        return 1 - (totalDiff / totalWeight);
    }
}
