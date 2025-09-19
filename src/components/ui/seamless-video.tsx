"use client";
import { useEffect, useRef, useState } from 'react';

type SeamlessVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  opacity?: number;
  crossfadeMs?: number; // durée du fondu entre boucles
  overlapMs?: number;   // avance de démarrage de la prochaine boucle
  playbackRate?: number;
};

// Reproduit une boucle vidéo sans saccade en anticipant la boucle suivante
// via un double-buffer (2 <video> superposées) + crossfade.
export function SeamlessVideo({
  src,
  poster,
  className,
  opacity = 1,
  crossfadeMs = 250,
  overlapMs = 300,
  playbackRate = 1,
}: SeamlessVideoProps) {
  const v0Ref = useRef<HTMLVideoElement | null>(null);
  const v1Ref = useRef<HTMLVideoElement | null>(null);
  const timersRef = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<0 | 1>(0);
  const [ready, setReady] = useState(false);

  // Nettoyage des timeouts à l'unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  // Pause/reprise selon visibilité (IntersectionObserver)
  useEffect(() => {
    const el = v0Ref.current;
    if (!el) return;
    const container = el.parentElement;
    if (!container) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const v0 = v0Ref.current;
        const v1 = v1Ref.current;
        if (!v0 || !v1) return;
        if (entry.isIntersecting) {
          v0.play().catch(() => {});
          v1.play().catch(() => {});
        } else {
          v0.pause();
          v1.pause();
        }
      });
    }, { threshold: 0.2 });
    io.observe(container);
    return () => io.disconnect();
  }, []);

  // Planifie le démarrage anticipé de la prochaine vidéo et le crossfade
  const scheduleNext = () => {
    const currentRef = activeIndex === 0 ? v0Ref : v1Ref;
    const nextRef = activeIndex === 0 ? v1Ref : v0Ref;
    const current = currentRef.current;
    const next = nextRef.current;
    if (!current || !next || !Number.isFinite(current.duration)) return;

    const durationMs = current.duration * 1000;
    const startIn = Math.max(0, durationMs - overlapMs);

    const t = window.setTimeout(async () => {
      try {
        next.currentTime = 0;
        next.playbackRate = playbackRate;
        await next.play();
      } catch {}

      // Crossfade via transition d'opacité
      setActiveIndex((idx) => (idx === 0 ? 1 : 0));

      // Arrête l'ancienne vidéo après le fondu
      const stopOld = window.setTimeout(() => {
        try { current.pause(); } catch {}
      }, crossfadeMs);
      timersRef.current.push(stopOld);

      // Replanifie pour la prochaine itération
      const reschedule = window.setTimeout(() => scheduleNext(), Math.max(0, overlapMs));
      timersRef.current.push(reschedule);
    }, startIn);
    timersRef.current.push(t);
  };

  // Initialisation: charge les métadonnées, lance v0, puis planifie
  useEffect(() => {
    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    const onReady = async () => {
      try {
        v0.playbackRate = playbackRate;
        v1.playbackRate = playbackRate;
        await v0.play();
      } catch {}
      setReady(true);
      scheduleNext();
    };

    const meta = () => {
      if (!Number.isFinite(v0.duration)) return;
      onReady();
      v0.removeEventListener('loadedmetadata', meta);
    };

    if (Number.isFinite(v0.duration)) onReady();
    else v0.addEventListener('loadedmetadata', meta);

    return () => {
      v0.removeEventListener('loadedmetadata', meta);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, overlapMs, crossfadeMs, playbackRate]);

  return (
    <div className={className} style={{ opacity, position: 'relative' }}>
      {/* couche 0 */}
      <video
        ref={v0Ref}
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
        style={{ opacity: activeIndex === 0 ? 1 : 0, transitionDuration: `${crossfadeMs}ms` }}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop={false}
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* couche 1 */}
      <video
        ref={v1Ref}
        className="absolute inset-0 h-full w-full object-cover transition-opacity"
        style={{ opacity: activeIndex === 1 ? 1 : 0, transitionDuration: `${crossfadeMs}ms` }}
        autoPlay
        muted
        playsInline
        preload="auto"
        loop={false}
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Poster de secours si rien n'est prêt */}
      {!ready && poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="poster" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
    </div>
  );
}



