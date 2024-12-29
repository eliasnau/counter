'use client';

import { useState } from 'react';
import { Copy, Key, Plus, Trash2, Check, Code, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string | null;
  permissions: string[];
  isVisible?: boolean;
}

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'ck_live_12345abcdef67890',
      created: '2024-03-20',
      lastUsed: '2024-03-21',
      permissions: ['read', 'write'],
      isVisible: false
    }
  ]);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showUsageExample, setShowUsageExample] = useState<string | null>(null);

  const handleCopyKey = async (id: string, key: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleKeyVisibility = (id: string) => {
    setApiKeys(keys => keys.map(key => 
      key.id === id ? { ...key, isVisible: !key.isVisible } : key
    ));
  };

  const handleCreateKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `ck_live_${Math.random().toString(36).substring(2, 18)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: null,
      permissions: selectedPermissions,
      isVisible: true // Show new keys by default
    };
    setApiKeys([...apiKeys, newKey]);
    setShowNewKeyModal(false);
    setNewKeyName('');
    setSelectedPermissions([]);
  };

  const formatHiddenKey = (key: string) => {
    const prefix = key.split('_')[0] + '_' + key.split('_')[1] + '_';
    const rest = '•'.repeat(key.length - prefix.length);
    return prefix + rest;
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-mono text-neutral-200">API Keys</h1>
          <p className="text-sm font-mono text-neutral-400">
            Manage your API keys for accessing the Counter API
          </p>
        </div>
        <button 
          onClick={() => setShowNewKeyModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                     border border-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/10
                     transition-all duration-200 font-mono text-sm"
        >
          <Plus className="w-4 h-4" />
          Create New Key
        </button>
      </div>

      <div className="space-y-4">
        {apiKeys.map((key) => (
          <div 
            key={key.id}
            className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                       hover:border-[#00FFFF]/10 transition-colors space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Key className="w-4 h-4 text-[#00FFFF]" />
                <span className="font-mono text-neutral-200">{key.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleCopyKey(key.id, key.key)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                             bg-black/20 border border-white/[0.04]
                             text-neutral-400 hover:text-neutral-200
                             transition-colors text-sm font-mono group"
                >
                  {copiedId === key.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 group-hover:text-[#00FFFF]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => toggleKeyVisibility(key.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                             bg-black/20 border border-white/[0.04]
                             text-neutral-400 hover:text-neutral-200
                             transition-colors text-sm font-mono"
                >
                  {key.isVisible ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button 
                  onClick={() => setShowUsageExample(key.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                             bg-black/20 border border-white/[0.04]
                             text-neutral-400 hover:text-neutral-200
                             transition-colors text-sm font-mono"
                >
                  <Code className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setApiKeys(apiKeys.filter(k => k.id !== key.id))}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                             bg-black/20 border border-white/[0.04]
                             text-red-400 hover:text-red-300
                             transition-colors text-sm font-mono"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm font-mono">
              <div className="text-neutral-400">
                Created: <span className="text-neutral-300">{key.created}</span>
              </div>
              {key.lastUsed && (
                <div className="text-neutral-400">
                  Last used: <span className="text-neutral-300">{key.lastUsed}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                {key.permissions.map(perm => (
                  <span 
                    key={perm}
                    className="px-2 py-0.5 rounded-full text-xs bg-[#00FFFF]/5 text-[#00FFFF] border border-[#00FFFF]/20"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.04] font-mono text-sm">
              <code className="text-[#00FFFF]">
                {key.isVisible ? key.key : formatHiddenKey(key.key)}
              </code>
            </div>

            <AnimatePresence>
              {showUsageExample === key.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-white/[0.04] space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-sm text-neutral-200">Usage Example</h3>
                      <a 
                        href="/docs/api"
                        className="flex items-center gap-1 text-xs text-[#00FFFF] hover:underline"
                      >
                        View API Docs
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <pre className="bg-black/20 p-4 rounded-lg text-sm overflow-x-auto">
                      <code className="text-neutral-300">
{`fetch('https://counter.eliasnau.dev/api/count', {
  headers: {
    'Authorization': 'Bearer ${key.key}',
    'Content-Type': 'application/json'
  }
})`}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showNewKeyModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md p-6 bg-[#1c1c1c] rounded-xl border border-white/[0.04] space-y-6"
            >
              <h2 className="text-xl font-mono text-neutral-200">Create New API Key</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-mono text-sm text-neutral-400">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="w-full bg-black/20 rounded-lg border border-white/[0.04] px-4 py-2 
                             font-mono text-sm text-neutral-200 
                             focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50"
                    placeholder="e.g., Production API Key"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-sm text-neutral-400">
                    Permissions
                  </label>
                  <div className="flex gap-2">
                    {['read', 'write'].map(perm => (
                      <button
                        key={perm}
                        onClick={() => {
                          if (selectedPermissions.includes(perm)) {
                            setSelectedPermissions(selectedPermissions.filter(p => p !== perm));
                          } else {
                            setSelectedPermissions([...selectedPermissions, perm]);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-sm font-mono transition-colors
                                  ${selectedPermissions.includes(perm)
                                    ? 'bg-[#00FFFF]/10 text-[#00FFFF] border-[#00FFFF]/20'
                                    : 'bg-black/20 text-neutral-400 border-white/[0.04]'
                                  } border`}
                      >
                        {perm}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/[0.04]">
                <button
                  onClick={() => setShowNewKeyModal(false)}
                  className="px-4 py-2 rounded-lg text-sm font-mono
                           text-neutral-400 hover:text-neutral-200
                           transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateKey}
                  disabled={!newKeyName || selectedPermissions.length === 0}
                  className="px-4 py-2 rounded-lg text-sm font-mono
                           bg-[#00FFFF]/10 text-[#00FFFF] border border-[#00FFFF]/20
                           hover:bg-[#00FFFF]/20 transition-colors
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Key
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 