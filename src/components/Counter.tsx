'use client'

import React, { useState, useEffect } from 'react';
import { NumberColumn } from './NumberColumn';
import { CooldownBar } from './CooldownBar';
import { ActionGrid } from './ActionGrid';
import { anonymousLogin, incrementCounter, getCounter, subscribeToCounter } from '@/lib/appwrite';
import { PoweredByBadge } from './PoweredByBadge';

export function Counter() {
  const [count, setCount] = useState(0);
  const [cooldown, setCooldown] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);
  const [demotivationalMessage, setDemotivationalMessage] = useState<{id: number, text: string, isLeaving: boolean} | null>(null);
  let messageId = 0;

  useEffect(() => {
    const initializeCounter = async () => {
      try {
        const response = await fetch('/api/count');
        const data = await response.json();
        
        if (data.count !== undefined) {
          setCount(data.count);
        }
      } catch (error) {
        console.error('Failed to fetch initial count:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCounter();
  }, []);

  const demotivationalMessagesList = [
    "Each click brings you closer to existential dread.",
    "Your dedication to this pointless task is remarkable.",
    "Somewhere, your parents are still disappointed.",
    "Even the counter feels sorry for you.",
    "Achievement unlocked: Wasted Time",
    "This won't fill the void inside you.",
    "Congratulations on accomplishing absolutely nothing.",
    "Your clicks echo in the vast emptiness of existence.",
    "At least you're consistent in your poor life choices.",
    "This is probably the highlight of your day.",
    "You could be doing something meaningful right now.",
    "Every number represents a missed opportunity.",
    "The counter goes up, your life satisfaction goes down.",
    "Imagine explaining this hobby to your younger self.",
    "The void stares back, and it's unimpressed.",
    "Your dedication to mediocrity is inspiring.",
    "Another click, another step towards digital nihilism.",
    "Even the algorithm judges your choices.",
    "You've peaked. It's all downhill from here.",
    "This won't be mentioned in your obituary.",
  ];

  useEffect(() => {
    const init = async () => {
      try {
          const initialCounter = await getCounter();
        
        //setUserId(session.$id);
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
    if (isButtonDisabled || isRequesting) return;
    
    // 30% chance to show a message after any click
    if (!demotivationalMessage && Math.random() < 0.3) {
      const randomMessage = demotivationalMessagesList[Math.floor(Math.random() * demotivationalMessagesList.length)];
      const newMessage = { id: messageId++, text: randomMessage, isLeaving: false };
      setDemotivationalMessage(newMessage);
      
      // Start fade out after 2.7 seconds
      setTimeout(() => {
        setDemotivationalMessage(prev => prev ? { ...prev, isLeaving: true } : null);
        
        // Remove message after animation completes
        setTimeout(() => {
          setDemotivationalMessage(null);
        }, 300);
      }, 2700);
    }

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
      const result = await incrementCounter(value);
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
    <>
      <div className="min-h-screen bg-[#171717] flex items-center justify-center bg-grid">
        <div className="flex flex-col items-center space-y-8">
          {isLoading ? (
            // Loading state
            <div className="bg-[#1c1c1c] p-8 rounded-2xl border border-white/[0.04]">
              <div className="flex gap-1">
                {Array(7).fill(0).map((_, idx) => (
                  <div 
                    key={idx}
                    className="w-12 h-16 bg-[#1c1c1c] rounded-lg border border-white/[0.04] flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Normal counter display
            <div className="bg-[#1c1c1c] p-8 rounded-2xl border border-white/[0.04]">
              <div className="flex gap-1">
                {count.toString().padStart(7, '0').split('').map((digit, idx) => (
                  <NumberColumn key={`digit-${idx}`} digit={digit} />
                ))}
              </div>
            </div>
          )}

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

      <PoweredByBadge type='partners'/>
    </>
  );
} 