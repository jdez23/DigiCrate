"use client";

import { useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import ShuffleButton from "../components/ShuffleButton";
import InfoButton from "../components/InfoButton";
import InfoModal from "../components/InfoModal";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  // Placeholder metadata
  const discogsMetadata = {
    artist: "Fela Kuti",
    title: "Zombie",
    year: "1976",
    genre: ["Afrobeat"],
    country: "Nigeria",
    cover_image:
      "https://i.discogs.com/eLb5hhn1w_E-OziC-_difXwSf_omjAC4P5ZH2IHpnpY/rs:fit/g:sm/q:90/h:601/w:600/czM6Ly9kaXNjb2dz...",
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🎶 Random Song Generator
      </h1>
      <VideoPlayer />
      <div className="flex justify-center">
        <ShuffleButton onClick={() => console.log("Shuffle clicked")} />
        <InfoButton onClick={() => setShowModal(true)} />
      </div>
      {showModal && (
        <InfoModal data={discogsMetadata} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
