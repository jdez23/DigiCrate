export default function VideoPlayer() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-video bg-black rounded-md shadow-lg">
      {/* Placeholder for embedded YouTube video */}
      <iframe
        className="w-full h-full rounded"
        src="https://www.youtube.com/embed/wBVhk_5hyzg"
        title="Sample Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
