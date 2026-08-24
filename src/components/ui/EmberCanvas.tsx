import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  r: number; life: number; max: number; hue: number;
}

/**
 * Elemento de assinatura: partículas de brasa subindo, evocando a solda.
 * Renderiza nada quando o usuário prefere menos movimento.
 */
export function EmberCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    const parts: Particle[] = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const spawn = (): Particle => ({
      x: W * (0.55 + Math.random() * 0.4),
      y: H * (0.55 + Math.random() * 0.35),
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(0.3 + Math.random() * 0.9),
      r: Math.random() * 1.8 + 0.4,
      life: 0,
      max: 120 + Math.random() * 120,
      hue: 20 + Math.random() * 20,
    });

    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 70; i++) {
      const p = spawn();
      p.life = Math.random() * p.max;
      parts.push(p);
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.vy -= 0.002; p.life += 1;
        const a = Math.max(0, 1 - p.life / p.max);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue},100%,${55 + a * 20}%,${a * 0.85})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue},100%,60%,${a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.life >= p.max || p.y < -10) Object.assign(p, spawn());
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  if (reduced) return null;
  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
