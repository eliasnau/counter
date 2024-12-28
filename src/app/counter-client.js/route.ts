import { NextResponse } from 'next/server';

export async function GET() {
  const clientScript = `
    class CounterClient {
      constructor(options = {}) {
        this.ws = null;
        this.callbacks = [];
        this.options = {
          autoConnect: true,
          ...options
        };
        
        if (this.options.autoConnect) {
          this.connect();
        }

        if (this.options.onUpdate) {
          this.onUpdate(this.options.onUpdate);
        }
      }

      async connect() {
        try {
          const response = await fetch('https://counterclick.eliasnau.dev/api/realtime');
          const { url, projectId, channel } = await response.json();

          this.ws = new WebSocket(\`\${url}?project=\${projectId}\`);

          this.ws.onopen = () => {
            this.ws?.send(JSON.stringify({
              type: 'subscribe',
              channels: [channel],
            }));
          };

          this.ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              if (data.events?.[0]?.includes('documents') && data.payload?.count !== undefined) {
                this.callbacks.forEach(cb => cb(data.payload.count));
              }
            } catch (error) {
              console.error('Failed to parse message:', error);
            }
          };

          this.ws.onclose = () => {
            setTimeout(() => this.connect(), 5000);
          };

        } catch (error) {
          console.error('Connection failed:', error);
          setTimeout(() => this.connect(), 5000);
        }
      }

      onUpdate(callback) {
        this.callbacks.push(callback);
        return () => {
          this.callbacks = this.callbacks.filter(cb => cb !== callback);
        };
      }

      disconnect() {
        this.ws?.close();
        this.ws = null;
      }
    }

    // Expose to window object
    window.CounterClient = CounterClient;
  `;

  return new NextResponse(clientScript, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
} 