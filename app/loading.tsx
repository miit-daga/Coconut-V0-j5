"use client"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-green-400/20 border-t-green-400 rounded-full animate-spin mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-green-400/20 rounded-full animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-400 font-mono mb-2">INITIALIZING CORE SYSTEMS</h2>
        <p className="text-gray-400 font-mono">Neural networks coming online...</p>
        <div className="mt-4 text-sm text-gray-500 font-mono">[ LOADING NEURAL PATHWAYS ]</div>
      </div>
    </div>
  )
}
