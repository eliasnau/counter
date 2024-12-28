'use client'

import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="w-full h-16 sm:h-24 flex items-center justify-between fixed top-0 left-0 z-50 px-4 sm:px-8">
      <Link href="/" className="flex items-center gap-3 sm:gap-4">
        <span className="font-mono text-neutral-100 text-xl sm:text-2xl font-bold uppercase">
          Counter Click
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <Link 
          href="/tutorial" 
          className="font-mono text-neutral-100 hover:underline focus-visible:underline sm:text-sm text-xs"
        >
          Tutorial
        </Link>
        <span className="text-neutral-100 text-sm">·</span>
        <Link 
          href="/legal" 
          className="font-mono text-neutral-100 hover:underline focus-visible:underline sm:text-sm text-xs"
        >
          Legal
        </Link>
      </div>
    </nav>
  )
} 