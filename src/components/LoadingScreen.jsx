// ================================================================
// LoadingScreen.jsx — CENIT Premium Intro v8 — DEFINITIVO
// Video puro con loop · overlay que se desvanece · barra anclada
// ================================================================
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const TOTAL = 2.5;

export default function LoadingScreen({ onComplete }) {
  const container  = useRef();
  const videoRef   = useRef();
  const barFillRef = useRef();
  const percentRef = useRef();
  const dotRef     = useRef();

  // Forzar play del video directamente por ref
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {});
    const onReady = () => vid.play().catch(() => {});
    vid.addEventListener('canplay',    onReady);
    vid.addEventListener('loadeddata', onReady);
    return () => {
      vid.removeEventListener('canplay',    onReady);
      vid.removeEventListener('loadeddata', onReady);
    };
  }, []);

  useGSAP(() => {

    // Líneas decorativas
    gsap.from('.ls-line', {
      scaleX: 0, duration: 1.0, ease: 'expo.out',
      transformOrigin: 'center center',
    });

    // Barra aparece
    gsap.from('.ls-bar-wrapper', {
      scaleX: 0, autoAlpha: 0, duration: 0.9, ease: 'expo.out',
      transformOrigin: 'center center',
      delay: 0.4,
    });

    // Logo crece suavemente 0.92 → 1.0
    gsap.fromTo('.ls-logo',
      { scale: 0.92 },
      { scale: 1, duration: TOTAL, ease: 'sine.inOut' }
    );

    // Glow del logo aparece
    gsap.fromTo('.ls-glow',
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 3, ease: 'power2.out' }
    );

    // Overlay oscuro se desvanece — efecto "lights coming on"
    // Simple y confiable: anima opacity, GPU puro, no toca el video
    gsap.to('.ls-overlay', {
      opacity: 0,
      duration: TOTAL,
      ease: 'power1.inOut',
    });

    // Barra de progreso
    const prog = { val: 0 };
    gsap.to(prog, {
      val: 100,
      duration: TOTAL,
      delay: 0,
      ease: 'none',
      onUpdate() {
        const pct = prog.val;
        if (barFillRef.current) barFillRef.current.style.width = `${pct}%`;
        if (percentRef.current) percentRef.current.textContent = `${Math.round(pct)}%`;
        if (dotRef.current)     dotRef.current.style.left = `calc(${pct}% - 7px)`;
      },
      onComplete() {
        const exit = gsap.timeline({ onComplete });
        exit
          .to('.ls-bar-wrapper', { autoAlpha: 0, y: -10, duration: 0.3, ease: 'power2.in' })
          .to('.ls-logo, .ls-glow', { autoAlpha: 0, scale: 1.03, duration: 0.45, ease: 'power3.in' }, '<0.05')
          .to('.ls-line', { scaleX: 0, autoAlpha: 0, duration: 0.3, ease: 'power2.in', transformOrigin: 'center center' }, '<0.05')
          .to(container.current, { autoAlpha: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.15');
      },
    });

  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ background: '#111' }}
    >

      {/* ── FONDO PREMIUM CSS (Reemplaza al video de 40MB para velocidad) ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{
        background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)',
      }} />

      {/* Overlay oscuro único — arranca opaco y se desvanece en 2.5s */}
      {/* Efecto: video pasa de oscuro a su brillo real */}
      <div
        className="ls-overlay absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.72)', opacity: 1 }}
      />

      {/* Degradado fijo top/bottom para legibilidad (no se anima) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* ── Línea decorativa TOP ── */}
      <div className="absolute top-0 left-0 w-full pointer-events-none">
        <div
          className="ls-line w-full"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(250,204,21,0.8) 50%, transparent)' }}
        />
      </div>

      {/* ── Línea decorativa sobre la barra ── */}
      <div className="absolute left-0 w-full pointer-events-none" style={{ bottom: 78 }}>
        <div
          className="ls-line w-full"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.7) 50%, transparent)' }}
        />
      </div>

      {/* ── LOGO — centrado absolutamente ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center">

          <div
            className="ls-glow absolute"
            style={{
              width: '100%', height: '100%', maxWidth: 400, maxHeight: 400,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(250,204,21,0.2) 0%, rgba(236,72,153,0.1) 40%, transparent 70%)',
            }}
          />

          <img
            src="/inicio/CENIT%20PNG.png"
            alt="Distribuidora CENIT"
            className="ls-logo relative z-10 h-16 sm:h-20 w-auto object-contain"
            style={{
              width: 'clamp(200px, 40vw, 580px)',
              height: 'auto',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* ── BARRA DE CARGA — anclada al fondo ── */}
      <div
        className="ls-bar-wrapper absolute left-0 w-full"
        style={{ bottom: 28 }}
      >
        <div className="flex justify-between items-center mb-2 px-6">
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.35em',
            color: 'rgba(255,255,255,0.3)',
          }}>
            Cargando
          </span>
          <span
            ref={percentRef}
            style={{
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'rgba(250,204,21,0.9)',
              minWidth: '4ch',
              textAlign: 'right',
            }}
          >
            0%
          </span>
        </div>

        {/* Track extremo a extremo */}
        <div
          className="relative w-full"
          style={{
            height: 5,
            background: 'rgba(255,255,255,0.06)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            overflow: 'visible',
          }}
        >
          <div
            ref={barFillRef}
            style={{
              position: 'absolute', left: 0, top: 0,
              width: '0%', height: '100%',
              background: 'linear-gradient(90deg, rgba(236,72,153,0.75) 0%, rgba(250,204,21,0.9) 55%, rgba(103,232,249,0.75) 100%)',
              boxShadow: '0 0 12px rgba(250,204,21,0.7), 0 0 24px rgba(236,72,153,0.4)',
            }}
          />
          <div
            ref={dotRef}
            style={{
              position: 'absolute',
              top: '50%', left: '-7px',
              transform: 'translateY(-50%)',
              width: 14, height: 14,
              borderRadius: '50%',
              background: 'radial-gradient(circle, white 25%, rgba(250,204,21,0.5) 100%)',
              boxShadow: '0 0 10px white, 0 0 24px #facc15',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div className="flex justify-between mt-1 px-6">
          {['0s', '1s', '2s', '3s'].map(v => (
            <span key={v} style={{ fontFamily: 'monospace', fontSize: '0.55rem', color: 'rgba(255,255,255,0.1)' }}>
              {v}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
