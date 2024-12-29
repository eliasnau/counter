'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash, Lock, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Input } from '../../_components/Input';
import { Button } from '@/components/ui/Button';

const NewPasswordPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Start with loading state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);

  useEffect(() => {
    // Simulate token validation
    const validateToken = async () => {
      try {
        // TODO: Add actual token validation logic here
        const isValid = false; // Simulating invalid token for now
        setIsValidToken(isValid);
      } catch (error) {
        setIsValidToken(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      // TODO: Add password reset logic using the token from the URL
      setSuccess(true);
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
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
              <span className="text-2xl font-mono">Counter</span>
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
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-[#00FFFF]/20 border-t-[#00FFFF] rounded-full animate-spin" />
              </div>
            ) : isValidToken === false ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-xl font-mono text-neutral-200">
                    Invalid or Expired Link
                  </h1>
                  <p className="text-sm font-mono text-neutral-400">
                    This password reset link is no longer valid
                  </p>
                </div>

                <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/10 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono text-neutral-200">
                      The link you clicked has expired or is invalid.
                    </p>
                    <p className="text-sm font-mono text-neutral-400">
                      Please request a new password reset link.
                    </p>
                  </div>
                </div>

                <Button 
                  onClick={() => router.push('/reset-password')}
                  className="w-full"
                >
                  Request New Link
                </Button>
              </div>
            ) : success ? (
              <div className="space-y-4">
                <div className="p-4 bg-[#00FFFF]/5 rounded-lg border border-[#00FFFF]/10">
                  <p className="text-sm font-mono text-neutral-200">
                    Password successfully reset! Redirecting to login...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <h1 className="text-xl font-mono text-neutral-200">
                    Set New Password
                  </h1>
                  <p className="text-sm font-mono text-neutral-400">
                    Enter your new password below
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="New Password"
                    icon={<Lock className="w-4 h-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    icon={<Lock className="w-4 h-4" />}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={loading}
                  />

                  {error && (
                    <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/10">
                      <p className="text-sm font-mono text-red-500">
                        {error}
                      </p>
                    </div>
                  )}

                  <Button 
                    type="submit"
                    className="w-full"
                    loading={loading}
                  >
                    Reset Password
                  </Button>
                </form>
              </>
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

export default NewPasswordPage; 