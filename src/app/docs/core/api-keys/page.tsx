import { Code } from '@/components/ui/Code';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Key } from 'lucide-react';

export default function ApiKeysPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-2xl text-[#00FFFF] flex items-center gap-2">
          <Key className="w-6 h-6" />
          API Keys
        </h1>
        <p className="font-mono text-neutral-400">
          Learn how to manage and secure your API keys for Counter integration.
        </p>
      </div>

      {/* Getting Started */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Getting Started</h2>
        <p className="font-mono text-sm text-neutral-400">
          API keys are required for accessing Counter's REST and WebSocket APIs. Each key has specific permissions and rate limits.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Production Keys</h3>
            <p className="font-mono text-sm text-neutral-400">
              Full access with higher rate limits. Use these in your production environment.
            </p>
          </div>
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Development Keys</h3>
            <p className="font-mono text-sm text-neutral-400">
              Limited access with lower rate limits. Perfect for testing and development.
            </p>
          </div>
        </div>
      </div>

      {/* Key Management */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Key Management</h2>
        <p className="font-mono text-sm text-neutral-400">
          Best practices for managing your API keys:
        </p>
        <div className="space-y-6">
          {/* Creating Keys */}
          <div className="space-y-2">
            <h3 className="font-mono text-base text-neutral-200">Creating Keys</h3>
            <p className="font-mono text-sm text-neutral-400">
              Generate new API keys from your dashboard with specific permissions:
            </p>
            <Code 
              code="https://counter.dev/dashboard/api-keys/new"
              language="URL"
            />
          </div>

          {/* Using Keys */}
          <div className="space-y-2">
            <h3 className="font-mono text-base text-neutral-200">Using Keys</h3>
            <p className="font-mono text-sm text-neutral-400">
              Include your API key in the Authorization header:
            </p>
            <CodeBlock 
              code={`// REST API
fetch('https://api.counter.dev/v1/count', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

// WebSocket
ws.send(JSON.stringify({
  type: 'auth',
  apiKey: 'YOUR_API_KEY'
}));`}
              language="JavaScript"
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Security</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Best Practices</h3>
            <ul className="space-y-2 font-mono text-sm text-neutral-400">
              <li>• Never expose API keys in client-side code</li>
              <li>• Use environment variables to store keys</li>
              <li>• Rotate keys regularly</li>
              <li>• Use different keys for different environments</li>
              <li>• Monitor key usage for suspicious activity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Environment Variables</h2>
        <p className="font-mono text-sm text-neutral-400">
          Securely store your API keys using environment variables:
        </p>
        <div className="space-y-4">
          <CodeBlock 
            code={`# .env
COUNTER_API_KEY=your_api_key_here

# Next.js
NEXT_PUBLIC_COUNTER_API_KEY=your_api_key_here

# Node.js
process.env.COUNTER_API_KEY`}
            language="ENV"
          />
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h4 className="font-mono text-sm text-neutral-200 mb-2">Framework Examples</h4>
            <CodeBlock 
              code={`// Next.js
const apiKey = process.env.COUNTER_API_KEY;

// React
const apiKey = import.meta.env.VITE_COUNTER_API_KEY;

// Node.js
require('dotenv').config();
const apiKey = process.env.COUNTER_API_KEY;`}
              language="JavaScript"
            />
          </div>
        </div>
      </div>

      {/* Rate Limits */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Rate Limits</h2>
        <p className="font-mono text-sm text-neutral-400">
          Understanding API key rate limits and quotas:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Production Limits</h3>
            <ul className="space-y-2 font-mono text-sm text-neutral-400">
              <li>• 1000 requests per minute</li>
              <li>• 100,000 requests per day</li>
              <li>• 10 concurrent connections</li>
              <li>• Unlimited counters</li>
            </ul>
          </div>
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h3 className="font-mono text-base text-neutral-200 mb-2">Development Limits</h3>
            <ul className="space-y-2 font-mono text-sm text-neutral-400">
              <li>• 100 requests per minute</li>
              <li>• 10,000 requests per day</li>
              <li>• 3 concurrent connections</li>
              <li>• 10 counters maximum</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 