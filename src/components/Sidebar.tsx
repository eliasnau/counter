/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home,
  Key,
  Settings,
  Hash,
  LogOut
} from 'lucide-react';

interface Counter {
  id: string;
  name: string;
  isPublic: boolean;
}

export function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      label: 'Overview',
      icon: Home,
      href: '/dashboard',
      pattern: /^\/dashboard$/
    },
    {
      label: 'Counters',
      icon: Hash,
      href: '/dashboard/counters',
      pattern: /^\/dashboard\/counters/
    },
    {
      label: 'API Keys',
      icon: Key,
      href: '/dashboard/api-keys',
      pattern: /^\/dashboard\/api-keys/
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      pattern: /^\/dashboard\/settings/
    }
  ];

  return (
    <div className="fixed left-0 h-full w-64 bg-[#1c1c1c] border-r border-white/[0.04]">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <div className="flex items-center gap-2 text-[#00FFFF]">
            <Hash className="w-6 h-6" />
            <span className="text-xl font-mono">Counter</span>
          </div>
        </div>

        <div className="flex-1 space-y-1 p-3">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg
                         font-mono text-sm transition-all duration-200 relative
                         group
                         ${route.pattern.test(pathname)
                           ? 'text-[#00FFFF]'
                           : 'text-neutral-400 hover:text-neutral-200'
                         }`}
            >
              <route.icon className="w-4 h-4" />
              {route.label}
              {route.pattern.test(pathname) ? (
                <motion.div
                  layoutId="active-link"
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

        <div className="p-3">
          <button
            onClick={() => {/* TODO: Add logout handler */}}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg
                     font-mono text-sm text-neutral-400 
                     hover:text-neutral-200 hover:bg-white/[0.02]
                     transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 