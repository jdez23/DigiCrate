"use client";

import { useState } from "react";
import TopBar from "../components/TopBar";
import VideoPlayer from "../components/VideoPlayer";
import Toolbar from "../components/ToolBar";
import CommentSection from "../components/CommentSection";

export default function HomePage() {
  const [videoId, setVideoId] = useState("HttF5HVYtlQ"); // sample video

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans">
      <TopBar />
      <main className="flex flex-col items-center justify-start px-4 py-6">
        <VideoPlayer videoId={videoId} />
        <Toolbar onShuffle={() => console.log("Shuffle")} />
        <CommentSection />
      </main>
    </div>
  );
}
