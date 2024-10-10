export interface AudioFeatures {
    acousticness: number;
    danceability: number;
    energy: number;
    instrumentalness: number;
    liveness: number;
    loudness: number;
    speechiness: number;
    valence: number;
    tempo: number;
    mode: number;
}

export interface Track {
    track: {
        id: string;
        name: string;
        artists: Array<{
            name: string;
        }>;
        uri: string;
    };
    audioFeatures?: AudioFeatures;
}

export interface AnalysisResult {
    analysis: {
        audioFeatures: AudioFeatures;
        genres: string[];
    };
    matching_tracks: string[];
}

export interface TrackWithFeatures {
    id: string;
    features: AudioFeatures;
}
