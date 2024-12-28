export default function Docs() {
  return (
    <div className="min-h-screen bg-[#171717] pt-24 pb-12 bg-grid">
      <div className="max-w-2xl mx-auto px-4 space-y-12 relative">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-mono text-2xl text-[#00FFFF]">Documentation</h1>
          <p className="font-mono text-neutral-400">
            Learn how to add the counter to your website
          </p>
        </div>

        {/* WebSocket Client */}
        <div className="space-y-2">
          <p className="font-mono text-left text-sm text-[#00FFFF]">
            WebSocket Client
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            Add this script to your HTML:
          </p>
          <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
            <code className="text-sm text-neutral-200">
              {`<script src="https://counter.eliasnau.dev/counter-client.js"></script>`}
            </code>
          </pre>
          <p className="font-mono text-left text-sm text-neutral-400 mt-4">
            Initialize the client:
          </p>
          <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
            <code className="text-sm text-neutral-200">
{`const counter = new CounterClient({
  onUpdate: (count) => {
    console.log('New count:', count);
  }
});`}
            </code>
          </pre>
        </div>

        {/* API Endpoints */}
        <div className="space-y-2">
          <p className="font-mono text-left text-sm text-[#00FFFF]">
            API Endpoints
          </p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-left text-sm text-neutral-400">
                Get Current Count
              </p>
              <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
                <code className="text-sm text-neutral-200">
                  GET https://counter.eliasnau.dev/api/count
                </code>
              </pre>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-left text-sm text-neutral-400">
                Increment Counter
              </p>
              <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
                <code className="text-sm text-neutral-200">
                  POST https://counter.eliasnau.dev/api/increment
                </code>
              </pre>
              <p className="font-mono text-left text-sm text-neutral-400 mt-2">
                Request body:
              </p>
              <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
                <code className="text-sm text-neutral-200">
{`{
  "value": 1  // number between -6 and 3
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* React Example */}
        <div className="space-y-2">
          <p className="font-mono text-left text-sm text-[#00FFFF]">
            React Integration
          </p>
          <p className="font-mono text-left text-sm text-neutral-400">
            Example React component:
          </p>
          <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
            <code className="text-sm text-neutral-200">
{`import { useEffect, useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://counter.eliasnau.dev/counter-client.js';
    script.async = true;
    
    script.onload = () => {
      const counter = new window.CounterClient({
        onUpdate: setCount
      });

      return () => counter.disconnect();
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>{count.toString().padStart(7, '0')}</h1>
    </div>
  );
}`}
            </code>
          </pre>
        </div>

        {/* Limitations */}
        <div className="space-y-2">
          <p className="font-mono text-left text-sm text-[#00FFFF]">
            Limitations
          </p>
          <div className="space-y-1">
            <p className="font-mono text-left text-sm text-neutral-400">
              • 500ms cooldown between actions
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              • Values must be between -6 and +3
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              • Counter cannot go below 0
            </p>
            <p className="font-mono text-left text-sm text-neutral-400">
              • Maximum 100 requests per minute per IP
            </p>
          </div>
        </div>

        {/* Grid Overlay */}
        <div className="fixed inset-0 pointer-events-none bg-grid-small opacity-20" />
      </div>
    </div>
  )
} 