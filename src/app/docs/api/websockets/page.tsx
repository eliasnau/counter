import { Code } from '@/components/ui/Code';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Wifi } from 'lucide-react';

export default function WebSocketsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-2xl text-[#00FFFF] flex items-center gap-2">
          <Wifi className="w-6 h-6" />
          WebSocket API
        </h1>
        <p className="font-mono text-neutral-400">
          Real-time counter updates using WebSocket connections.
        </p>
      </div>

      {/* Connection */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Connection</h2>
        <p className="font-mono text-sm text-neutral-400">
          Connect to our WebSocket server using this endpoint:
        </p>
        <Code 
          code="wss://ws.counter.dev"
          language="WebSocket URL"
        />
      </div>

      {/* Authentication */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Authentication</h2>
        <p className="font-mono text-sm text-neutral-400">
          After connecting, send an authentication message with your API key:
        </p>
        <CodeBlock 
          code={`{
  "type": "auth",
  "apiKey": "YOUR_API_KEY"
}`}
          language="JSON"
        />
      </div>

      {/* Messages */}
      <div className="space-y-6">
        <h2 className="font-mono text-lg text-neutral-200">Messages</h2>

        {/* Subscribe */}
        <div className="space-y-4">
          <h3 className="font-mono text-base text-neutral-200">Subscribe to Counter</h3>
          <p className="font-mono text-sm text-neutral-400">
            Subscribe to real-time updates for a specific counter:
          </p>
          <CodeBlock 
            code={`// Client -> Server
{
  "type": "subscribe",
  "counterId": "YOUR_COUNTER_ID"
}`}
            language="JSON"
          />
        </div>

        {/* Update Events */}
        <div className="space-y-4">
          <h3 className="font-mono text-base text-neutral-200">Update Events</h3>
          <p className="font-mono text-sm text-neutral-400">
            You'll receive these events when the counter updates:
          </p>
          <CodeBlock 
            code={`// Server -> Client
{
  "type": "update",
  "counterId": "counter_123",
  "count": 42,
  "timestamp": "2024-01-01T00:00:00Z"
}`}
            language="JSON"
          />
        </div>

        {/* Unsubscribe */}
        <div className="space-y-4">
          <h3 className="font-mono text-base text-neutral-200">Unsubscribe</h3>
          <p className="font-mono text-sm text-neutral-400">
            Stop receiving updates for a counter:
          </p>
          <CodeBlock 
            code={`// Client -> Server
{
  "type": "unsubscribe",
  "counterId": "YOUR_COUNTER_ID"
}`}
            language="JSON"
          />
        </div>
      </div>

      {/* Example Usage */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Example Usage</h2>
        <p className="font-mono text-sm text-neutral-400">
          Complete example of WebSocket integration:
        </p>
        <CodeBlock 
          code={`const ws = new WebSocket('wss://ws.counter.dev');

// Handle connection open
ws.onopen = () => {
  // Authenticate
  ws.send(JSON.stringify({
    type: 'auth',
    apiKey: 'YOUR_API_KEY'
  }));

  // Subscribe to counter
  ws.send(JSON.stringify({
    type: 'subscribe',
    counterId: 'YOUR_COUNTER_ID'
  }));
};

// Handle incoming messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch (data.type) {
    case 'update':
      console.log('Counter updated:', data.count);
      break;
    case 'error':
      console.error('Error:', data.message);
      break;
  }
};

// Handle errors
ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Handle disconnection
ws.onclose = () => {
  console.log('Disconnected from WebSocket');
};`}
          language="JavaScript"
        />
      </div>

      {/* Error Handling */}
      <div className="space-y-4">
        <h2 className="font-mono text-lg text-neutral-200">Error Handling</h2>
        <p className="font-mono text-sm text-neutral-400">
          The server may send error messages in this format:
        </p>
        <CodeBlock 
          code={`{
  "type": "error",
  "code": "auth_failed",
  "message": "Invalid API key"
}`}
          language="JSON"
        />
        <div className="p-4 bg-[#1c1c1c] rounded-xl border border-white/[0.04]">
          <h4 className="font-mono text-sm text-neutral-200 mb-2">Error Codes</h4>
          <ul className="space-y-2">
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">auth_failed</code>
              <span className="text-neutral-400">Authentication failed</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">invalid_counter</code>
              <span className="text-neutral-400">Counter ID doesn't exist</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">rate_limited</code>
              <span className="text-neutral-400">Too many messages sent</span>
            </li>
            <li className="flex gap-2 font-mono text-sm">
              <code className="text-[#00FFFF]">invalid_message</code>
              <span className="text-neutral-400">Malformed message</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 