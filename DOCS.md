# Counter Click Client Documentation

This documentation explains how to integrate the Counter Click client into your Next.js application.

## Installation

No installation needed! The client is served directly from `counter.eliasnau.dev`.

## Usage in Next.js

### 1. Create a Counter Component

Create a new component file:

```typescript:components/Counter.tsx
'use client';

import { useEffect, useState } from 'react';

export function Counter() {
  const [count, setCount] = useState<number>(0);

      });
  useEffect(() => {
    // Load the client script
    const script = document.createElement('script');
    script.src = 'https://counter.eliasnau.dev/counter-client.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize the counter after script loads
      const counter = new window.CounterClient({
        onUpdate: (newCount: number) => {
          setCount(newCount);
        }
      });

      // Cleanup on unmount
      return () => counter.disconnect();
    };

    document.body.appendChild(script);

    // Cleanup script on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>Current Count: {count.toString().padStart(7, '0')}</h1>
    </div>
  );
}
```

### 2. Use the Counter Component

Import and use the Counter component in any page:

```typescript:app/page.tsx
import { Counter } from '@/components/Counter';

export default function Home() {
  return (
    <main>
      <Counter />
    </main>
  );
}
```

## TypeScript Support

Add type definitions for the Counter Client:

```typescript:types/counter-client.d.ts
interface CounterClientOptions {
  onUpdate?: (count: number) => void;
  autoConnect?: boolean;
}

declare class CounterClient {
  constructor(options?: CounterClientOptions);
  connect(): Promise<void>;
  disconnect(): void;
  onUpdate(callback: (count: number) => void): () => void;
}

interface Window {
  CounterClient: typeof CounterClient;
}
```

## Styling Example

Add some styles to make it look nice:

```typescript:components/Counter.tsx
'use client';

import { useEffect, useState } from 'react';
import styles from './Counter.module.css';

export function Counter() {
  const [count, setCount] = useState<number>(0);

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
    <div className={styles.counter}>
      <h1 className={styles.value}>{count.toString().padStart(7, '0')}</h1>
    </div>
  );
}
```

```css:components/Counter.module.css
.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #171717;
}

.value {
  font-family: monospace;
  font-size: 4rem;
  color: #fff;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
}
```

## Features

- Real-time updates using WebSocket
- Automatic reconnection on disconnect
- TypeScript support
- Clean unmount handling
- Zero dependencies (other than React)

## Notes

- The counter is shared globally across all instances
- Updates are received in real-time
- The connection will automatically reconnect if disconnected
- The client script is loaded dynamically to prevent SSR issues 