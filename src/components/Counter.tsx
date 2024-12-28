'use client'

import React, { useState, useEffect } from 'react';
import { NumberColumn } from './NumberColumn';
import { CooldownBar } from './CooldownBar';
import { ActionGrid } from './ActionGrid';
import { anonymousLogin, incrementCounter, getCounter, subscribeToCounter } from '@/lib/appwrite';

export function Counter() {
  const [count, setCount] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const digits = count.toString().padStart(7, '0').split('');

  useEffect(() => {
    const init = async () => {
      try {
        const [session, initialCounter] = await Promise.all([
          anonymousLogin(),
          getCounter()
        ]);
        
        setUserId(session.$id);
        if (initialCounter.success) {
          setCount(initialCounter.count);
        }
      } catch (error) {
        console.error('Initialization failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    init();

    // Subscribe to realtime updates
    const unsubscribe = subscribeToCounter((newCount) => {
      setCount(newCount);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!cooldown) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(500);
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 50));
    }, 50);

    return () => clearInterval(interval);
  }, [cooldown]);

  const handleAction = async (value: number) => {
    if (isButtonDisabled || !userId || isRequesting) return;
    
    // 1. Set request lock and optimistic update
    setIsRequesting(true);
    setIsButtonDisabled(true);
    const previousCount = count;
    setCount(prev => prev + value);

    // 2. Start request and cooldown as separate operations
    setCooldown(true);
    const cooldownPromise = new Promise(resolve => 
      setTimeout(() => {
        setCooldown(false);
        resolve(null);
      }, 500)
    );

    try {
      // Send request immediately without waiting for cooldown
      const result = await incrementCounter(userId, value);
      console.log('Request completed, other clients should update now');

      if (!result.success) {
        setCount(previousCount);
        console.error('Failed to increment:', result.message);
      }
    } catch (error) {
      setCount(previousCount);
      console.error('Failed to increment:', error);
    } finally {
      // Wait for cooldown to finish before re-enabling button
      await cooldownPromise;
      setIsRequesting(false);
      setIsButtonDisabled(false);
    }
  };

  const isDisabled = isButtonDisabled || isLoading || isRequesting;

  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center bg-grid">
      <div className="flex flex-col items-center space-y-8">
        <div className="bg-[#1c1c1c] p-8 rounded-2xl border border-white/[0.04]">
          <div className="flex gap-1">
            {digits.map((digit, idx) => (
              <NumberColumn key={idx} digit={digit} />
            ))}
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="text-sm text-neutral-600 flex justify-between">
            <span>Status</span>
            <span>
              {isLoading ? 'Loading...' : `Cooldown ${timeLeft > 0 ? `${timeLeft}ms` : 'Ready'}`}
            </span>
          </div>
          <CooldownBar isActive={cooldown} />
          <ActionGrid onAction={handleAction} disabled={isDisabled} />
        </div>
      </div>
    </div>
  );
} 