"use client";

import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let isScrolling = false;
    let animationFrameId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateScroll = () => {
      if (Math.abs(targetScrollY - currentScrollY) < 0.1) {
        currentScrollY = targetScrollY;
        isScrolling = false;
        return;
      }

      currentScrollY = lerp(currentScrollY, targetScrollY, 0.08);
      window.scrollTo(0, currentScrollY);
      
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollY += e.deltaY * 0.8;
      targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
      
      if (!isScrolling) {
        isScrolling = true;
        animationFrameId = requestAnimationFrame(updateScroll);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const startY = touch.clientY;
      
      const handleTouchMove = (e: TouchEvent) => {
        const touch = e.touches[0];
        const deltaY = startY - touch.clientY;
        targetScrollY += deltaY * 0.5;
        targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));
        
        if (!isScrolling) {
          isScrolling = true;
          animationFrameId = requestAnimationFrame(updateScroll);
        }
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', () => {
        document.removeEventListener('touchmove', handleTouchMove);
      }, { once: true });
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return null;
}
