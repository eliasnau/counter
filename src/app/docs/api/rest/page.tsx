import { Code } from '@/components/ui/Code';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Network } from 'lucide-react';

export default function RestApiPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-2xl text-[#00FFFF] flex items-center gap-2">
          <Network className="w-6 h-6" />
          REST API
        </h1>
        <p className="font-mono text-neutral-400">
          Learn how to interact with Counter using our REST API endpoints.
        </p>
      </div>

      {/* Authentication */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Authentication</h2>
        <p className="font-mono text-sm text-neutral-400">
          All API requests require authentication using your API key. Include it in the Authorization header:
        </p>
        <Code 
          code={`Authorization: Bearer YOUR_API_KEY`}
          language="HTTP"
        />
      </div>

      {/* Base URL */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Base URL</h2>
        <p className="font-mono text-sm text-neutral-400">
          All API endpoints are relative to:
        </p>
        <Code 
          code="https://api.counter.dev/v1"
          language="URL"
        />
      </div>

      {/* Endpoints */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg text-neutral-200">Endpoints</h2>

        {/* Create Counter */}
        <div className="space-y-4">
          <h3 className="font-mono text-base text-neutral-200">Create Counter</h3>
          <CodeBlock 
            code={`POST /counters

{
  "name": "My Counter",
  "isPublic": true
}`}
            language="HTTP"
          />
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h4 className="font-mono text-sm text-neutral-200 mb-2">Parameters</h4>
            <ul className="space-y-2">
              <li className="flex gap-2 font-mono text-sm">
                <code className="text-[#00FFFF]">name</code>
                <span className="text-neutral-400">Counter name (required)</span>
              </li>
              <li className="flex gap-2 font-mono text-sm">
                <code className="text-[#00FFFF]">isPublic</code>
                <span className="text-neutral-400">Visibility setting (optional)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Increment Counter */}
        <div className="space-y-4">
          <h3 className="font-mono text-base text-neutral-200">Increment Counter</h3>
          <CodeBlock 
            code={`POST /count

{
  "id": "YOUR_COUNTER_ID",
  "increment": 1
}`}
            language="HTTP"
          />
          <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
            <h4 className="font-mono text-sm text-neutral-200 mb-2">Parameters</h4>
            <ul className="space-y-2">
              <li className="flex gap-2 font-mono text-sm">
                <code className="text-[#00FFFF]">id</code>
                <span className="text-neutral-400">Counter ID (required)</span>
              </li>
              <li className="flex gap-2 font-mono text-sm">
                <code className="text-[#00FFFF]">increment</code>
                <span className="text-neutral-400">Amount to increment (default: 1)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Get Counter */}
        <div className="space-y-4">
          <h3 className="font-mono text-base text-neutral-200">Get Counter</h3>
          <CodeBlock 
            code={`GET /counters/:id

// Response
{
  "id": "counter_123",
  "name": "My Counter",
  "count": 42,
  "isPublic": true,
  "createdAt": "2024-01-01T00:00:00Z"
}`}
            language="HTTP"
          />
        </div>

        {/* List Counters */}
        <div className="space-y-4">
          <h3 className="font-mono text-base text-neutral-200">List Counters</h3>
          <CodeBlock 
            code={`GET /counters

// Response
{
  "counters": [
    {
      "id": "counter_123",
      "name": "My Counter",
      "count": 42,
      "isPublic": true
    },
    // ...
  ],
  "total": 10
}`}
            language="HTTP"
          />
        </div>
      </div>

      {/* Error Handling */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Error Handling</h2>
        <p className="font-mono text-sm text-neutral-400">
          The API uses conventional HTTP response codes to indicate success or failure.
        </p>
        <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
          <ul className="space-y-2">
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">200</code>
              <span className="text-neutral-400">Success</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">400</code>
              <span className="text-neutral-400">Bad Request - Invalid parameters</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">401</code>
              <span className="text-neutral-400">Unauthorized - Invalid API key</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">404</code>
              <span className="text-neutral-400">Not Found - Counter doesn't exist</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">429</code>
              <span className="text-neutral-400">Too Many Requests - Rate limit exceeded</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 