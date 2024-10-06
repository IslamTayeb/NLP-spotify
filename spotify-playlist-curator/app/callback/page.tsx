// src/app/callback/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { exchangeToken, initiateSpotifyAuth } from "@/lib/spotifyAuth";

export default function Callback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      exchangeToken(code)
        .then(() => {
          router.push('/');
        })
        .catch((error) => {
          console.error('Authentication error:', error);
          router.push('/?error=authentication_failed');
        });
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Connecting to Spotify...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
      </div>
    </div>
  );
}
