"use client";

import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Toolbar from "../components/ToolBar";
import MinecraftBackground from "@/components/MinecraftVinylBackground";

export default function HomePage() {
  const [videoId, setVideoId] = useState("HttF5HVYtlQ"); // sample video

  return (
    <>
      <MinecraftBackground />
      <div className="min-h-screen bg-transparent text-white flex flex-col justify-center items-center px-4">
        <VideoPlayer videoId={videoId} />
        <div className="flex items-center justify-start mt-4 w-full max-w-3xl">
          <p className="text-sm text-gray-400 mr-auto">
            DigiCrate by{" "}
            <span className="text-white font-medium">Cycles Studios</span>
          </p>
          <Toolbar onShuffle={() => console.log("Shuffle")} />
        </div>
      </div>
    </>
  );
}
