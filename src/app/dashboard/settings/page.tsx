'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Eye, 
  Link as LinkIcon, 
  Shield, 
  Bell, 
  User,
  Check,
  X,
  Mail,
  Key,
  Image as ImageIcon,
  Trash2,
  Settings as SettingsIcon,
  Smartphone,
  Copy,
  RefreshCw
} from 'lucide-react';
import { Dialog } from '@/components/Dialog';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AlertDialog } from '@/components/AlertDialog';

interface Setting {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'input' | 'color';
  value: any;
  icon: any;
}

interface AccountSettings {
  email: string;
  username: string;
  avatar?: string;
  lastUsernameChange?: string;
}

type TabType = 'account' | 'counter' | 'notifications' | 'security';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>('account');
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: 'public_listing',
      title: 'Public Partner Listing',
      description: 'Show your counter in our partners page',
      type: 'toggle',
      value: true,
      icon: Globe
    },
    {
      id: 'site_url',
      title: 'Counter Location',
      description: 'Where is your counter hosted?',
      type: 'input',
      value: 'https://example.com',
      icon: LinkIcon
    },
    {
      id: 'counter_color',
      title: 'Counter Color',
      description: 'Customize your counter accent color',
      type: 'color',
      value: '#00FFFF',
      icon: Eye
    }
  ]);

  const [notifications, setNotifications] = useState({
    api_usage: true,
    security: true,
    updates: false
  });

  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    email: 'user@example.com',
    username: 'cyberpunk_counter',
    avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=cyberpunk'
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const [twoFactorMethods, setTwoFactorMethods] = useState([
    {
      id: '2fa-app',
      name: 'Authenticator App',
      description: 'Use Google Authenticator or similar apps for secure 2FA codes',
      icon: Smartphone,
      enabled: false,
      recommended: true
    },
    {
      id: '2fa-email',
      name: 'Email Authentication',
      description: 'Receive verification codes via email',
      icon: Mail,
      enabled: false,
      notRecommended: true
    },
    {
      id: '2fa-backup',
      name: 'Backup Codes',
      description: 'Generate one-time use backup codes for emergency access',
      icon: Shield,
      enabled: false,
      recommended: true,
      requiresOther2FA: true
    }
  ]);

  const [setupMethod, setSetupMethod] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [expandedMethod, setExpandedMethod] = useState<string | null>(null);
  const [methodToDisable, setMethodToDisable] = useState<string | null>(null);
  const [showRegenerateConfirm, setShowRegenerateConfirm] = useState(false);

  const handleSettingChange = (id: string, newValue: any) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, value: newValue } : setting
    ));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSavedMessage('Settings saved successfully');
    setTimeout(() => setSavedMessage(null), 3000);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add password change logic
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Add avatar upload logic here
      const reader = new FileReader();
      reader.onloadend = () => {
        setAccountSettings(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation === 'DELETE') {
      // Add account deletion logic here
      console.log('Account deleted');
      setShowDeleteModal(false);
    }
  };

  const canChangeUsername = () => {
    if (!accountSettings.lastUsernameChange) return true;
    const lastChange = new Date(accountSettings.lastUsernameChange);
    const daysElapsed = (new Date().getTime() - lastChange.getTime()) / (1000 * 3600 * 24);
    return daysElapsed >= 14;
  };

  const getDaysUntilNextChange = () => {
    if (!accountSettings.lastUsernameChange) return 0;
    const lastChange = new Date(accountSettings.lastUsernameChange);
    const daysElapsed = (new Date().getTime() - lastChange.getTime()) / (1000 * 3600 * 24);
    return Math.ceil(14 - daysElapsed);
  };

  const handleUsernameChange = () => {
    if (newUsername && canChangeUsername()) {
      setAccountSettings(prev => ({
        ...prev,
        username: newUsername,
        lastUsernameChange: new Date().toISOString()
      }));
      setShowUsernameModal(false);
      setNewUsername('');
      setSavedMessage('Username updated successfully');
      setTimeout(() => setSavedMessage(null), 3000);
    }
  };

  const handleToggle2FA = async (methodId: string) => {
    const method = twoFactorMethods.find(m => m.id === methodId);
    if (!method) return;

    // If already enabled, handle management section
    if (method.enabled) {
      // If we're opening this method's management, close any open setup
      if (expandedMethod !== methodId) {
        setSetupMethod(null);
      }
      setExpandedMethod(expandedMethod === methodId ? null : methodId);
      return;
    }

    // If we're starting setup, close any open management sections
    setExpandedMethod(null);

    // Don't allow enabling backup codes without other 2FA
    if (methodId === '2fa-backup' && !twoFactorMethods.some(m => m.id !== '2fa-backup' && m.enabled)) {
      return;
    }

    setLoading(true);
    try {
      switch (methodId) {
        case '2fa-app':
          setQrCode('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/Counter:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Counter');
          setSecret('JBSWY3DPEHPK3PXP');
          setSetupMethod('2fa-app');
          break;

        case '2fa-email':
          setSetupMethod('2fa-email');
          break;

        case '2fa-backup':
          const codes = [
            'XXXX-XXXX-XXXX-1111',
            'XXXX-XXXX-XXXX-2222',
            'XXXX-XXXX-XXXX-3333',
            'XXXX-XXXX-XXXX-4444',
          ];
          setBackupCodes(codes);
          setShowBackupDialog(true);
          setTwoFactorMethods(methods => methods.map(m => 
            m.id === '2fa-backup' ? { ...m, enabled: true } : m
          ));
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      // Dummy verification - any 6 digits will work
      if (verificationCode.length === 6) {
        // Enable the current method
        setTwoFactorMethods(methods => methods.map(m => 
          m.id === setupMethod ? { ...m, enabled: true } : m
        ));

        // Generate backup codes if this is the first 2FA method
        if (!twoFactorMethods.some(m => m.enabled && m.id !== setupMethod)) {
          const codes = [
            'XXXX-XXXX-XXXX-1111',
            'XXXX-XXXX-XXXX-2222',
            'XXXX-XXXX-XXXX-3333',
            'XXXX-XXXX-XXXX-4444',
          ];
          setBackupCodes(codes);
          setTwoFactorMethods(methods => methods.map(m => 
            m.id === '2fa-backup' ? { ...m, enabled: true } : m
          ));
          setShowBackupDialog(true);
        }

        // Clean up all states
        setSetupMethod(null);
        setVerificationCode('');
        setQrCode('');
        setSecret('');
        setExpandedMethod(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerateBackupCodes = () => {
    const newCodes = [
      'YYYY-YYYY-YYYY-1111',
      'YYYY-YYYY-YYYY-2222',
      'YYYY-YYYY-YYYY-3333',
      'YYYY-YYYY-YYYY-4444',
      'YYYY-YYYY-YYYY-5555',
      'YYYY-YYYY-YYYY-6666',
      'YYYY-YYYY-YYYY-7777',
      'YYYY-YYYY-YYYY-8888'
    ];
    setBackupCodes(newCodes);
  };

  const handleDisable2FA = (methodId: string) => {
    setMethodToDisable(methodId);
  };

  const confirmDisable = async () => {
    if (!methodToDisable) return;

    setLoading(true);
    try {
      // Disable the selected method
      setTwoFactorMethods(methods => methods.map(m => 
        m.id === methodToDisable ? { ...m, enabled: false } : m
      ));

      // If disabling the last non-backup 2FA method, also disable backup codes
      const remainingEnabled = twoFactorMethods.filter(m => 
        m.enabled && m.id !== methodToDisable && m.id !== '2fa-backup'
      );
      
      if (remainingEnabled.length === 0) {
        setTwoFactorMethods(methods => methods.map(m => 
          m.id === '2fa-backup' ? { ...m, enabled: false } : m
        ));
        setBackupCodes([]);
      }

      // Reset states
      setMethodToDisable(null);
      setExpandedMethod(null);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'counter', label: 'Counter', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-mono text-neutral-200">Settings</h1>
        <p className="text-sm font-mono text-neutral-400">
          Manage your counter and account preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.04]">
        <div className="flex space-x-4">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 relative
                         font-mono text-sm transition-colors
                         ${activeTab === id 
                           ? 'text-[#00FFFF]' 
                           : 'text-neutral-400 hover:text-neutral-200'
                         }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {activeTab === id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 border-b-2 border-[#00FFFF]"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          {activeTab === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Account Settings Content */}
              <div className="space-y-4">
                {/* Profile Picture */}
                <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                               hover:border-[#00FFFF]/10 transition-colors space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <ImageIcon className="w-4 h-4 text-[#00FFFF]" />
                      <div>
                        <h3 className="font-mono text-sm text-neutral-200">Profile Picture</h3>
                        <p className="font-mono text-xs text-neutral-400 mt-0.5">
                          Your avatar will be shown on your counter page
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      {accountSettings.avatar && (
                        <img 
                          src={accountSettings.avatar} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-lg border border-white/[0.04]"
                        />
                      )}
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />
                        <span className="px-3 py-1.5 bg-black/20 rounded-lg border border-white/[0.04]
                                       text-neutral-400 hover:text-neutral-200 font-mono text-sm
                                       transition-colors">
                          Change
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                               hover:border-[#00FFFF]/10 transition-colors space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[#00FFFF]" />
                      <div>
                        <h3 className="font-mono text-sm text-neutral-200">Email Address</h3>
                        <p className="font-mono text-xs text-neutral-400 mt-0.5">
                          Your email for notifications and recovery
                        </p>
                      </div>
                    </div>
                    
                    <input
                      type="email"
                      value={accountSettings.email}
                      onChange={(e) => setAccountSettings(prev => ({ ...prev, email: e.target.value }))}
                      className="bg-black/20 rounded-lg border border-white/[0.04] px-3 py-1.5
                                font-mono text-sm text-neutral-200 
                                focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50
                                transition-colors hover:border-white/[0.08]"
                    />
                  </div>
                </div>

                {/* Username */}
                <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                               hover:border-[#00FFFF]/10 transition-colors space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-[#00FFFF]" />
                      <div>
                        <h3 className="font-mono text-sm text-neutral-200">Username</h3>
                        <p className="font-mono text-xs text-neutral-400 mt-0.5">
                          Your public display name
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm text-neutral-200">
                        {accountSettings.username}
                      </span>
                      <button
                        onClick={() => canChangeUsername() && setShowUsernameModal(true)}
                        className={`px-3 py-1.5 rounded-lg border font-mono text-sm
                                  transition-colors ${canChangeUsername()
                                    ? 'bg-black/20 border-white/[0.04] text-neutral-400 hover:text-neutral-200'
                                    : 'bg-neutral-900/50 border-white/[0.04] text-neutral-500 cursor-not-allowed'
                                  }`}
                      >
                        {canChangeUsername() ? 'Change' : `Wait ${getDaysUntilNextChange()} days`}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="p-4 bg-[#1c1c1c] rounded-xl border border-red-500/10 
                               hover:border-red-500/20 transition-colors space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Trash2 className="w-4 h-4 text-red-400" />
                      <div>
                        <h3 className="font-mono text-sm text-red-400">Delete Account</h3>
                        <p className="font-mono text-xs text-neutral-400 mt-0.5">
                          Permanently delete your account and all data
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowDeleteModal(true)}
                      className="px-3 py-1.5 bg-red-500/10 rounded-lg border border-red-500/20
                                text-red-400 hover:text-red-300 font-mono text-sm
                                transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Password Change Card */}
              <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                             hover:border-[#00FFFF]/10 transition-colors space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="w-4 h-4 text-[#00FFFF]" />
                    <div>
                      <h3 className="font-mono text-sm text-neutral-200">Password</h3>
                      <p className="font-mono text-xs text-neutral-400 mt-0.5">
                        Change your account password
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    icon={<Key className="w-4 h-4" />}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    icon={<Key className="w-4 h-4" />}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    icon={<Key className="w-4 h-4" />}
                    required
                  />
                  <Button type="submit" loading={isSaving} className="w-full">
                    Update Password
                  </Button>
                </form>
              </div>

              {/* 2FA Card */}
              <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                             hover:border-[#00FFFF]/10 transition-colors space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-[#00FFFF]" />
                    <div>
                      <h3 className="font-mono text-sm text-neutral-200">Two-Factor Authentication</h3>
                      <p className="font-mono text-xs text-neutral-400 mt-0.5">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {twoFactorMethods.map((method) => (
                    <div key={method.id} className="space-y-4">
                      <div className={`p-4 rounded-lg border transition-colors
                        ${method.requiresOther2FA && !twoFactorMethods.some(m => m.id !== '2fa-backup' && m.enabled)
                          ? 'opacity-50 cursor-not-allowed bg-black/10 border-white/[0.04]'
                          : 'bg-black/20 border-white/[0.04] hover:border-white/[0.08]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <method.icon className="w-4 h-4 text-[#00FFFF]" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-mono text-sm text-neutral-200">
                                  {method.name}
                                </h3>
                                {method.recommended && (
                                  <Badge color="green" size="sm">Recommended</Badge>
                                )}
                                {method.notRecommended && (
                                  <Badge color="red" size="sm">Not Recommended</Badge>
                                )}
                              </div>
                              <p className="text-xs font-mono text-neutral-400">
                                {method.description}
                              </p>
                            </div>
                          </div>
                          {method.enabled ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setExpandedMethod(expandedMethod === method.id ? null : method.id)}
                              className="shrink-0"
                            >
                              <Settings className="w-3 h-3 mr-1" />
                              Manage
                            </Button>
                          ) : (
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleToggle2FA(method.id)}
                              disabled={method.requiresOther2FA && 
                                       !twoFactorMethods.some(m => m.id !== '2fa-backup' && m.enabled)}
                              loading={loading}
                              className="shrink-0"
                            >
                              <Check className="w-3 h-3 mr-1" />
                              Enable
                            </Button>
                          )}
                        </div>

                        {/* Setup Instructions */}
                        {setupMethod === method.id && !method.enabled && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-4 bg-black/20 rounded-lg border border-white/[0.04] space-y-4"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-mono text-sm text-neutral-200">
                                {method.id === '2fa-app' ? 'Setup Instructions' : 'Email Verification'}
                              </h4>
                              <button
                                onClick={() => {
                                  setSetupMethod(null);
                                  setVerificationCode('');
                                }}
                                className="p-1 text-neutral-400 hover:text-neutral-200 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            {method.id === '2fa-app' && (
                              <>
                                <div className="space-y-2">
                                  <h4 className="font-mono text-sm text-neutral-200">Setup Instructions</h4>
                                  <ol className="list-decimal list-inside space-y-2 text-sm font-mono text-neutral-400">
                                    <li>Install an authenticator app</li>
                                    <li>Scan the QR code or enter the secret key</li>
                                    <li>Enter the verification code to complete setup</li>
                                  </ol>
                                </div>

                                <div className="flex justify-center">
                                  <div className="p-4 bg-white rounded-lg">
                                    <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <p className="text-sm font-mono text-neutral-400">
                                    Can't scan? Enter this code manually:
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
                              </>
                            )}

                            {method.id === '2fa-email' && (
                              <div className="space-y-2">
                                <h4 className="font-mono text-sm text-neutral-200">Email Verification</h4>
                                <p className="text-sm font-mono text-neutral-400">
                                  Enter the code sent to your email address
                                </p>
                              </div>
                            )}

                            <div className="space-y-4">
                              <Input
                                type="text"
                                placeholder="Enter 6-digit code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                icon={<Shield className="w-4 h-4" />}
                                maxLength={6}
                              />
                              <Button 
                                onClick={handleVerifyCode} 
                                className="w-full"
                                loading={loading}
                              >
                                Verify
                              </Button>
                            </div>
                          </motion.div>
                        )}

                        {/* Management Section */}
                        {method.enabled && expandedMethod === method.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 p-4 bg-black/20 rounded-lg border border-white/[0.04] space-y-4"
                          >
                            {method.id === '2fa-backup' ? (
                              <div className="space-y-4">
                                <Button
                                  variant="outline"
                                  onClick={() => setShowBackupDialog(true)}
                                  className="w-full"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Backup Codes
                                </Button>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                <p className="text-sm font-mono text-neutral-400">
                                  This method is currently active and helping protect your account.
                                </p>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDisable2FA(method.id)}
                                  loading={loading}
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Disable {method.name}
                                </Button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'counter' && (
            <motion.div
              key="counter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Counter Settings Content */}
              <div className="space-y-4">
                {settings.map(setting => (
                  <div
                    key={setting.id}
                    className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                               hover:border-[#00FFFF]/10 transition-colors space-y-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <setting.icon className="w-4 h-4 text-[#00FFFF]" />
                        <div>
                          <h3 className="font-mono text-sm text-neutral-200">
                            {setting.title}
                          </h3>
                          <p className="font-mono text-xs text-neutral-400 mt-0.5">
                            {setting.description}
                          </p>
                        </div>
                      </div>

                      {setting.type === 'toggle' && (
                        <button
                          onClick={() => handleSettingChange(setting.id, !setting.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full
                                     transition-colors duration-200 focus:outline-none
                                     ${setting.value ? 'bg-[#00FFFF]/20' : 'bg-neutral-700'}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full
                                       bg-[#00FFFF] transition-transform duration-200
                                       ${setting.value ? 'translate-x-6' : 'translate-x-1'}`}
                          />
                        </button>
                      )}

                      {setting.type === 'input' && (
                        <input
                          type="text"
                          value={setting.value}
                          onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                          className="bg-black/20 rounded-lg border border-white/[0.04] px-3 py-1
                                   font-mono text-sm text-neutral-200 
                                   focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50
                                   transition-colors hover:border-white/[0.08]"
                        />
                      )}

                      {setting.type === 'color' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={setting.value}
                            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                            className="bg-transparent border-0 rounded w-8 h-8 cursor-pointer
                                     [&::-webkit-color-swatch-wrapper]:p-0
                                     [&::-webkit-color-swatch]:border-0
                                     [&::-webkit-color-swatch]:rounded-lg"
                          />
                          <input
                            type="text"
                            value={setting.value}
                            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                            className="w-24 bg-black/20 rounded-lg border border-white/[0.04] px-3 py-1
                                     font-mono text-sm text-neutral-200 
                                     focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              key="notifications"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Notification Settings Content */}
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                               hover:border-[#00FFFF]/10 transition-colors space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-mono text-sm text-neutral-200">
                          {key.split('_').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')} Notifications
                        </h3>
                        <p className="font-mono text-xs text-neutral-400 mt-0.5">
                          Receive notifications about {key.split('_').join(' ')}
                        </p>
                      </div>

                      <button
                        onClick={() => setNotifications({
                          ...notifications,
                          [key]: !value
                        })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full
                                   transition-colors duration-200 focus:outline-none
                                   ${value ? 'bg-[#00FFFF]/20' : 'bg-neutral-700'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full
                                     bg-[#00FFFF] transition-transform duration-200
                                     ${value ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end pt-6 border-t border-white/[0.04] relative">
        <AnimatePresence>
          {savedMessage && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 flex items-center gap-2 text-emerald-400 font-mono text-sm"
            >
              <Check className="w-4 h-4" />
              {savedMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-[#1c1c1c] rounded-lg border border-[#00FFFF]/20 
                   text-[#00FFFF] hover:bg-[#00FFFF]/10
                   transition-all duration-200 font-mono text-sm
                   disabled:opacity-50 disabled:cursor-not-allowed
                   relative group"
        >
          <span className="relative z-10">
            {isSaving ? 'Saving...' : 'Save Changes'}
          </span>
          <motion.div
            className="absolute inset-0 bg-[#00FFFF]/5 rounded-lg"
            initial={false}
            animate={isSaving ? { opacity: 1 } : { opacity: 0 }}
          />
        </button>
      </div>

      {/* Username Change Dialog */}
      <Dialog
        isOpen={showUsernameModal}
        onClose={() => {
          setShowUsernameModal(false);
          setNewUsername('');
        }}
        title="Change Username"
        icon={User}
        buttons={
          <>
            <button
              onClick={() => {
                setShowUsernameModal(false);
                setNewUsername('');
              }}
              className="px-4 py-2 rounded-lg font-mono text-sm
                       text-neutral-400 hover:text-neutral-200
                       transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUsernameChange}
              disabled={!newUsername || newUsername === accountSettings.username}
              className="px-4 py-2 bg-[#1c1c1c] rounded-lg border border-[#00FFFF]/20
                       font-mono text-sm text-[#00FFFF] hover:bg-[#00FFFF]/10
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Change Username
            </button>
          </>
        }
      >
        <p className="font-mono text-sm text-neutral-400">
          Your username can only be changed once every 14 days. Choose wisely!
        </p>
        
        <div className="relative group">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            className="w-full bg-black/20 rounded-lg border border-white/[0.04] px-4 py-3 
                     font-mono text-sm text-neutral-200 
                     focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50 focus:border-[#00FFFF]/50
                     transition-colors group-hover:border-white/[0.08]"
          />
          <div className="absolute inset-0 bg-[#00FFFF]/5 opacity-0 group-hover:opacity-100 
                        rounded-lg transition-opacity pointer-events-none" />
        </div>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteConfirmation('');
        }}
        title="Delete Account"
        icon={Trash2}
        iconColor="#ef4444"
        buttons={
          <>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirmation('');
              }}
              className="px-4 py-2 rounded-lg font-mono text-sm
                       text-neutral-400 hover:text-neutral-200
                       transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== 'DELETE'}
              className="px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/20
                       font-mono text-sm text-red-400 hover:text-red-300
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Account
            </button>
          </>
        }
      >
        <p className="font-mono text-sm text-neutral-400">
          This action cannot be undone. This will permanently delete your account
          and remove all associated data.
        </p>
        
        <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
          <p className="font-mono text-sm text-red-400">
            Please type <span className="font-bold">DELETE</span> to confirm
          </p>
        </div>

        <div className="relative group">
          <input
            type="text"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value.toUpperCase())}
            placeholder="Type DELETE to confirm"
            className="w-full bg-black/20 rounded-lg border border-white/[0.04] px-4 py-3 
                     font-mono text-sm text-neutral-200 uppercase tracking-wider
                     focus:outline-none focus:border-red-500/50
                     focus:ring-2 focus:ring-red-500/20 focus:ring-offset-0
                     transition-all duration-200 group-hover:border-white/[0.08]
                     placeholder:normal-case placeholder:tracking-normal"
          />
          <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 
                        rounded-lg transition-opacity pointer-events-none" />
        </div>
      </Dialog>

      {/* Backup Codes Dialog */}
      <Dialog
        open={showBackupDialog}
        onClose={() => setShowBackupDialog(false)}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-mono text-neutral-200">Backup Codes</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateBackupCodes}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(backupCodes.join('\n'))}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy All
              </Button>
            </div>
          </div>

          <p className="text-sm font-mono text-amber-500">
            Save these codes in a secure place. Each code can only be used once.
          </p>

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
        </div>
      </Dialog>

      {/* Disable Confirmation Dialog */}
      <AlertDialog
        open={!!methodToDisable}
        onClose={() => setMethodToDisable(null)}
        title="Disable Two-Factor Authentication"
        description={
          methodToDisable === '2fa-backup'
            ? 'Are you sure you want to disable backup codes? You can regenerate them at any time.'
            : `This will make your account less secure. ${
                methodToDisable && methodToDisable !== '2fa-backup' &&
                !twoFactorMethods.some(m => m.enabled && m.id !== methodToDisable && m.id !== '2fa-backup')
                  ? '\n\nNote: This will also disable your backup codes since no other 2FA method will be active.'
                  : ''
              }`
        }
        confirmText="Disable"
        onConfirm={confirmDisable}
        loading={loading}
        variant="destructive"
      />

      {/* Regenerate Backup Codes Confirmation */}
      <AlertDialog
        open={showRegenerateConfirm}
        onClose={() => setShowRegenerateConfirm(false)}
        title="Regenerate Backup Codes"
        description="This will invalidate your existing backup codes. Make sure to save the new ones."
        confirmText="Regenerate"
        onConfirm={() => {
          handleRegenerateBackupCodes();
          setShowRegenerateConfirm(false);
        }}
        loading={loading}
      />
    </div>
  );
} 