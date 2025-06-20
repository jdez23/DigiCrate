"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Toolbar from "../components/ToolBar";
import MinecraftBackground from "@/components/MinecraftVinylBackground";

export default function HomePage() {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8000/api/combined-random-song/");
        if (!res.ok) throw new Error("Failed to fetch video");
        const data = await res.json();
        // Extract video ID from the YouTube link
        const url = data.youtube_video_link;
        const match = url && url.match(/[?&]v=([^&]+)/);
        setVideoId(match ? match[1] : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVideo();
  }, []);

  return (
    <>
      <MinecraftBackground />
      <div className="min-h-screen bg-transparent text-white flex flex-col items-center px-4">
        <div className="w-full max-w-3xl aspect-video mx-auto flex items-center justify-center mt-55">
          {loading ? (
            <div className="text-lg text-gray-400 w-full text-center">Loading video...</div>
          ) : error ? (
            <div className="text-lg text-red-400 w-full text-center">{error}</div>
          ) : (
            <VideoPlayer videoId={videoId} />
          )}
        </div>
        <div className="flex items-center justify-start mt-4 w-full max-w-3xl">
          <p className="text-sm text-gray-400 mr-auto">
            DigiCrate by{" "}
            <span className="text-white font-medium">Cycles Studios</span>
          </p>
          <Toolbar onShuffle={() => window.location.reload()} />
        </div>
      </div>
    </>
  );
}
