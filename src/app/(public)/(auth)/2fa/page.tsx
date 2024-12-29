'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Hash, ArrowLeft, Smartphone, Timer, MessageSquare, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type AuthMethod = 'authenticator' | 'email' | 'backup';

const TwoFactorPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [method, setMethod] = useState<AuthMethod>('authenticator');
  const [emailSent, setEmailSent] = useState(false);
  const [lastEmailSentAt, setLastEmailSentAt] = useState<number | null>(null);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Check and update timer when switching back to email
  useEffect(() => {
    if (method === 'email' && lastEmailSentAt) {
      const elapsed = Math.floor((Date.now() - lastEmailSentAt) / 1000);
      const remaining = Math.max(30 - elapsed, 0);
      setTimeLeft(remaining);
      setEmailSent(true);

      if (remaining > 0) {
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            const newTime = prev - 1;
            if (newTime <= 0) {
              clearInterval(timer);
            }
            return Math.max(newTime, 0);
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }
  }, [method, lastEmailSentAt]);

  // Handle input changes
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/[0-9]/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }
    
    setCode(newCode);
    inputs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join('');
    
    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    try {
      setLoading(true);
      // TODO: Add 2FA verification logic
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    try {
      setLoading(true);
      // TODO: Add email sending logic
      setEmailSent(true);
      setTimeLeft(30);
      setLastEmailSentAt(Date.now());
    } catch (error) {
      setError('Failed to send verification email');
    } finally {
      setLoading(false);
    }
  };

  const getMethodInfo = () => {
    switch (method) {
      case 'authenticator':
        return {
          title: 'Authenticator App',
          description: 'Enter the 6-digit code from your authenticator app',
          icon: <Smartphone className="w-5 h-5 text-[#00FFFF]" />,
          canResend: false
        };
      case 'email':
        return {
          title: 'Email Verification',
          description: emailSent 
            ? 'Enter the 6-digit code sent to your email'
            : 'Send a verification code to your email',
          icon: <Mail className="w-5 h-5 text-[#00FFFF]" />,
          canResend: true
        };
      case 'backup':
        return {
          title: 'Backup Code',
          description: 'Enter one of your backup recovery codes',
          icon: <Shield className="w-5 h-5 text-[#00FFFF]" />,
          canResend: false
        };
    }
  };

  const methodInfo = getMethodInfo();

  const switchMethod = (newMethod: AuthMethod) => {
    setMethod(newMethod);
    setCode(['', '', '', '', '', '']); // Clear code when switching methods
    setError(''); // Clear any existing errors
    
    // Don't reset email state if switching back to email and timer is still active
    if (newMethod !== 'email') {
      setEmailSent(false);
      setTimeLeft(0);
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
              <span className="text-2xl font-mono">Counter</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-black/40 backdrop-blur-xl rounded-xl border border-white/[0.04] p-6 space-y-6
                       shadow-[0_0_1rem_0_rgba(0,0,0,0.2)]"
          >
            <div className="space-y-2">
              <h1 className="text-xl font-mono text-neutral-200">
                {methodInfo.title}
              </h1>
              <p className="text-sm font-mono text-neutral-400">
                {methodInfo.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => switchMethod('authenticator')}
                className={`p-3 rounded-lg border font-mono text-xs flex flex-col items-center gap-2
                          transition-colors
                          ${method === 'authenticator' 
                            ? 'bg-[#00FFFF]/10 border-[#00FFFF]/20 text-[#00FFFF]' 
                            : 'border-white/[0.04] text-neutral-400 hover:border-white/[0.08]'}`}
              >
                <Smartphone className="w-4 h-4" />
                App
              </button>
              <button
                onClick={() => switchMethod('email')}
                className={`p-3 rounded-lg border font-mono text-xs flex flex-col items-center gap-2
                          transition-colors
                          ${method === 'email' 
                            ? 'bg-[#00FFFF]/10 border-[#00FFFF]/20 text-[#00FFFF]' 
                            : 'border-white/[0.04] text-neutral-400 hover:border-white/[0.08]'}`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                onClick={() => switchMethod('backup')}
                className={`p-3 rounded-lg border font-mono text-xs flex flex-col items-center gap-2
                          transition-colors
                          ${method === 'backup' 
                            ? 'bg-[#00FFFF]/10 border-[#00FFFF]/20 text-[#00FFFF]' 
                            : 'border-white/[0.04] text-neutral-400 hover:border-white/[0.08]'}`}
              >
                <Shield className="w-4 h-4" />
                Backup
              </button>
            </div>

            <div className="p-4 bg-[#00FFFF]/5 rounded-lg border border-[#00FFFF]/10 flex items-start gap-3">
              {methodInfo.icon}
              <p className="text-sm font-mono text-neutral-200">
                {method === 'authenticator' && "Open your authenticator app to view your verification code"}
                {method === 'email' && (emailSent 
                  ? "We've sent a verification code to your email address"
                  : "Click the button below to receive a verification code via email"
                )}
                {method === 'backup' && "Use one of your backup recovery codes from your safe storage"}
              </p>
            </div>

            {method === 'email' && !emailSent ? (
              <Button
                onClick={handleSendEmail}
                className="w-full"
                loading={loading}
              >
                Send Verification Email
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-2 justify-center">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => inputs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleChange(index, e.target.value)}
                      onKeyDown={e => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      className="w-12 h-14 text-center bg-black/20 rounded-lg border border-white/[0.04] 
                               font-mono text-xl text-neutral-200 
                               focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50 focus:border-[#00FFFF]/50
                               transition-colors hover:border-white/[0.08]"
                      disabled={loading || (method === 'email' && !emailSent)}
                    />
                  ))}
                </div>

                {error && (
                  <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/10">
                    <p className="text-sm font-mono text-red-500 text-center">
                      {error}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <Button 
                    type="submit"
                    className="w-full"
                    loading={loading}
                  >
                    Verify
                  </Button>

                  {method === 'email' && emailSent && timeLeft > 0 && (
                    <div className="flex justify-center">
                      <p className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400">
                        <Timer className="w-4 h-4" />
                        Resend available in {timeLeft}s
                      </p>
                    </div>
                  )}

                  {method === 'email' && emailSent && timeLeft === 0 && (
                    <div className="flex justify-center">
                      <button
                        type="button"
                        onClick={handleSendEmail}
                        className="inline-flex items-center gap-2 text-sm font-mono text-neutral-400 
                                 hover:text-[#00FFFF] transition-colors"
                      >
                        <Timer className="w-4 h-4" />
                        Resend verification email
                      </button>
                    </div>
                  )}
                </div>
              </form>
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

export default TwoFactorPage; 