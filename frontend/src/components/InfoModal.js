export default function InfoModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded w-full max-w-md text-white">
        <h2 className="text-xl font-bold mb-4">Track Info</h2>
        <p>
          <strong>Artist:</strong> {data.artist}
        </p>
        <p>
          <strong>Title:</strong> {data.title}
        </p>
        <p>
          <strong>Year:</strong> {data.year}
        </p>
        <p>
          <strong>Genre:</strong> {data.genre?.join(", ")}
        </p>
        <p>
          <strong>Country:</strong> {data.country}
        </p>
        {data.cover_image && (
          <img src={data.cover_image} alt="cover" className="mt-4 rounded" />
        )}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
