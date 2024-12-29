import { Hash, ChevronRight } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-2xl text-[#00FFFF] flex items-center gap-2">
          <Hash className="w-6 h-6" />
          Documentation
        </h1>
        <p className="font-mono text-neutral-400">
          Learn how to integrate and customize counters for your website or application.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/docs/quickstart" 
           className="group p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                    hover:border-[#00FFFF]/20 transition-colors">
          <h2 className="font-mono text-lg text-neutral-200 mb-2">
            Quick Start
          </h2>
          <p className="font-mono text-sm text-neutral-400 mb-4">
            Get up and running with Counter in less than 5 minutes.
          </p>
          <div className="flex items-center gap-2 text-[#00FFFF] 
                        group-hover:gap-3 transition-all">
            <span className="font-mono text-sm">Get Started</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </a>

        <a href="/docs/installation"
           className="group p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                    hover:border-[#00FFFF]/20 transition-colors">
          <h2 className="font-mono text-lg text-neutral-200 mb-2">
            Installation
          </h2>
          <p className="font-mono text-sm text-neutral-400 mb-4">
            Different ways to install and integrate Counter.
          </p>
          <div className="flex items-center gap-2 text-[#00FFFF]
                        group-hover:gap-3 transition-all">
            <span className="font-mono text-sm">View Options</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </a>
      </div>

      {/* Core Concepts */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Core Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/docs/api/rest"
             className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                      hover:border-[#00FFFF]/20 transition-colors">
            <h3 className="font-mono text-base text-neutral-200 mb-2">API Reference</h3>
            <p className="font-mono text-sm text-neutral-400">
              Explore our REST and WebSocket APIs for advanced integration.
            </p>
          </a>

          <a href="/docs/settings"
             className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                      hover:border-[#00FFFF]/20 transition-colors">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Settings</h3>
            <p className="font-mono text-sm text-neutral-400">
              Learn how to configure and customize your counters.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
} 