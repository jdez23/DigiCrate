"use client";

export default function MinecraftBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Night Sky Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700">
        {/* Stars */}
        <div className="absolute top-4 left-8 w-1 h-1 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-12 left-32 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-6 left-64 w-1 h-1 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-16 left-96 w-1 h-1 bg-white rounded-full opacity-70"></div>
        <div className="absolute top-8 right-32 w-1 h-1 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-20 right-64 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-4 right-96 w-1 h-1 bg-white rounded-full opacity-90"></div>
        <div className="absolute top-14 right-8 w-1 h-1 bg-white rounded-full opacity-75"></div>
        <div className="absolute top-24 left-16 w-1 h-1 bg-white rounded-full opacity-85"></div>
        <div className="absolute top-32 left-48 w-1 h-1 bg-white rounded-full opacity-70"></div>
        <div className="absolute top-28 right-16 w-1 h-1 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-36 right-48 w-1 h-1 bg-white rounded-full opacity-65"></div>

        {/* Moon */}
        <div className="absolute top-16 right-24 w-16 h-16 bg-yellow-100 rounded-full shadow-lg"></div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-green-800"></div>

        {/* Store Strip Platform */}
        <div className="absolute bottom-32 left-0 right-0 h-4 bg-gray-500"></div>

        {/* LEFT STORE - Electronics */}
        <div className="absolute bottom-36 left-8">
          {/* Back Wall */}
          <div className="absolute bottom-0 left-0 w-64 h-28 bg-purple-800"></div>
          {/* Side Walls */}
          <div className="absolute bottom-0 -left-4 w-4 h-28 bg-purple-900"></div>
          <div className="absolute bottom-0 right-0 w-4 h-28 bg-purple-900"></div>
          {/* Roof */}
          <div className="absolute -top-2 -left-6 w-72 h-6 bg-purple-600"></div>
          {/* Front Pillars */}
          <div className="absolute bottom-0 left-8 w-6 h-28 bg-indigo-700"></div>
          <div className="absolute bottom-0 right-12 w-6 h-28 bg-indigo-700"></div>
          {/* Interior */}
          <div className="absolute bottom-0 left-16 w-32 h-24 bg-gradient-to-t from-purple-700 to-purple-300">
            {/* Neon glow effect */}
            <div className="absolute top-2 left-2 w-full h-full bg-cyan-400 opacity-20 blur-sm"></div>
          </div>
          {/* Neon Sign */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black border-2 border-cyan-400 flex items-center justify-center">
            <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider animate-pulse">
              ELECTRONICS
            </span>
          </div>
          {/* Neon underglow */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-44 h-2 bg-cyan-400 opacity-60 blur-md"></div>
        </div>

        {/* CENTER STORE - DigiCrate Records */}
        <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2">
          {/* Back Wall */}
          <div className="absolute bottom-0 left-0 w-72 h-32 bg-amber-800"></div>
          {/* Side Walls */}
          <div className="absolute bottom-0 -left-4 w-4 h-32 bg-amber-900"></div>
          <div className="absolute bottom-0 right-0 w-4 h-32 bg-amber-900"></div>
          {/* Roof */}
          <div className="absolute -top-2 -left-6 w-80 h-6 bg-orange-600"></div>
          {/* Front Pillars */}
          <div className="absolute bottom-0 left-12 w-6 h-32 bg-yellow-700"></div>
          <div className="absolute bottom-0 right-16 w-6 h-32 bg-yellow-700"></div>
          {/* Store Interior */}
          <div className="absolute bottom-0 left-20 w-32 h-28 bg-gradient-to-t from-amber-700 to-orange-300">
            {/* Checkered Floor Pattern */}
            <div className="absolute bottom-0 left-0 w-full h-4 flex">
              <div className="w-4 h-4 bg-white"></div>
              <div className="w-4 h-4 bg-black"></div>
              <div className="w-4 h-4 bg-white"></div>
              <div className="w-4 h-4 bg-black"></div>
              <div className="w-4 h-4 bg-white"></div>
              <div className="w-4 h-4 bg-black"></div>
              <div className="w-4 h-4 bg-white"></div>
              <div className="w-4 h-4 bg-black"></div>
            </div>
            <div className="absolute bottom-4 left-0 w-full h-4 flex">
              <div className="w-4 h-4 bg-black"></div>
              <div className="w-4 h-4 bg-white"></div>
              <div className="w-4 h-4 bg-black"></div>
              <div className="w-4 h-4 bg-white"></div>
              <div className="w-4 h-4 bg-black"></div>
              <div className="w-4 h-4 bg-white"></div>
              <div className="w-4 h-4 bg-black"></div>
              <div className="w-4 h-4 bg-white"></div>
            </div>
            {/* Interior Lighting Effect */}
            <div className="absolute top-2 left-4 w-6 h-6 bg-yellow-300 rounded-full opacity-60 blur-sm"></div>
            <div className="absolute top-2 right-4 w-6 h-6 bg-yellow-300 rounded-full opacity-60 blur-sm"></div>
          </div>
          {/* Records Sign (Above DigiCrate) */}
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black border-2 border-red-500 flex items-center justify-center">
            <span className="text-red-500 font-mono text-xs font-bold tracking-wider animate-pulse">
              RECORDS
            </span>
          </div>
          {/* Records Sign Glow */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-36 h-2 bg-red-500 opacity-60 blur-md"></div>
          {/* DigiCrate Sign */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-amber-900 flex items-center justify-center">
            <span className="text-white font-mono text-sm font-bold tracking-wider px-2 py-1 bg-amber-800 rounded shadow-sm">
              DigiCrate
            </span>
          </div>
          {/* Windows on sides */}
          <div className="absolute bottom-16 -left-3 w-2 h-8 bg-blue-200 opacity-60"></div>
          <div className="absolute bottom-16 right-1 w-2 h-8 bg-blue-200 opacity-60"></div>
        </div>

        {/* RIGHT STORE - Casino */}
        <div className="absolute bottom-36 right-8">
          {/* Back Wall */}
          <div className="absolute bottom-0 left-0 w-64 h-28 bg-pink-800"></div>
          {/* Side Walls */}
          <div className="absolute bottom-0 -left-4 w-4 h-28 bg-pink-900"></div>
          <div className="absolute bottom-0 right-0 w-4 h-28 bg-pink-900"></div>
          {/* Roof */}
          <div className="absolute -top-2 -left-6 w-72 h-6 bg-pink-600"></div>
          {/* Front Pillars */}
          <div className="absolute bottom-0 left-8 w-6 h-28 bg-red-700"></div>
          <div className="absolute bottom-0 right-12 w-6 h-28 bg-red-700"></div>
          {/* Interior */}
          <div className="absolute bottom-0 left-16 w-32 h-24 bg-gradient-to-t from-pink-700 to-pink-300">
            {/* Neon glow effect */}
            <div className="absolute top-2 left-2 w-full h-full bg-pink-400 opacity-20 blur-sm"></div>
          </div>
          {/* Neon Sign */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black border-2 border-pink-400 flex items-center justify-center">
            <span className="text-pink-400 font-mono text-xs font-bold tracking-wider animate-pulse">
              CASINO
            </span>
          </div>
          {/* Neon underglow */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-44 h-2 bg-pink-400 opacity-60 blur-md"></div>
        </div>

        {/* FAR LEFT STORE - Food */}
        <div className="absolute bottom-36 left-72">
          {/* Back Wall */}
          <div className="absolute bottom-0 left-0 w-56 h-26 bg-green-800"></div>
          {/* Side Walls */}
          <div className="absolute bottom-0 -left-4 w-4 h-26 bg-green-900"></div>
          <div className="absolute bottom-0 right-0 w-4 h-26 bg-green-900"></div>
          {/* Roof */}
          <div className="absolute -top-2 -left-6 w-64 h-6 bg-green-600"></div>
          {/* Front Pillars */}
          <div className="absolute bottom-0 left-6 w-6 h-26 bg-lime-700"></div>
          <div className="absolute bottom-0 right-10 w-6 h-26 bg-lime-700"></div>
          {/* Interior */}
          <div className="absolute bottom-0 left-14 w-28 h-22 bg-gradient-to-t from-green-700 to-green-300">
            {/* Neon glow effect */}
            <div className="absolute top-2 left-2 w-full h-full bg-lime-400 opacity-20 blur-sm"></div>
          </div>
          {/* Neon Sign */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black border-2 border-lime-400 flex items-center justify-center">
            <span className="text-lime-400 font-mono text-xs font-bold tracking-wider animate-pulse">
              FOOD
            </span>
          </div>
          {/* Neon underglow */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-36 h-2 bg-lime-400 opacity-60 blur-md"></div>
        </div>

        {/* FAR RIGHT STORE - Hotel */}
        <div className="absolute bottom-36 right-72">
          {/* Back Wall */}
          <div className="absolute bottom-0 left-0 w-56 h-26 bg-blue-800"></div>
          {/* Side Walls */}
          <div className="absolute bottom-0 -left-4 w-4 h-26 bg-blue-900"></div>
          <div className="absolute bottom-0 right-0 w-4 h-26 bg-blue-900"></div>
          {/* Roof */}
          <div className="absolute -top-2 -left-6 w-64 h-6 bg-blue-600"></div>
          {/* Front Pillars */}
          <div className="absolute bottom-0 left-6 w-6 h-26 bg-sky-700"></div>
          <div className="absolute bottom-0 right-10 w-6 h-26 bg-sky-700"></div>
          {/* Interior */}
          <div className="absolute bottom-0 left-14 w-28 h-22 bg-gradient-to-t from-blue-700 to-blue-300">
            {/* Neon glow effect */}
            <div className="absolute top-2 left-2 w-full h-full bg-blue-400 opacity-20 blur-sm"></div>
          </div>
          {/* Neon Sign */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black border-2 border-blue-400 flex items-center justify-center">
            <span className="text-blue-400 font-mono text-xs font-bold tracking-wider animate-pulse">
              HOTEL
            </span>
          </div>
          {/* Neon underglow */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-36 h-2 bg-blue-400 opacity-60 blur-md"></div>
        </div>

        {/* Entrance Path */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gray-600"></div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-gray-600"></div>

        {/* Street Lights */}
        <div className="absolute bottom-32 left-1/4 w-2 h-16 bg-gray-600"></div>
        <div className="absolute bottom-46 left-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-80 blur-sm"></div>

        <div className="absolute bottom-32 right-1/4 w-2 h-16 bg-gray-600"></div>
        <div className="absolute bottom-46 right-1/4 w-6 h-6 bg-yellow-300 rounded-full opacity-80 blur-sm"></div>

        <div className="absolute bottom-32 left-3/4 w-2 h-16 bg-gray-600"></div>
        <div className="absolute bottom-46 left-3/4 w-6 h-6 bg-yellow-300 rounded-full opacity-80 blur-sm"></div>

        {/* Decorative Flowers */}
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-pink-400 rounded-full"></div>
        <div className="absolute bottom-34 left-40 w-2 h-2 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-36 right-32 w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-32 right-40 w-2 h-2 bg-purple-400 rounded-full"></div>

        {/* Trees in background */}
        <div className="absolute bottom-32 left-4 w-3 h-16 bg-amber-800"></div>
        <div className="absolute bottom-44 left-2 w-8 h-8 bg-green-600 rounded"></div>

        <div className="absolute bottom-32 right-4 w-3 h-16 bg-amber-800"></div>
        <div className="absolute bottom-44 right-2 w-8 h-8 bg-green-600 rounded"></div>
      </div>
    </div>
  );
}
