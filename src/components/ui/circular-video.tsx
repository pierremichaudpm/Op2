"use client";
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export type CircularVideoProps = {
  videoSrc: string;
  size?: string;
  className?: string;
};

export function CircularVideo({ videoSrc, size = '500px', className }: CircularVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!el) return;
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      });
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={cn('relative overflow-hidden rounded-full border border-primary shadow-sm', className)}
      style={{ width: size, height: size }}
    >
      <video ref={ref} className="h-full w-full object-cover" autoPlay muted loop playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}




