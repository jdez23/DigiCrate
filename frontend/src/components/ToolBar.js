import { FiInfo, FiSliders, FiClock, FiLink } from "react-icons/fi";
import { FaRandom } from "react-icons/fa";

export default function Toolbar({ onShuffle }) {
  return (
    <div className="flex items-center gap-3 ml-4">
      <IconButton icon={<FiInfo />} />
      <IconButton icon={<FiSliders />} />
      <button
        onClick={onShuffle}
        className="bg-pink-500 hover:bg-pink-600 text-white text-xl rounded-full px-6 py-2 shadow-md transition"
      >
        <FaRandom />
      </button>
      <IconButton icon={<FiClock />} />
      <IconButton icon={<FiLink />} />
    </div>
  );
}

function IconButton({ icon }) {
  return (
    <button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg">
      {icon}
    </button>
  );
}
