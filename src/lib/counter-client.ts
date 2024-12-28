export interface CounterClientOptions {
  onUpdate?: (count: number) => void;
  autoConnect?: boolean;
}

export class CounterClient {
  private ws: WebSocket | null = null;
  private callbacks: ((count: number) => void)[] = [];
  private reconnectTimer: NodeJS.Timeout | null = null;
  private options: CounterClientOptions;

  constructor(options: CounterClientOptions = {}) {
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

  async connect(): Promise<void> {
    try {
      const response = await fetch('https://counterclick.eliasnau.dev/api/realtime');
      const { url, projectId, channel } = await response.json();

      this.ws = new WebSocket(`${url}?project=${projectId}`);

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
        this.scheduleReconnect();
      };

    } catch (error) {
      console.error('Connection failed:', error);
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.reconnectTimer = setTimeout(() => this.connect(), 5000);
  }

  onUpdate(callback: (count: number) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.ws?.close();
    this.ws = null;
  }
}

// Export a singleton instance for direct usage
export const counterClient = new CounterClient();

// Also export the class for custom instantiation
export default CounterClient; 
} 