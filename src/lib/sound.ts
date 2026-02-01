'use client';

import { useCallback, useEffect, useRef } from 'react';

// 8-bit retro sound effects using Web Audio API
// No external files needed - generates sounds synthetically

class RetroSoundPlayer {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize audio context on user interaction
    if (typeof window !== 'undefined') {
      window.addEventListener('click', () => this.init(), { once: true });
    }
  }

  private init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'square') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Hover sound - short high blip
  hover() {
    this.playTone(800, 0.05, 'square');
  }

  // Click sound - satisfying pop
  click() {
    this.playTone(600, 0.08, 'square');
    setTimeout(() => this.playTone(900, 0.04, 'square'), 50);
  }

  // Success sound - ascending arpeggio
  success() {
    const ctx = this.audioContext;
    if (!this.enabled || !ctx) return;

    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.1);
      osc.start(ctx.currentTime + i * 0.08);
      osc.stop(ctx.currentTime + i * 0.08 + 0.1);
    });
  }

  // Navigate sound - slide whistle effect
  navigate() {
    if (!this.enabled || !this.audioContext) return;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.15);
  }

  // Error/glitch sound
  glitch() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        this.playTone(200 + Math.random() * 400, 0.03, 'sawtooth');
      }, i * 30);
    }
  }
}

// Singleton instance
export const retroSound = new RetroSoundPlayer();

// Hook for using sounds
export function useRetroSound() {
  const handleHover = useCallback(() => retroSound.hover(), []);
  const handleClick = useCallback(() => retroSound.click(), []);

  return { handleHover, handleClick };
}
