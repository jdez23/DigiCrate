export default function ShuffleButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
    >
      Shuffle
    </button>
  );
}
