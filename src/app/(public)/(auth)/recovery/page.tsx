/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash, ArrowLeft, Key, Mail, User } from 'lucide-react';
import { Input } from '../_components/Input';
import { Button } from '@/components/ui/Button';

type RecoveryMethod = 'email' | 'apikey' | 'username';

const RecoveryPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<RecoveryMethod>('email');
  const [email, setEmail] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      // TODO: Add recovery logic based on method
      setSubmitted(true);
    } catch (error) {
      setError('Recovery attempt failed. Please try again.');
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

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/[0.04] p-6 space-y-6
                       shadow-[0_0_1rem_0_rgba(0,0,0,0.2)]"
          >
            {!submitted ? (
              <>
                <div className="space-y-2">
                  <h1 className="text-xl font-mono text-neutral-200">
                    Account Recovery
                  </h1>
                  <p className="text-sm font-mono text-neutral-400">
                    Choose a method to recover your account
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setMethod('email')}
                    className={`p-3 rounded-lg border font-mono text-sm flex flex-col items-center gap-2
                              transition-colors
                              ${method === 'email' 
                                ? 'bg-[#00FFFF]/10 border-[#00FFFF]/20 text-[#00FFFF]' 
                                : 'border-white/[0.04] text-neutral-400 hover:border-white/[0.08]'}`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button
                    onClick={() => setMethod('apikey')}
                    className={`p-3 rounded-lg border font-mono text-sm flex flex-col items-center gap-2
                              transition-colors
                              ${method === 'apikey' 
                                ? 'bg-[#00FFFF]/10 border-[#00FFFF]/20 text-[#00FFFF]' 
                                : 'border-white/[0.04] text-neutral-400 hover:border-white/[0.08]'}`}
                  >
                    <Key className="w-4 h-4" />
                    API Key
                  </button>
                  <button
                    onClick={() => setMethod('username')}
                    className={`p-3 rounded-lg border font-mono text-sm flex flex-col items-center gap-2
                              transition-colors
                              ${method === 'username' 
                                ? 'bg-[#00FFFF]/10 border-[#00FFFF]/20 text-[#00FFFF]' 
                                : 'border-white/[0.04] text-neutral-400 hover:border-white/[0.08]'}`}
                  >
                    <User className="w-4 h-4" />
                    Username
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {method === 'email' && (
                    <div className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Email Address"
                        icon={<Mail className="w-4 h-4" />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <div className="p-4 bg-[#00FFFF]/5 rounded-lg border border-[#00FFFF]/10">
                        <p className="text-xs font-mono text-neutral-400">
                          A verification email will be sent to this address.
                        </p>
                      </div>
                    </div>
                  )}

                  {method === 'apikey' && (
                    <div className="space-y-4">
                      <div className="p-4 bg-[#00FFFF]/5 rounded-lg border border-[#00FFFF]/10 flex items-start gap-3">
                        <div className="shrink-0 mt-1">
                          <Key className="w-4 h-4 text-[#00FFFF]" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-mono text-[#00FFFF]">
                            Private API Keys Only
                          </p>
                          <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                            Only private API keys can be used for account recovery. Public API keys 
                            and read-only keys cannot be used to verify account ownership.
                          </p>
                        </div>
                      </div>

                      <Input
                        type="text"
                        placeholder="API Key"
                        icon={<Key className="w-4 h-4" />}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <div className="p-4 bg-[#00FFFF]/5 rounded-lg border border-[#00FFFF]/10">
                        <p className="text-xs font-mono text-neutral-400">
                          A verification email will be sent to the email associated with this API key.
                        </p>
                      </div>
                    </div>
                  )}

                  {method === 'username' && (
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Username"
                        icon={<User className="w-4 h-4" />}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                      />
                      <div className="p-4 bg-[#00FFFF]/5 rounded-lg border border-[#00FFFF]/10">
                        <p className="text-xs font-mono text-neutral-400">
                          A verification email will be sent to the email associated with this username.
                        </p>
                      </div>
                    </div>
                  )}

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
                    Continue
                  </Button>
                </form>
              </>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-xl font-mono text-neutral-200">
                    Check Your Email
                  </h1>
                  <p className="text-sm font-mono text-neutral-400">
                    If we find an account matching the provided information, 
                    you'll receive an email with recovery instructions.
                  </p>
                </div>

                <div className="p-4 bg-[#00FFFF]/5 rounded-lg border border-[#00FFFF]/10">
                  <p className="text-sm font-mono text-neutral-200">
                    For security reasons, we don't disclose whether an account exists. 
                    Please check your email for further instructions.
                  </p>
                </div>

                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try Another Method
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

export default RecoveryPage; 