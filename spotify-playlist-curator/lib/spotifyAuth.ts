// src/lib/spotify-auth.ts
export const generateRandomString = (length: number): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  };

  export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  export const base64encode = (input: ArrayBuffer): string => {
    const uintArray = new Uint8Array(input);
    const numberArray = Array.from(uintArray);
    const chars = numberArray.map(byte => String.fromCharCode(byte)).join('');
    return btoa(chars)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const getEnvVariable = (key: string): string => {
    const value = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
  };

  // Environment variables interface
  interface SpotifyConfig {
    clientId: string;
    redirectUri: string;
    scope: string;
  }

  // Spotify configuration with environment variables
  export const spotifyConfig: SpotifyConfig = {
    clientId: getEnvVariable('NEXT_PUBLIC_SPOTIFY_CLIENT_ID'),
    redirectUri: getEnvVariable('NEXT_PUBLIC_SPOTIFY_REDIRECT_URI'),
    scope: 'user-library-read playlist-modify-public playlist-modify-private',
  };

  // Authentication functions
  export const initiateSpotifyAuth = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Store code verifier for token exchange
    localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: spotifyConfig.clientId,
      scope: spotifyConfig.scope,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: spotifyConfig.redirectUri,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  export const exchangeToken = async (code: string) => {
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!codeVerifier) {
      throw new Error('No code verifier found');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: spotifyConfig.clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: spotifyConfig.redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to exchange token');
    }

    // Store tokens
    localStorage.setItem('access_token', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('refresh_token', data.refresh_token);
    }

    return data;
  };
