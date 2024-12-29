'use client';

import { useState } from 'react';
import { use } from 'react';
import { 
  Hash, 
  Globe, 
  Lock, 
  Shield, 
  Zap, 
  MousePointerClick, 
  Timer,
  BarChart3,
  Clock,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Code,
  Settings,
  LineChart,
  Share2,
  Terminal,
  Paintbrush,
  Webhook
} from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';
import { useToast } from '@/components/ui/ToastProvider';

interface CounterData {
  id: string;
  name: string;
  count: number;
  isPublic: boolean;
  createdAt: string;
  lastUpdated: string;
  views: number;
  settings: {
    rateLimit: boolean;
    instantUpdate: boolean;
    clickEffect: boolean;
    multipleClicks: boolean;
  };
}

type Section = 'overview' | 'settings' | 'appearance' | 'embed' | 'webhooks' | 'analytics';

export default function CounterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { showToast } = useToast();
  const [activeSection, setActiveSection] = useState<Section>('overview');
  
  // Mock data - replace with real data fetch
  const [counter, setCounter] = useState<CounterData>({
    id,
    name: 'Main Counter',
    count: 42069,
    isPublic: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastUpdated: '2024-03-19T15:30:00Z',
    views: 1337,
    settings: {
      rateLimit: true,
      instantUpdate: false,
      clickEffect: true,
      multipleClicks: false,
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!', 'success');
  };

  const handleSettingChange = (setting: keyof typeof counter.settings) => {
    setCounter(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [setting]: !prev.settings[setting]
      }
    }));
    showToast(`${setting} ${counter.settings[setting] ? 'disabled' : 'enabled'}`, 'info');
  };

  // Update visibility handler
  const handleVisibilityChange = () => {
    setCounter(prev => ({
      ...prev,
      isPublic: !prev.isPublic
    }));
    showToast(
      `Counter is now ${counter.isPublic ? 'private' : 'public'}`,
      'info'
    );
  };

  const sections: { id: Section; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: Hash },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'appearance', label: 'Appearance', icon: Paintbrush },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'embed', label: 'Embed', icon: Code }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-mono text-neutral-200">{counter.name}</h1>
          <div className="flex items-center gap-2 text-neutral-400">
            <Hash className="w-4 h-4" />
            <span className="font-mono text-sm">{counter.id}</span>
            <button 
              onClick={() => copyToClipboard(counter.id)}
              className="p-1 hover:text-neutral-200 transition-colors"
            >
              <Copy className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {/* TODO: Add share handler */}}
            className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                     border border-white/[0.04] text-neutral-200 hover:text-neutral-100
                     hover:border-white/[0.08] transition-all duration-200 font-mono text-sm"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={() => window.open(`/counter/${counter.id}`, '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                     border border-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/10
                     transition-all duration-200 font-mono text-sm"
          >
            <ExternalLink className="w-4 h-4" />
            View Counter
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2 border-b border-white/[0.04] -mx-8 px-8">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-4 py-3 font-mono text-sm
                       border-b-2 transition-colors relative -mb-[2px]
                       ${activeSection === section.id
                         ? 'border-[#00FFFF] text-[#00FFFF]'
                         : 'border-transparent text-neutral-400 hover:text-neutral-200'
                       }`}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeSection === 'overview' && (
          <>
            {/* Existing stats grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Current Count */}
              <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                            hover:border-[#00FFFF]/10 transition-colors">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <Hash className="w-4 h-4" />
                  <span className="font-mono text-xs">Current Count</span>
                </div>
                <p className="font-mono text-2xl text-[#00FFFF]">
                  {counter.count.toLocaleString()}
                </p>
              </div>

              {/* Total Views */}
              <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                            hover:border-[#00FFFF]/10 transition-colors">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-mono text-xs">Total Views</span>
                </div>
                <p className="font-mono text-2xl text-[#00FFFF]">
                  {counter.views.toLocaleString()}
                </p>
              </div>

              {/* Last Updated */}
              <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                            hover:border-[#00FFFF]/10 transition-colors">
                <div className="flex items-center gap-2 text-neutral-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-xs">Last Updated</span>
                </div>
                <p className="font-mono text-sm text-neutral-200">
                  {formatDate(counter.lastUpdated)}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-lg text-neutral-200">Quick Actions</h2>
                <div className="h-px flex-1 bg-white/[0.04]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                                hover:border-[#00FFFF]/10 transition-colors text-left">
                  <div className="flex items-center gap-2 text-neutral-400 mb-2">
                    <Terminal className="w-4 h-4" />
                    <span className="font-mono text-xs">API Documentation</span>
                  </div>
                  <p className="font-mono text-sm text-neutral-200">
                    Learn how to integrate this counter
                  </p>
                </button>
                <button className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                                hover:border-[#00FFFF]/10 transition-colors text-left">
                  <div className="flex items-center gap-2 text-neutral-400 mb-2">
                    <LineChart className="w-4 h-4" />
                    <span className="font-mono text-xs">View Analytics</span>
                  </div>
                  <p className="font-mono text-sm text-neutral-200">
                    See detailed statistics
                  </p>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-lg text-neutral-200">Recent Activity</h2>
                <div className="h-px flex-1 bg-white/[0.04]" />
              </div>
              <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
                {/* Add activity feed here */}
                <p className="font-mono text-sm text-neutral-400">
                  Activity feed coming soon...
                </p>
              </div>
            </div>
          </>
        )}

        {activeSection === 'settings' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-lg text-neutral-200">Settings</h2>
              <div className="h-px flex-1 bg-white/[0.04]" />
            </div>

            <div className="grid gap-3">
              {/* Visibility */}
              <div
                onClick={handleVisibilityChange}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {counter.isPublic ? (
                    <Globe className="w-4 h-4 text-[#00FFFF]" />
                  ) : (
                    <Lock className="w-4 h-4 text-[#00FFFF]" />
                  )}
                  <span className="font-mono text-sm text-neutral-200">
                    {counter.isPublic ? 'Public Counter' : 'Private Counter'}
                  </span>
                </div>
                <Toggle checked={counter.isPublic} />
              </div>

              {/* Rate Limiting */}
              <div
                onClick={() => handleSettingChange('rateLimit')}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-[#00FFFF]" />
                  <span className="font-mono text-sm text-neutral-200">Rate Limiting</span>
                </div>
                <Toggle checked={counter.settings.rateLimit} />
              </div>

              {/* Real-time Updates */}
              <div
                onClick={() => handleSettingChange('instantUpdate')}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-[#00FFFF]" />
                  <span className="font-mono text-sm text-neutral-200">Real-time Updates</span>
                </div>
                <Toggle checked={counter.settings.instantUpdate} />
              </div>

              {/* Click Effect */}
              <div
                onClick={() => handleSettingChange('clickEffect')}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <MousePointerClick className="w-4 h-4 text-[#00FFFF]" />
                  <span className="font-mono text-sm text-neutral-200">Click Effect</span>
                </div>
                <Toggle checked={counter.settings.clickEffect} />
              </div>

              {/* Multiple Clicks */}
              <div
                onClick={() => handleSettingChange('multipleClicks')}
                className="flex items-center justify-between p-3 bg-black/20 
                          rounded-lg border border-white/[0.04] group w-full
                          hover:border-[#00FFFF]/20 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Timer className="w-4 h-4 text-[#00FFFF]" />
                  <span className="font-mono text-sm text-neutral-200">Multiple Clicks</span>
                </div>
                <Toggle checked={counter.settings.multipleClicks} />
              </div>
            </div>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div className="space-y-4">
            <p className="font-mono text-sm text-neutral-400">
              Appearance settings coming soon...
            </p>
          </div>
        )}

        {activeSection === 'embed' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-lg text-neutral-200">Embed</h2>
              <div className="h-px flex-1 bg-white/[0.04]" />
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-black/20 rounded-lg border border-white/[0.04]
                            group hover:border-[#00FFFF]/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <LinkIcon className="w-4 h-4" />
                    <span className="font-mono text-xs">Counter URL</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`https://counter.dev/${counter.id}`)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md
                             text-xs font-mono text-neutral-400
                             hover:text-neutral-200 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <code className="font-mono text-sm text-neutral-200">
                  https://counter.dev/{counter.id}
                </code>
              </div>

              <div className="p-4 bg-black/20 rounded-lg border border-white/[0.04]
                            group hover:border-[#00FFFF]/20 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Code className="w-4 h-4" />
                    <span className="font-mono text-xs">Embed Code</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(`<iframe src="https://counter.dev/embed/${counter.id}" />`)}
                    className="flex items-center gap-1 px-2 py-1 rounded-md
                             text-xs font-mono text-neutral-400
                             hover:text-neutral-200 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <code className="font-mono text-sm text-neutral-200">
                  &lt;iframe src=&quot;https://counter.dev/embed/{counter.id}&quot; /&gt;
                </code>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'webhooks' && (
          <div className="space-y-4">
            <p className="font-mono text-sm text-neutral-400">
              Webhook configuration coming soon...
            </p>
          </div>
        )}

        {activeSection === 'analytics' && (
          <div className="space-y-4">
            <p className="font-mono text-sm text-neutral-400">
              Analytics dashboard coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 