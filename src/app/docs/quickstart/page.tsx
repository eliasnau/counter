import { Zap, Copy, Terminal, ExternalLink } from 'lucide-react';
import { Code } from '@/components/ui/Code';

export default function QuickStartPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-2xl text-[#00FFFF] flex items-center gap-2">
          <Zap className="w-6 h-6" />
          Quick Start
        </h1>
        <p className="font-mono text-neutral-400">
          Get your first counter up and running in minutes.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {/* Step 1: Create Account */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-3 font-mono text-lg text-neutral-200">
            <div className="flex items-center justify-center w-5 h-5 rounded-full 
                          bg-[#00FFFF]/10 text-[#00FFFF] text-sm">
              1
            </div>
            Create an Account
          </h2>
          <p className="font-mono text-sm text-neutral-400">
            Sign up for a free account to get started. You'll need this to create and manage your counters.
          </p>
          <a 
            href="/register" 
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                     border border-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/10
                     transition-all duration-200 font-mono text-sm"
          >
            Create Account
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Step 2: Create Counter */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-3 font-mono text-lg text-neutral-200">
            <div className="flex items-center justify-center w-5 h-5 rounded-full 
                          bg-[#00FFFF]/10 text-[#00FFFF] text-sm">
              2
            </div>
            Create a Counter
          </h2>
          <p className="font-mono text-sm text-neutral-400">
            From your dashboard, create a new counter. You'll get a unique counter ID that you'll use to integrate it into your site.
          </p>
          <Code 
            code="https://counter.dev/dashboard/counters"
            language="Dashboard URL"
          />
        </div>

        {/* Step 3: Add Script */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-3 font-mono text-lg text-neutral-200">
            <div className="flex items-center justify-center w-5 h-5 rounded-full 
                          bg-[#00FFFF]/10 text-[#00FFFF] text-sm">
              3
            </div>
            Add the Script
          </h2>
          <p className="font-mono text-sm text-neutral-400">
            Add our script to your website's HTML. Replace <code className="text-[#00FFFF]">YOUR_COUNTER_ID</code> with 
            your actual counter ID.
          </p>
          <div className="space-y-4">
            <Code 
              code='<script src="https://counter.dev/script.js" data-id="YOUR_COUNTER_ID"></script>'
              language="HTML"
            />
            <Code 
              code="npm install @counter/client"
              language="npm"
            />
          </div>
        </div>

        {/* Step 4: Verify */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-3 font-mono text-lg text-neutral-200">
            <div className="flex items-center justify-center w-5 h-5 rounded-full 
                          bg-[#00FFFF]/10 text-[#00FFFF] text-sm">
              4
            </div>
            Verify Installation
          </h2>
          <p className="font-mono text-sm text-neutral-400">
            Visit your website and check your dashboard to see if the counter is working.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="/dashboard" 
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                       border border-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/10
                       transition-all duration-200 font-mono text-sm"
            >
              View Dashboard
              <ExternalLink className="w-4 h-4" />
            </a>
            <a 
              href="/docs/troubleshooting" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                       border border-white/[0.04] text-neutral-400 hover:text-neutral-200
                       hover:border-white/[0.08] transition-all duration-200 font-mono text-sm"
            >
              Troubleshooting
              <Terminal className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="/docs/api/rest" 
             className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                      hover:border-[#00FFFF]/20 transition-colors">
            <h3 className="font-mono text-base text-neutral-200 mb-2">API Reference</h3>
            <p className="font-mono text-sm text-neutral-400">
              Learn about our REST and WebSocket APIs for advanced integration.
            </p>
          </a>
          <a href="/docs/settings" 
             className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]
                      hover:border-[#00FFFF]/20 transition-colors">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Configuration</h3>
            <p className="font-mono text-sm text-neutral-400">
              Customize your counter's behavior and appearance.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
} 