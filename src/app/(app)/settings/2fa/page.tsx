'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Mail, Shield, Check, X, QrCode, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Method {
  id: '2fa-app' | '2fa-email' | '2fa-backup';
  name: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

const TwoFactorSettingsPage = () => {
  const [methods, setMethods] = useState<Method[]>([
    {
      id: '2fa-app',
      name: 'Authenticator App',
      description: 'Use Google Authenticator or similar apps',
      icon: <Smartphone className="w-5 h-5" />,
      enabled: false
    },
    {
      id: '2fa-email',
      name: 'Email Authentication',
      description: 'Receive codes via email',
      icon: <Mail className="w-5 h-5" />,
      enabled: false
    },
    {
      id: '2fa-backup',
      name: 'Backup Codes',
      description: 'Generate one-time use backup codes',
      icon: <Shield className="w-5 h-5" />,
      enabled: false
    }
  ]);

  const [setupStep, setSetupStep] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');

  const handleToggle = async (methodId: Method['id']) => {
    setLoading(true);
    try {
      const method = methods.find(m => m.id === methodId);
      if (!method) return;

      if (!method.enabled) {
        // Start setup process
        if (methodId === '2fa-app') {
          // TODO: Fetch QR code and secret from API
          setQrCode('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Example:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Example');
          setSecret('JBSWY3DPEHPK3PXP');
          setSetupStep(1);
        } else if (methodId === '2fa-backup') {
          // TODO: Generate backup codes from API
          setBackupCodes([
            'XXXX-XXXX-XXXX-1111',
            'XXXX-XXXX-XXXX-2222',
            'XXXX-XXXX-XXXX-3333',
            'XXXX-XXXX-XXXX-4444',
            'XXXX-XXXX-XXXX-5555',
            'XXXX-XXXX-XXXX-6666',
            'XXXX-XXXX-XXXX-7777',
            'XXXX-XXXX-XXXX-8888'
          ]);
          setSetupStep(2);
        } else {
          // Enable email 2FA directly
          setMethods(methods.map(m => 
            m.id === methodId ? { ...m, enabled: true } : m
          ));
        }
      } else {
        // Disable method
        setMethods(methods.map(m => 
          m.id === methodId ? { ...m, enabled: false } : m
        ));
      }
    } catch (error) {
      console.error('Failed to toggle 2FA method:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyApp = async () => {
    // TODO: Verify app setup with API
    setMethods(methods.map(m => 
      m.id === '2fa-app' ? { ...m, enabled: true } : m
    ));
    setSetupStep(0);
  };

  const handleRegenerateBackupCodes = async () => {
    setLoading(true);
    try {
      // TODO: Generate new backup codes from API
      setBackupCodes([
        'YYYY-YYYY-YYYY-1111',
        'YYYY-YYYY-YYYY-2222',
        'YYYY-YYYY-YYYY-3333',
        'YYYY-YYYY-YYYY-4444',
        'YYYY-YYYY-YYYY-5555',
        'YYYY-YYYY-YYYY-6666',
        'YYYY-YYYY-YYYY-7777',
        'YYYY-YYYY-YYYY-8888'
      ]);
    } catch (error) {
      console.error('Failed to regenerate backup codes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-mono text-neutral-200">
          Two-Factor Authentication
        </h1>
        <p className="text-sm font-mono text-neutral-400">
          Add an extra layer of security to your account
        </p>
      </div>

      <div className="space-y-4">
        {methods.map((method) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-black/40 backdrop-blur-xl rounded-xl border border-white/[0.04]
                     shadow-[0_0_1rem_0_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-1">{method.icon}</div>
                <div className="space-y-1">
                  <h3 className="font-mono text-neutral-200">{method.name}</h3>
                  <p className="text-sm font-mono text-neutral-400">{method.description}</p>
                </div>
              </div>
              <Button
                variant={method.enabled ? 'destructive' : 'default'}
                onClick={() => handleToggle(method.id)}
                loading={loading}
                className="shrink-0"
              >
                {method.enabled ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Disable
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Enable
                  </>
                )}
              </Button>
            </div>

            {/* App Setup Modal */}
            {method.id === '2fa-app' && setupStep === 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 space-y-6"
              >
                <div className="p-4 bg-black/20 rounded-lg space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-mono text-neutral-200">Setup Instructions</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm font-mono text-neutral-400">
                      <li>Install an authenticator app (Google Authenticator, Authy, etc.)</li>
                      <li>Scan the QR code or enter the secret key manually</li>
                      <li>Enter the verification code from your app to complete setup</li>
                    </ol>
                  </div>

                  <div className="flex justify-center">
                    <div className="p-4 bg-white rounded-lg">
                      <QrCode className="w-40 h-40" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-mono text-neutral-400">
                      Can't scan the QR code? Use this secret key instead:
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-black/20 rounded font-mono text-[#00FFFF]">
                        {secret}
                      </code>
                      <button
                        onClick={() => navigator.clipboard.writeText(secret)}
                        className="p-1 hover:text-[#00FFFF] transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleVerifyApp}>
                      Verify Setup
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Backup Codes */}
            {method.id === '2fa-backup' && (method.enabled || setupStep === 2) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 space-y-6"
              >
                <div className="p-4 bg-black/20 rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-neutral-200">Backup Codes</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRegenerateBackupCodes}
                      loading={loading}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {backupCodes.map((code, index) => (
                      <div
                        key={index}
                        className="p-2 bg-black/20 rounded font-mono text-sm text-neutral-400"
                      >
                        {code}
                      </div>
                    ))}
                  </div>

                  <p className="text-sm font-mono text-amber-500">
                    Save these codes in a secure place. Each code can only be used once.
                  </p>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        setMethods(methods.map(m => 
                          m.id === '2fa-backup' ? { ...m, enabled: true } : m
                        ));
                        setSetupStep(0);
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TwoFactorSettingsPage; 