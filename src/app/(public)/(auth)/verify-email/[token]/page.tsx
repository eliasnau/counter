'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const VerifyEmailPage: React.FC = () => {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // TODO: Add email verification logic
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
        setStatus('success');
        // Redirect to login after success
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (error) {
        setStatus('error');
      }
    };

    verifyEmail();
  }, [router]);

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
              <span className="text-2xl font-mono">Counter</span>
            </Link>
          </motion.div>

          {/* Status Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/[0.04] p-6 space-y-6
                       shadow-[0_0_1rem_0_rgba(0,0,0,0.2)]"
          >
            {status === 'loading' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-xl font-mono text-neutral-200">
                    Verifying Email
                  </h1>
                  <p className="text-sm font-mono text-neutral-400">
                    Please wait while we verify your email address
                  </p>
                </div>
                <div className="flex justify-center">
                  <Loader2 className="w-8 h-8 text-[#00FFFF] animate-spin" />
                </div>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-xl font-mono text-neutral-200">
                    Email Verified
                  </h1>
                  <p className="text-sm font-mono text-neutral-400">
                    Your email has been successfully verified
                  </p>
                </div>
                <div className="flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
                <p className="text-sm font-mono text-neutral-400 text-center">
                  Redirecting to login...
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-xl font-mono text-neutral-200">
                    Verification Failed
                  </h1>
                  <p className="text-sm font-mono text-neutral-400">
                    The verification link is invalid or has expired
                  </p>
                </div>
                <div className="flex justify-center">
                  <XCircle className="w-16 h-16 text-red-500" />
                </div>
                <Button
                  onClick={() => router.push('/login')}
                  className="w-full"
                >
                  Back to Login
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmailPage; 