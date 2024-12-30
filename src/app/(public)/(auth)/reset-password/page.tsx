'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash, Mail, ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Input } from '../_components/Input';
import { Button } from '@/components/ui/Button';

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      // TODO: Add reset password logic
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                Reset Password
              </h1>
              <p className="text-sm font-mono text-neutral-400">
                {!submitted 
                  ? "Enter your email to receive reset instructions"
                  : "Check your email for reset instructions"}
              </p>
            </div>

            {!submitted ? (
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

                <Button 
                  type="submit"
                  className="w-full"
                  loading={loading}
                >
                  Send Reset Link
                </Button>

                <Link 
                  href="/recovery"
                  className="flex items-center justify-center gap-2 p-2 rounded-lg border border-white/[0.04] 
                           text-sm font-mono text-neutral-400 hover:text-[#00FFFF] hover:border-[#00FFFF]/20 
                           transition-colors group"
                >
                  <MoreHorizontal className="w-4 h-4" />
                  Alternative Recovery Options
                  <div className="absolute inset-0 bg-[#00FFFF]/5 opacity-0 
                                group-hover:opacity-100 rounded-lg transition-opacity 
                                pointer-events-none" />
                </Link>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-[#00FFFF]/5 rounded-lg border border-[#00FFFF]/10">
                  <p className="text-sm font-mono text-neutral-200">
                    If an account exists for {email}, you will receive password reset instructions.
                  </p>
                </div>

                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try another email
                </Button>
              </div>
            )}

            <div className="flex justify-center">
              <Link 
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 
                           hover:text-[#00FFFF] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage; 