'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  Hash,
  Globe,
  Lock,
  BarChart3,
  MoreVertical,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
  Timer,
  Shield,
  Zap,
  MousePointerClick,
  Smartphone
} from 'lucide-react';
import { Dialog } from '@/components/Dialog';
import { Toggle } from '@/components/ui/Toggle';

interface Counter {
  id: string;
  name: string;
  count: number;
  isPublic: boolean;
  createdAt: string;
  lastUpdated: string;
  views: number;
  settings: {
    rateLimit: boolean;
    mobileOptimized: boolean;
    instantUpdate: boolean;
    clickEffect: boolean;
    multipleClicks: boolean;
  };
}

export default function Counters() {
  const [counters, setCounters] = useState<Counter[]>([
    {
      id: '1',
      name: 'Main Counter',
      count: 42069,
      isPublic: true,
      createdAt: '2024-01-01T00:00:00Z',
      lastUpdated: '2024-03-19T15:30:00Z',
      views: 1337,
      settings: {
        rateLimit: true,
        mobileOptimized: true,
        instantUpdate: false,
        clickEffect: true,
        multipleClicks: false,
      }
    },
    {
      id: '2',
      name: 'Test Counter',
      count: 123,
      isPublic: false,
      createdAt: '2024-03-01T00:00:00Z',
      lastUpdated: '2024-03-19T14:20:00Z',
      views: 45,
      settings: {
        rateLimit: true,
        mobileOptimized: true,
        instantUpdate: false,
        clickEffect: true,
        multipleClicks: false,
      }
    }
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [counterToDelete, setCounterToDelete] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [showNewCounterModal, setShowNewCounterModal] = useState(false);
  const [newCounter, setNewCounter] = useState({
    name: '',
    isPublic: true,
    settings: {
      rateLimit: true,
      instantUpdate: false,
      clickEffect: true,
      multipleClicks: false,
    }
  });

  const handleDelete = () => {
    if (counterToDelete && deleteConfirmation === 'DELETE') {
      setCounters(counters.filter(counter => counter.id !== counterToDelete));
      setShowDeleteModal(false);
      setCounterToDelete(null);
      setDeleteConfirmation('');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCreateCounter = () => {
    if (newCounter.name) {
      const counter: Counter = {
        id: Math.random().toString(36).substr(2, 9),
        name: newCounter.name,
        count: 0,
        isPublic: newCounter.isPublic,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        views: 0,
        settings: {
          ...newCounter.settings,
          mobileOptimized: true
        }
      };

      setCounters([counter, ...counters]);
      setShowNewCounterModal(false);
      setNewCounter({
        name: '',
        isPublic: true,
        settings: {
          rateLimit: true,
          instantUpdate: false,
          clickEffect: true,
          multipleClicks: false,
        }
      });
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-mono text-neutral-200">Counters</h1>
          <p className="text-sm font-mono text-neutral-400">
            Manage and track your counters
          </p>
        </div>

        <button
          onClick={() => setShowNewCounterModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                   border border-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/10
                   transition-all duration-200 font-mono text-sm"
        >
          <Plus className="w-4 h-4" />
          New Counter
        </button>
      </div>

      {/* Counters List */}
      <div className="space-y-4">
        {counters.map((counter) => (
          <div
            key={counter.id}
            className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04] 
                     hover:border-[#00FFFF]/10 transition-colors relative group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 
                             bg-black/20 rounded-lg border border-white/[0.04]">
                  <Hash className="w-5 h-5 text-[#00FFFF]" />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-sm text-neutral-200">
                      {counter.name}
                    </h3>
                    {counter.isPublic ? (
                      <Globe className="w-3 h-3 text-neutral-400" />
                    ) : (
                      <Lock className="w-3 h-3 text-neutral-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="font-mono text-2xl text-[#00FFFF]">
                      {counter.count.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <BarChart3 className="w-3 h-3" />
                      <span className="font-mono text-xs">
                        {counter.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowDropdown(showDropdown === counter.id ? null : counter.id)}
                  className="p-1 rounded hover:bg-white/[0.04] transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-neutral-400" />
                </button>

                <AnimatePresence>
                  {showDropdown === counter.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-[#1c1c1c] rounded-lg border border-white/[0.04]
                               shadow-xl z-10"
                    >
                      <div className="p-1">
                        <button
                          onClick={() => {/* TODO: Add edit handler */}}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg
                                   text-left font-mono text-sm text-neutral-400
                                   hover:bg-white/[0.04] hover:text-neutral-200 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit Counter
                        </button>
                        <button
                          onClick={() => {/* TODO: Add copy handler */}}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg
                                   text-left font-mono text-sm text-neutral-400
                                   hover:bg-white/[0.04] hover:text-neutral-200 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          Copy ID
                        </button>
                        <button
                          onClick={() => {/* TODO: Add view handler */}}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg
                                   text-left font-mono text-sm text-neutral-400
                                   hover:bg-white/[0.04] hover:text-neutral-200 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Counter
                        </button>
                        <button
                          onClick={() => {
                            setCounterToDelete(counter.id);
                            setShowDeleteModal(true);
                            setShowDropdown(null);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg
                                   text-left font-mono text-sm text-red-400
                                   hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Counter
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/[0.04]">
              <p className="font-mono text-xs text-neutral-400">
                Created {formatDate(counter.createdAt)}
              </p>
              <p className="font-mono text-xs text-neutral-400">
                Last updated {formatDate(counter.lastUpdated)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* New Counter Dialog */}
      <Dialog
        isOpen={showNewCounterModal}
        onClose={() => {
          setShowNewCounterModal(false);
          setNewCounter({
            name: '',
            isPublic: true,
            settings: {
              rateLimit: true,
              instantUpdate: false,
              clickEffect: true,
              multipleClicks: false,
            }
          });
        }}
        title="Create Counter"
        icon={Hash}
        buttons={
          <>
            <button
              onClick={() => {
                setShowNewCounterModal(false);
                setNewCounter({
                  name: '',
                  isPublic: true,
                  settings: {
                    rateLimit: true,
                    instantUpdate: false,
                    clickEffect: true,
                    multipleClicks: false,
                  }
                });
              }}
              className="px-4 py-2 rounded-lg font-mono text-sm
                       text-neutral-400 hover:text-neutral-200
                       transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCounter}
              disabled={!newCounter.name}
              className="px-4 py-2 bg-[#1c1c1c] rounded-lg border border-[#00FFFF]/20
                       font-mono text-sm text-[#00FFFF] hover:bg-[#00FFFF]/10
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Counter
            </button>
          </>
        }
      >
        <div className="space-y-6">
          {/* Counter Name */}
          <div className="space-y-2">
            <label className="block font-mono text-sm text-neutral-400">
              Name
            </label>
            <div className="relative group">
              <input
                type="text"
                value={newCounter.name}
                onChange={(e) => setNewCounter({ ...newCounter, name: e.target.value })}
                placeholder="My Awesome Counter"
                className="w-full bg-black/20 rounded-lg border border-white/[0.04] px-4 py-3 
                         font-mono text-sm text-neutral-200 
                         focus:outline-none focus:ring-1 focus:ring-[#00FFFF]/50 focus:border-[#00FFFF]/50
                         transition-colors group-hover:border-white/[0.08]"
              />
              <div className="absolute inset-0 bg-[#00FFFF]/5 opacity-0 group-hover:opacity-100 
                            rounded-lg transition-opacity pointer-events-none" />
            </div>
          </div>

          {/* Counter Options */}
          <div className="space-y-4">
            <label className="block font-mono text-sm text-neutral-400">
              Options
            </label>
            <div className="grid gap-3">
              {/* Rate Limiting */}
              <button
                onClick={() => setNewCounter({
                  ...newCounter,
                  settings: {
                    ...newCounter.settings,
                    rateLimit: !newCounter.settings.rateLimit
                  }
                })}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-[#00FFFF]" />
                  <span className="font-mono text-sm text-neutral-200">Rate Limiting</span>
                </div>
                <Toggle checked={newCounter.settings.rateLimit} />
              </button>

              {/* Real-time Updates */}
              <button
                onClick={() => setNewCounter({
                  ...newCounter,
                  settings: {
                    ...newCounter.settings,
                    instantUpdate: !newCounter.settings.instantUpdate
                  }
                })}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-[#00FFFF]" />
                  <span className="font-mono text-sm text-neutral-200">Real-time Updates</span>
                </div>
                <Toggle checked={newCounter.settings.instantUpdate} />
              </button>

              {/* Click Effect */}
              <button
                onClick={() => setNewCounter({
                  ...newCounter,
                  settings: {
                    ...newCounter.settings,
                    clickEffect: !newCounter.settings.clickEffect
                  }
                })}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MousePointerClick className="w-4 h-4 text-[#00FFFF]" />
                  <span className="font-mono text-sm text-neutral-200">Click Effect</span>
                </div>
                <Toggle checked={newCounter.settings.clickEffect} />
              </button>

              {/* Multiple Clicks */}
              <button
                onClick={() => setNewCounter({
                  ...newCounter,
                  settings: {
                    ...newCounter.settings,
                    multipleClicks: !newCounter.settings.multipleClicks
                  }
                })}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Timer className="w-4 h-4 text-[#00FFFF]" />
                  <span className="font-mono text-sm text-neutral-200">Multiple Clicks</span>
                </div>
                <Toggle checked={newCounter.settings.multipleClicks} />
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Delete Counter Dialog */}
      <Dialog
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setCounterToDelete(null);
          setDeleteConfirmation('');
        }}
        title="Delete Counter"
        icon={Trash2}
        iconColor="#ef4444"
        buttons={
          <>
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setCounterToDelete(null);
                setDeleteConfirmation('');
              }}
              className="px-4 py-2 rounded-lg font-mono text-sm
                       text-neutral-400 hover:text-neutral-200
                       transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteConfirmation !== 'DELETE'}
              className="px-4 py-2 bg-red-500/10 rounded-lg border border-red-500/20
                       font-mono text-sm text-red-400 hover:text-red-300
                       transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Counter
            </button>
          </>
        }
      >
        <p className="font-mono text-sm text-neutral-400">
          This action cannot be undone. This will permanently delete your counter
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
    </div>
  );
} 