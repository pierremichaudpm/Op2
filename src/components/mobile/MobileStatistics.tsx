"use client";
import { useEffect, useRef, useState } from 'react';

function useCounter(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            setValue(Math.floor(target * t));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);
  return { value, ref } as const;
}

export function MobileStatistics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const c1 = useCounter(250, 1200);
  const c2 = useCounter(300, 1200);
  const c3 = useCounter(100, 1200);

  return (
    <section style={{
      width: '100%',
      marginTop: '10px', // Descendre les stats de 20px supplémentaires
      marginBottom: '20px',
      padding: '0 4.5%'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '102px',
        backgroundColor: '#243768',
        borderRadius: '20px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 20px',
        overflow: 'hidden'
      }}>
        {/* Décors en arrière-plan */}
        <div style={{
          position: 'absolute',
          left: '-60px',
          top: '-30px',
          width: '161px',
          height: '171px',
          borderRadius: '50%',
          backgroundColor: 'rgba(33, 62, 118, 1)',
          opacity: 0.6
        }} />
        
        <div style={{
          position: 'absolute',
          right: '-40px',
          top: '-40px',
          width: '183px',
          height: '189px',
          borderRadius: '50%',
          backgroundColor: 'rgba(33, 62, 118, 1)',
          opacity: 0.6
        }} />

        {/* +250 consultants */}
        <div ref={c1.ref} style={{ 
          flex: '1',
          textAlign: 'center',
          zIndex: 2 
        }}>
          <div style={{
            color: '#FFFFFF',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: '1.105em',
            textTransform: 'uppercase',
            marginBottom: '5px'
          }}>
            {mounted ? `+${c1.value || 250}` : '0'}
          </div>
          <div style={{
            color: '#F36911',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '9px',
            fontWeight: 400,
            lineHeight: '0.957em',
            textTransform: 'uppercase'
          }}>
            consultants
          </div>
        </div>

        {/* +300 projets/an */}
        <div ref={c2.ref} style={{ 
          flex: '1',
          textAlign: 'center',
          zIndex: 2 
        }}>
          <div style={{
            color: '#FFFFFF',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: '1.105em',
            textTransform: 'uppercase',
            marginBottom: '5px'
          }}>
            {mounted ? `+${c2.value || 300}` : '0'}
          </div>
          <div style={{
            color: '#F36911',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '9px',
            fontWeight: 400,
            lineHeight: '0.957em',
            textTransform: 'uppercase'
          }}>
            projets / an
          </div>
        </div>

        {/* +100M$ revenus */}
        <div ref={c3.ref} style={{ 
          flex: '1',
          textAlign: 'center',
          zIndex: 2 
        }}>
          <div style={{
            color: '#FFFFFF',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '28px',
            fontWeight: 700,
            lineHeight: '1.105em',
            textTransform: 'uppercase',
            marginBottom: '5px'
          }}>
            {mounted ? `+${c3.value || 100}M$` : '0'}
          </div>
          <div style={{
            color: '#F36911',
            fontFamily: 'Gotham, sans-serif',
            fontSize: '9px',
            fontWeight: 400,
            lineHeight: '0.957em',
            textTransform: 'uppercase'
          }}>
            revenus
          </div>
        </div>
      </div>
    </section>
  );
}