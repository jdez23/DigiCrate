export default function InfoButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="ml-4 px-6 py-2 mt-6 bg-gray-700 hover:bg-gray-600 text-white rounded shadow"
    >
      Info
    </button>
  );
}
