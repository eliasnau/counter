'use client'

import { useState, useEffect } from 'react';

export function useCooldown(duration: number) {
  const [cooldown, setCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [cooldownProgress, setCooldownProgress] = useState(100);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (cooldown) {
      const startTime = Date.now();

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, duration - elapsed);
        setCooldownTime(remaining);
        setCooldownProgress((remaining / duration) * 100);

        if (remaining === 0) {
          setCooldown(false);
        }
      }, 50);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [cooldown, duration]);

  const startCooldown = () => {
    setCooldown(true);
    setCooldownTime(duration);
    setCooldownProgress(100);
  };

  return {
    cooldown,
    cooldownTime,
    cooldownProgress,
    startCooldown
  };
} 
