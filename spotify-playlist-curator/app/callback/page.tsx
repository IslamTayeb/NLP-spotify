// src/app/callback/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { exchangeToken } from "@/lib/spotifyAuth";

export default function Callback() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search); // Get the query params
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      exchangeToken(code)
        .then((tokenData) => {
          // Store the access token in localStorage
          localStorage.setItem("access_token", tokenData.access_token);
          if (tokenData.refresh_token) {
            localStorage.setItem("refresh_token", tokenData.refresh_token);
          }
          router.push("/"); // Redirect to the homepage after successful token exchange
        })
        .catch((err) => {
          console.error("Error during token exchange", err);
        });
    }
  }, [code, router]);

  return <p>Authenticating...</p>;
}
