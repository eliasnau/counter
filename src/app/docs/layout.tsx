'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Code, 
  Terminal, 
  Zap,
  Settings,
  Puzzle,
  ChevronRight,
  Hash,
  Key
} from 'lucide-react';

const sections = [
  {
    label: 'Getting Started',
    items: [
      { href: '/docs', label: 'Introduction', icon: BookOpen },
      { href: '/docs/quickstart', label: 'Quick Start', icon: Zap },
      { href: '/docs/installation', label: 'Installation', icon: Terminal }
    ]
  },
  {
    label: 'Core Concepts',
    items: [
      { href: '/docs/core/counters', label: 'Counters', icon: Hash },
      { href: '/docs/core/api-keys', label: 'API Keys', icon: Key },
      { href: '/docs/core/settings', label: 'Settings', icon: Settings }
    ]
  },
  {
    label: 'API Reference',
    items: [
      { href: '/docs/api/rest', label: 'REST API', icon: Code },
      { href: '/docs/api/websockets', label: 'WebSocket API', icon: Zap },
      { href: '/docs/api/sdk', label: 'SDK', icon: Puzzle }
    ]
  }
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="fixed inset-0 bg-[#171717]" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:5rem_5rem]" />
      
      <div className="relative min-h-screen">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="fixed left-0 w-64 h-screen bg-[#1c1c1c] border-r border-white/[0.04]
                        overflow-y-auto z-20">
            <div className="p-6">
              <Link href="/" className="flex items-center gap-2 text-[#00FFFF]">
                <Hash className="w-6 h-6" />
                <span className="text-xl font-mono">Counter</span>
              </Link>
            </div>

            <div className="px-3 pb-6">
              {sections.map((section, i) => (
                <div key={section.label} className={`space-y-1 ${i > 0 ? 'mt-6' : ''}`}>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <span className="font-mono text-xs text-neutral-400">
                      {section.label}
                    </span>
                    <div className="h-px flex-1 bg-white/[0.04]" />
                  </div>

                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg
                             font-mono text-sm transition-all duration-200 relative
                             group
                             ${pathname === item.href
                               ? 'text-[#00FFFF]'
                               : 'text-neutral-400 hover:text-neutral-200'
                             }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                      {pathname === item.href ? (
                        <motion.div
                          layoutId="active-doc"
                          className="absolute inset-0 bg-[#00FFFF]/5 rounded-lg"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-white/0 rounded-lg 
                                    transition-colors duration-200
                                    group-hover:bg-white/[0.02]" />
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 ml-64">
            <div className="max-w-4xl mx-auto px-8 py-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 