export default function CommentSection() {
  return (
    <div className="w-full max-w-3xl mt-8 mx-auto px-2">
      <h2 className="text-sm text-white mb-2">0 comments</h2>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-zinc-700 rounded-full" />
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 bg-zinc-800 text-white px-4 py-2 rounded-full outline-none placeholder-gray-400"
        />
      </div>
    </div>
  );
}
