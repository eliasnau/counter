import { Code } from '@/components/ui/Code';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Hash } from 'lucide-react';

export default function CountersPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-2xl text-[#00FFFF] flex items-center gap-2">
          <Hash className="w-6 h-6" />
          Counters
        </h1>
        <p className="font-mono text-neutral-400">
          Learn about counter types, behaviors, and best practices.
        </p>
      </div>

      {/* Types of Counters */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Types of Counters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Simple Counter</h3>
            <p className="font-mono text-sm text-neutral-400 mb-4">
              Basic increment-only counter for page views or simple metrics.
            </p>
            <Code 
              code='<script src="https://counter.dev/script.js" data-id="counter_123"></script>'
              language="HTML"
            />
          </div>

          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Advanced Counter</h3>
            <p className="font-mono text-sm text-neutral-400 mb-4">
              Configurable counter with custom behaviors and styling.
            </p>
            <Code 
              code='<script src="https://counter.dev/script.js" data-id="counter_123" data-theme="dark" data-style="minimal"></script>'
              language="HTML"
            />
          </div>
        </div>
      </div>

      {/* Counter Behavior */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Counter Behavior</h2>
        <p className="font-mono text-sm text-neutral-400">
          Understanding how counters increment and handle different scenarios.
        </p>
        
        <div className="space-y-6">
          {/* Unique Visits */}
          <div className="space-y-2">
            <h3 className="font-mono text-base text-neutral-200">Unique Visits</h3>
            <p className="font-mono text-sm text-neutral-400">
              By default, counters use cookies to track unique visits within a 24-hour period.
            </p>
          </div>

          {/* Multiple Pages */}
          <div className="space-y-2">
            <h3 className="font-mono text-base text-neutral-200">Multiple Pages</h3>
            <p className="font-mono text-sm text-neutral-400">
              Use the same counter across multiple pages to track site-wide visits:
            </p>
            <CodeBlock 
              code={`// homepage.html
<script src="https://counter.dev/script.js" data-id="site_visits"></script>

// about.html
<script src="https://counter.dev/script.js" data-id="site_visits"></script>

// blog.html
<script src="https://counter.dev/script.js" data-id="site_visits"></script>`}
              language="HTML"
            />
          </div>

          {/* Custom Increments */}
          <div className="space-y-2">
            <h3 className="font-mono text-base text-neutral-200">Custom Increments</h3>
            <p className="font-mono text-sm text-neutral-400">
              Manually increment counters using the JavaScript API:
            </p>
            <CodeBlock 
              code={`// Increment by 1
Counter.increment('counter_123');

// Increment by custom amount
Counter.increment('counter_123', 5);

// Increment with callback
Counter.increment('counter_123', 1, (newCount) => {
  console.log('New count:', newCount);
});`}
              language="JavaScript"
            />
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Performance</h3>
            <ul className="space-y-2 font-mono text-sm text-neutral-400">
              <li>• Load script asynchronously</li>
              <li>• Use one counter for similar metrics</li>
              <li>• Implement rate limiting for manual increments</li>
              <li>• Cache counter values when possible</li>
            </ul>
          </div>

          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Security</h3>
            <ul className="space-y-2 font-mono text-sm text-neutral-400">
              <li>• Keep your counter ID private</li>
              <li>• Use environment variables</li>
              <li>• Implement API key rotation</li>
              <li>• Monitor for unusual activity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Usage */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Advanced Usage</h2>
        <p className="font-mono text-sm text-neutral-400">
          Advanced counter configurations and customizations:
        </p>
        <CodeBlock 
          code={`<script
  src="https://counter.dev/script.js"
  data-id="counter_123"
  data-theme="dark"
  data-style="minimal"
  data-digit-size="20"
  data-background="#000000"
  data-color="#00FFFF"
  data-increment="unique"
  data-interval="7d"
></script>`}
          language="HTML"
        />
        <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
          <h4 className="font-mono text-sm text-neutral-200 mb-2">Configuration Options</h4>
          <ul className="space-y-2">
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">data-theme</code>
              <span className="text-neutral-400">Visual theme (light/dark)</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">data-style</code>
              <span className="text-neutral-400">Display style (default/minimal/compact)</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">data-increment</code>
              <span className="text-neutral-400">Increment behavior (all/unique)</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">data-interval</code>
              <span className="text-neutral-400">Unique visit interval (24h/7d/30d)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 