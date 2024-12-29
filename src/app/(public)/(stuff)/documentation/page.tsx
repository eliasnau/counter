import { Badge } from "@/components/ui/Badge";

export default function Docs() {
  return (
    <div className="min-h-screen bg-[#171717] pt-24 pb-12 bg-grid">
      <div className="max-w-2xl mx-auto px-4 space-y-12 relative">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="font-mono text-2xl text-[#00FFFF] animate-pulse">
            Documentation
          </h1>
          <p className="font-mono text-neutral-400">
            Learn how to add the counter to your website
          </p>
        </div>

        {/* WebSocket Client */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-mono text-left text-sm text-[#00FFFF]">
              WebSocket Client
            </h2>
            <Badge variant="outline" className="text-emerald-400 border-emerald-400/20">
              Real-time
            </Badge>
          </div>
          
          <div className="space-y-2">
            <p className="font-mono text-left text-sm text-neutral-400">
              Add this script to your HTML:
            </p>
            <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
              <code className="text-sm text-neutral-200">
                {`<script src="https://counter.eliasnau.dev/counter-client.js"></script>`}
              </code>
            </pre>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-left text-sm text-neutral-400">
              Initialize the client:
            </p>
            <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
              <code className="text-sm">
                <span className="text-[#81b3ff]">const</span>{" "}
                <span className="text-neutral-200">counter</span>{" "}
                <span className="text-neutral-200">=</span>{" "}
                <span className="text-[#81b3ff]">new</span>{" "}
                <span className="text-[#70c0b1]">CounterClient</span>
                <span className="text-neutral-200">{"({"}</span>
                {"\n  "}
                <span className="text-[#a5d4ff]">onUpdate:</span>{" "}
                <span className="text-neutral-200">(count)</span>{" "}
                <span className="text-[#81b3ff]">={'>'}</span>{" "}
                <span className="text-neutral-200">{"{"}</span>
                {"\n    "}
                <span className="text-[#70c0b1]">console</span>
                <span className="text-neutral-200">.</span>
                <span className="text-[#a5d4ff]">log</span>
                <span className="text-neutral-200">(</span>
                <span className="text-[#a8b1ff]">'New count:'</span>
                <span className="text-neutral-200">,</span>{" "}
                <span className="text-neutral-200">count</span>
                <span className="text-neutral-200">);</span>
                {"\n  "}
                <span className="text-neutral-200">{"}"}</span>
                {"\n"}
                <span className="text-neutral-200">{"});"}</span>
              </code>
            </pre>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-mono text-left text-sm text-[#00FFFF]">
              API Endpoints
            </h2>
            <Badge variant="outline" className="text-blue-400 border-blue-400/20">
              REST
            </Badge>
          </div>

          <div className="space-y-6">
            {/* Get Count */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-green-400 border-green-400/20">
                  GET
                </Badge>
                <p className="font-mono text-left text-sm text-neutral-400">
                  Get Current Count
                </p>
              </div>
              <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04] group hover:border-[#00FFFF]/10 transition-colors">
                <code className="text-sm text-blue-300">
                  GET https://counter.eliasnau.dev/api/count
                </code>
              </pre>
            </div>

            {/* Increment Counter */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-yellow-400 border-yellow-400/20">
                  POST
                </Badge>
                <p className="font-mono text-left text-sm text-neutral-400">
                  Increment Counter
                </p>
              </div>
              <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04] group hover:border-[#00FFFF]/10 transition-colors">
                <code className="text-sm text-blue-300">
                  POST https://counter.eliasnau.dev/api/increment
                </code>
              </pre>
              <p className="font-mono text-left text-sm text-neutral-400 mt-2">
                Request body:
              </p>
              <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04] group hover:border-[#00FFFF]/10 transition-colors">
                <code className="text-sm">
                  <span className="text-neutral-300">{"{"}</span>
                  {"\n  "}
                  <span className="text-purple-400">"value"</span>
                  <span className="text-neutral-300">:</span>{" "}
                  <span className="text-green-300">1</span>
                  <span className="text-neutral-400">{" // number between -6 and 3"}</span>
                  {"\n"}
                  <span className="text-neutral-300">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* React Usage */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="font-mono text-left text-sm text-[#00FFFF]">
              React Integration
            </h2>
            <Badge variant="outline" className="text-purple-400 border-purple-400/20">
              React
            </Badge>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-left text-sm text-neutral-400">
              Using the counter in a React component:
            </p>
            <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
              <code className="text-sm">
                <span className="text-[#81b3ff]">import</span>{" "}
                <span className="text-neutral-200">{"{ useState, useEffect }"}</span>{" "}
                <span className="text-[#81b3ff]">from</span>{" "}
                <span className="text-[#a8b1ff]">'react';</span>
                {"\n\n"}
                <span className="text-[#81b3ff]">export default function</span>{" "}
                <span className="text-[#a5d4ff]">Counter</span>
                <span className="text-neutral-200">() {"{"}</span>
                {"\n  "}
                <span className="text-[#81b3ff]">const</span>{" "}
                <span className="text-neutral-200">[count, setCount] = </span>
                <span className="text-[#a5d4ff]">useState</span>
                <span className="text-neutral-200">(0);</span>
                {"\n\n  "}
                <span className="text-[#a5d4ff]">useEffect</span>
                <span className="text-neutral-200">{"(() => {"}</span>
                {"\n    "}
                <span className="text-[#81b3ff]">const</span>{" "}
                <span className="text-neutral-200">counter = </span>
                <span className="text-[#81b3ff]">new</span>{" "}
                <span className="text-[#70c0b1]">CounterClient</span>
                <span className="text-neutral-200">({"{"}</span>
                {"\n      "}
                <span className="text-neutral-200">onUpdate: setCount</span>
                {"\n    "}
                <span className="text-neutral-200">{"});"}</span>
                {"\n\n    "}
                <span className="text-[#81b3ff]">return</span>{" "}
                <span className="text-neutral-200">() ={'>'} counter.</span>
                <span className="text-[#a5d4ff]">disconnect</span>
                <span className="text-neutral-200">();</span>
                {"\n  "}
                <span className="text-neutral-200">{"}, []);"}</span>
                {"\n\n  "}
                <span className="text-[#81b3ff]">async function</span>{" "}
                <span className="text-[#a5d4ff]">increment</span>
                <span className="text-neutral-200">() {"{"}</span>
                {"\n    "}
                <span className="text-[#81b3ff]">try</span>{" "}
                <span className="text-neutral-200">{"{"}</span>
                {"\n      "}
                <span className="text-[#81b3ff]">await</span>{" "}
                <span className="text-neutral-200">fetch('https://counter.eliasnau.dev/api/increment', {"{"}</span>
                {"\n        "}
                <span className="text-neutral-200">method: 'POST',</span>
                {"\n        "}
                <span className="text-neutral-200">headers: {"{"} 'Content-Type': 'application/json' {"}"},</span>
                {"\n        "}
                <span className="text-neutral-200">body: JSON.stringify({"{"} value: 1 {"}"})</span>
                {"\n      "}
                <span className="text-neutral-200">{"});"}</span>
                {"\n    "}
                <span className="text-neutral-200">{"}"}</span>{" "}
                <span className="text-[#81b3ff]">catch</span>{" "}
                <span className="text-neutral-200">(error) {"{"}</span>
                {"\n      "}
                <span className="text-neutral-200">console.error('Failed to increment:', error);</span>
                {"\n    "}
                <span className="text-neutral-200">{"}"}</span>
                {"\n  "}
                <span className="text-neutral-200">{"}"}</span>
                {"\n\n  "}
                <span className="text-[#81b3ff]">return</span>{" "}
                <span className="text-neutral-200">{"("}</span>
                {"\n    "}
                <span className="text-neutral-200">{"<div>"}</span>
                {"\n      "}
                <span className="text-neutral-200">{"<p>Current count: {count}</p>"}</span>
                {"\n      "}
                <span className="text-neutral-200">{"<button onClick={increment}>Increment</button>"}</span>
                {"\n    "}
                <span className="text-neutral-200">{"</div>"}</span>
                {"\n  "}
                <span className="text-neutral-200">{");"}</span>
                {"\n"}
                <span className="text-neutral-200">{"}"}</span>
              </code>
            </pre>
          </div>

          <div className="space-y-2">
            <p className="font-mono text-left text-sm text-neutral-400">
              Function call example:
            </p>
            <pre className="bg-[#1c1c1c] p-4 rounded-xl overflow-x-auto border border-white/[0.04]">
              <code className="text-sm">
                <span className="text-[#81b3ff]">async function</span>{" "}
                <span className="text-[#a5d4ff]">updateCounter</span>
                <span className="text-neutral-200">(value) {"{"}</span>
                {"\n  "}
                <span className="text-[#81b3ff]">const</span>{" "}
                <span className="text-neutral-200">response = </span>
                <span className="text-[#81b3ff]">await</span>{" "}
                <span className="text-[#a5d4ff]">fetch</span>
                <span className="text-neutral-200">(</span>
                <span className="text-[#a8b1ff]">'https://counter.eliasnau.dev/api/increment'</span>
                <span className="text-neutral-200">, {"{"}</span>
                {"\n    "}
                <span className="text-[#a5d4ff]">method</span>
                <span className="text-neutral-200">: </span>
                <span className="text-[#a8b1ff]">'POST'</span>
                <span className="text-neutral-200">,</span>
                {"\n    "}
                <span className="text-[#a5d4ff]">headers</span>
                <span className="text-neutral-200">: {"{"} </span>
                <span className="text-[#a5d4ff]">'Content-Type'</span>
                <span className="text-neutral-200">: </span>
                <span className="text-[#a8b1ff]">'application/json'</span>
                <span className="text-neutral-200">{" }"}</span>
                {"\n  "}
                <span className="text-neutral-200">{"});"}</span>
                {"\n  "}
                <span className="text-[#81b3ff]">return</span>{" "}
                <span className="text-neutral-200">response.</span>
                <span className="text-[#a5d4ff]">json</span>
                <span className="text-neutral-200">();</span>
                {"\n"}
                <span className="text-neutral-200">{"}"}</span>
              </code>
            </pre>
          </div>
        </div>

        {/* Limitations */}
        <div className="space-y-4">
          <h2 className="font-mono text-left text-sm text-[#00FFFF]">
            Limitations
          </h2>
          <div className="space-y-2">
            {[
              "500ms cooldown between actions",
              "Values must be between -6 and +3",
              "Counter cannot go below 0",
              "Maximum 100 requests per minute per IP"
            ].map((limit) => (
              <div key={limit} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]" />
                <p className="font-mono text-left text-sm text-neutral-400">
                  {limit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}