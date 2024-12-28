'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Hash } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: '/tutorial', label: 'Tutorial' },
    { href: '/docs', label: 'Docs' },
    { href: '/about', label: 'About' },
    { href: '/legal', label: 'Legal' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Home Link */}
          <Link 
            href="/" 
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg
              ${pathname === '/' ? 'text-[#00FFFF]' : 'text-neutral-400 hover:text-neutral-200'}
            `}
          >
            <Hash className="w-5 h-5" />
            <span className="font-mono font-bold">Counter</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center">
            {links.map(({ href, label }) => {
              const isActive = pathname === href
              
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-3 py-2 group"
                >
                  <span
                    className={`relative z-10 text-sm font-mono transition-colors duration-200
                      ${isActive ? 'text-[#00FFFF]' : 'text-neutral-400 group-hover:text-neutral-200'}
                    `}
                  >
                    {label}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'rgba(0, 255, 255, 0.05)',
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
} 