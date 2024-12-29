'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your login logic here
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-grid relative">
      {/* Login Container */}
      <div className="w-full max-w-md mx-auto p-4">
        <div className="relative">
          {/* Background Glow */}
          <div 
            className="absolute -inset-0.5 bg-gradient-to-r from-[#00FFFF]/10 via-[#00FFFF]/5 to-transparent 
                       opacity-50 rounded-xl blur-sm"
          />
          
          <div className="relative bg-[#1c1c1c] p-8 rounded-xl border border-white/[0.04] space-y-6 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <Hash className="w-5 h-5 text-[#00FFFF]" />
              <h1 className="font-mono text-xl text-neutral-200">Login</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block font-mono text-sm text-neutral-400">
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/20 rounded-lg border border-white/[0.04] px-4 py-3 font-mono text-sm text-neutral-200 
                             focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50 focus:border-[#00FFFF]/50
                             transition-colors group-hover:border-white/[0.08]"
                    placeholder="you@example.com"
                  />
                  <div className="absolute inset-0 bg-[#00FFFF]/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity pointer-events-none" />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="block font-mono text-sm text-neutral-400">
                  Password
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/20 rounded-lg border border-white/[0.04] px-4 py-3 font-mono text-sm text-neutral-200 
                             focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50 focus:border-[#00FFFF]/50
                             transition-colors group-hover:border-white/[0.08]"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-0 bg-[#00FFFF]/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity pointer-events-none" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1c1c1c] rounded-lg border border-[#00FFFF]/20 px-4 py-3 
                         font-mono text-sm text-[#00FFFF] hover:bg-[#00FFFF]/10
                         transition-all duration-200 relative group
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isLoading ? 'Logging in...' : 'Login'}
                </span>
                <motion.div
                  className="absolute inset-0 bg-[#00FFFF]/5 rounded-lg"
                  initial={false}
                  animate={isLoading ? { opacity: 1 } : { opacity: 0 }}
                />
              </button>
            </form>

            {/* Links */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
              <Link
                href="/forgot-password"
                className="font-mono text-xs text-neutral-400 hover:text-neutral-300 transition-colors"
              >
                Forgot password?
              </Link>
              <Link
                href="/register"
                className="font-mono text-xs text-[#00FFFF] hover:text-[#40FFFF] transition-colors"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 