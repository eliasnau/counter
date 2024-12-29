import { Terminal, ExternalLink } from 'lucide-react';
import { Code } from '@/components/ui/Code';
import { CodeBlock } from '@/components/ui/CodeBlock';

export default function InstallationPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-2xl text-[#00FFFF] flex items-center gap-2">
          <Terminal className="w-6 h-6" />
          Installation
        </h1>
        <p className="font-mono text-neutral-400">
          Choose your preferred method to install and integrate Counter.
        </p>
      </div>

      {/* Script Tag */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">
          Script Tag
        </h2>
        <p className="font-mono text-sm text-neutral-400">
          The simplest way to add Counter to your website is by adding our script tag to your HTML.
        </p>
        <Code 
          code='<script src="https://counter.dev/script.js" data-id="YOUR_COUNTER_ID"></script>'
          language="HTML"
        />
        <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
          <h3 className="font-mono text-sm text-neutral-200 mb-2">Available Options</h3>
          <ul className="space-y-2">
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">data-id</code>
              <span className="text-neutral-400">Your counter ID (required)</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">data-theme</code>
              <span className="text-neutral-400">Counter theme (light/dark)</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">data-style</code>
              <span className="text-neutral-400">Custom CSS styles</span>
            </li>
          </ul>
        </div>
      </div>

      {/* NPM Package */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">
          NPM Package
        </h2>
        <p className="font-mono text-sm text-neutral-400">
          For React, Vue, and other JavaScript frameworks, you can use our NPM package.
        </p>
        <Code 
          code="npm install @counter/client"
          language="npm"
        />
        <div className="space-y-4">
          <h3 className="font-mono text-base text-neutral-200">Usage Examples</h3>
          <CodeBlock 
            code={`import { Counter } from '@counter/client';

// React
function App() {
  return <Counter id="YOUR_COUNTER_ID" />;
}

// Vue
<template>
  <Counter id="YOUR_COUNTER_ID" />
</template>

// Svelte
<Counter id="YOUR_COUNTER_ID" />`}
            language="JavaScript"
          />
        </div>
      </div>

      {/* API Integration */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">
          API Integration
        </h2>
        <p className="font-mono text-sm text-neutral-400">
          For more control, you can integrate directly with our API.
        </p>
        <Code 
          code={`fetch('https://api.counter.dev/v1/count', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    id: 'YOUR_COUNTER_ID'
  })
})`}
          language="JavaScript"
        />
        <div className="flex items-center gap-4">
          <a 
            href="/docs/api/rest" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                     border border-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/10
                     transition-all duration-200 font-mono text-sm"
          >
            API Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* WebSocket Integration */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">
          WebSocket Integration
        </h2>
        <p className="font-mono text-sm text-neutral-400">
          For real-time updates, you can use our WebSocket API.
        </p>
        <CodeBlock 
          code={`const ws = new WebSocket('wss://ws.counter.dev');

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: 'subscribe',
    counterId: 'YOUR_COUNTER_ID',
    apiKey: 'YOUR_API_KEY'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('New count:', data.count);
};`}
          language="JavaScript"
        />
        <div className="flex items-center gap-4">
          <a 
            href="/docs/api/websockets" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c1c1c] rounded-lg 
                     border border-[#00FFFF]/20 text-[#00FFFF] hover:bg-[#00FFFF]/10
                     transition-all duration-200 font-mono text-sm"
          >
            WebSocket Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
} 