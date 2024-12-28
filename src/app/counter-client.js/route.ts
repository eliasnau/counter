import { NextResponse } from 'next/server';

export async function GET() {
  const host = 'localhost:3000';
  const protocol = host.includes('localhost') ? 'http' : 'https';

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
          console.log('Fetching realtime config...');
          const response = await fetch('${protocol}://${host}/api/realtime');
          const config = await response.json();
          console.log('Realtime config:', config);

          const { url, projectId, channel } = config;

          const wsUrl = \`\${url}?project=\${projectId}&channels[]=\${encodeURIComponent(channel)}\`;
          console.log('Connecting to:', wsUrl);
          
          this.ws = new WebSocket(wsUrl);

          this.ws.onmessage = (event) => {
            try {
              const data = JSON.parse(event.data);
              console.log('Received:', data);
              
              // Updated event handling
              if (data.type === 'event' && data.data?.payload?.count !== undefined) {
                console.log('Count updated:', data.data.payload.count);
                this.callbacks.forEach(cb => cb(data.data.payload.count));
              }

              if (data.type === 'error') {
                console.error('Subscription error:', data);
              }
            } catch (error) {
              console.error('Failed to parse message:', error);
            }
          };

          this.ws.onclose = (event) => {
            console.log('WebSocket closed:', event.code, event.reason);
            setTimeout(() => this.connect(), 5000);
          };

          this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
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
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': '*',
    },
  });
}