import Link from 'next/link'
import { Hash } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#171717] flex flex-col items-center justify-center p-4 bg-grid">
      <div className="space-y-8 text-center">
        <div className="space-y-4">
          <Hash className="w-12 h-12 text-[#00FFFF] mx-auto opacity-50" />
          
          <h1 className="text-7xl font-mono text-[#00FFFF] font-bold">
            404
          </h1>
        </div>
        
        <div className="space-y-2">
          <p className="text-neutral-400 font-mono">
            This page doesn't exist in our counter.
          </p>
          <p className="text-neutral-400 font-mono text-sm">
            Maybe try incrementing your way back home?
          </p>
        </div>

        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-[#1c1c1c] text-[#00FFFF] 
                     font-mono text-sm rounded-lg border border-white/[0.04]
                     hover:bg-[#252525] transition-colors duration-200
                     hover:scale-105 active:scale-95"
        >
          Return Home
        </Link>
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-grid-small opacity-20" />
    </div>
  )
} 