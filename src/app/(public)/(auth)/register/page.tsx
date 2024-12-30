/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash, Loader2, Mail, Lock } from 'lucide-react';
import { Input } from '../_components/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      // TODO: Add error handling
      return;
    }

    try {
      setLoading(true);
      // TODO: Add registration logic
      router.push('/login');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 bg-[#171717]" />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center mb-8"
          >
            <Link href="/" className="flex items-center gap-2 text-[#00FFFF]">
              <Hash className="w-8 h-8" />
              <span className="text-2xl font-mono">CounterThing</span>
            </Link>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/[0.04] p-6 space-y-6
                       shadow-[0_0_1rem_0_rgba(0,0,0,0.2)]"
          >
            <div className="space-y-2">
              <h1 className="text-xl font-mono text-neutral-200">
                Create an Account
              </h1>
              <p className="text-sm font-mono text-neutral-400">
                Start tracking your website metrics
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="Password"
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                icon={<Lock className="w-4 h-4" />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />

              <Button 
                type="submit"
                className="w-full"
                loading={loading}
              >
                Create Account
              </Button>
            </form>

            <p className="text-center text-sm font-mono text-neutral-400">
              Already have an account?{' '}
              <Link 
                href="/login"
                className="text-[#00FFFF] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
} 