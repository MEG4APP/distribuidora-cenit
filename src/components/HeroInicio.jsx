// ================================================================
// HeroInicio.jsx — v5
// LEFT:  composicion completa.png (una sola imagen, animada) + boton catalogo.png
// RIGHT: zapatilla SIN glow verde/violeta, SIN badge TALLAS
// BG:    video puro sin efectos de color
// ================================================================
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const TRUST = [
  { icon: '🔥', label: 'Modelos Exclusivos',  sub: 'Diseños únicos' },
  { icon: '✔',  label: 'Calidad Garantizada', sub: 'Materiales resistentes' },
  { icon: '🚚', label: 'Envíos Coordinados',  sub: 'A todo el país' },
  { icon: '💬', label: 'Atención Directa',    sub: 'Por WhatsApp' },
];

export default function HeroInicio({ onShopClick }) {
  const container = useRef();
  const videoRef  = useRef();

  // Play directo por ref — más confiable que autoPlay + handlers
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {});
    const tryPlay = () => vid.play().catch(() => {});
    vid.addEventListener('canplay',    tryPlay);
    vid.addEventListener('loadeddata', tryPlay);
    return () => {
      vid.removeEventListener('canplay',    tryPlay);
      vid.removeEventListener('loadeddata', tryPlay);
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Composición izquierda: aparece y sube sutilmente
    tl.fromTo('.hi-composicion',
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0,  scale: 1, duration: 0.9 },
      0
    )
    // Botón catálogo: aparece después
    .fromTo('.hi-cta-btn',
      { opacity: 0, y: 16, scale: 0.9 },
      { opacity: 1, y: 0,  scale: 1, duration: 0.5, ease: 'back.out(1.5)' },
      0.7
    )
    // Zapatilla: entra desde la derecha
    .from('.hi-shoe-wrap', {
      opacity: 0, x: 90, scale: 0.78, rotation: -12,
      duration: 1.2, ease: 'power3.out',
    }, 0.1);

    // Zapatilla flotando infinitamente
    gsap.to('.hi-shoe-img', {
      y: -14, rotation: 1.5,
      duration: 3.5, repeat: -1, yoyo: true, ease: 'sine.inOut',
    });

    // Composición flotando muy sutilmente (efecto premium)
    gsap.to('.hi-composicion', {
      y: -6,
      duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut',
      delay: 1,
    });

    // Badge girando
    gsap.to('.hi-badge-spin', {
      rotation: 360, duration: 22, repeat: -1, ease: 'none',
    });

  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative w-full h-[100svh] overflow-hidden bg-[#0a0a0a] text-white"
    >

      {/* ── VIDEO DE FONDO ── */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none"
      >
        <source src="/Fondo%20INICIO.mp4?v=2" type="video/mp4" />
      </video>

      {/* Overlay oscuro: Gradiente en desktop, más opaco en mobile */}
      <div className="absolute inset-0 pointer-events-none bg-black/50 md:bg-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/45 md:to-transparent" />

      {/* ════ CONTENEDOR PRINCIPAL ════ */}
      <div className="absolute inset-0 pb-16 pt-20 md:pt-0 flex flex-col md:flex-row z-10">

        {/* ════ PANEL IZQUIERDO ════ */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center items-center md:items-start px-6 md:pl-12 lg:pl-16 xl:pl-24 gap-4 md:gap-6">
          
          <img
            src="/inicio/composicion%20completa.png"
            alt="Marca tu estilo — Distribuidora CENIT"
            className="hi-composicion w-full max-w-[280px] sm:max-w-[340px] md:max-w-[480px] lg:max-w-[520px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] will-change-transform"
            style={{ objectPosition: 'left center' }}
          />

          <div className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[480px] lg:max-w-[520px] flex justify-center md:justify-end">
            <motion.button
              className="hi-cta-btn"
              onClick={onShopClick}
              whileHover={{ scale: 1.06, filter: 'brightness(1.12)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                opacity: 0,
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              }}
              aria-label="Ver catálogo"
            >
              <img
                src="/inicio/boton%20catalogo.png"
                alt="Ver catálogo"
                className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto drop-shadow-[0_6px_20px_rgba(233,30,140,0.5)]"
              />
            </motion.button>
          </div>

        </div>

        {/* ════ PANEL DERECHO ════ */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center relative">
          <div className="hi-shoe-wrap relative w-full h-full flex items-center justify-center">
            
            {/* CAPA 0 — Efecto detrás de la zapatilla */}
            <img
              src="/inicio/efecto%20detras%20zapatilla.png"
              alt=""
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] md:w-[150%] max-w-[960px] h-auto z-0 pointer-events-none select-none mt-4 md:mt-12"
            />

            {/* CAPA 1 — Zapatilla */}
            <img
              src="/Portada.png"
              alt="Zapatilla CENIT"
              className="hi-shoe-img relative z-10 w-[75%] sm:w-[65%] md:w-full max-w-[320px] md:max-w-[540px] lg:max-w-[640px] h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.92)] md:mb-[8%] will-change-transform"
            />

            {/* Badge EDICIÓN LIMITADA */}
            <div
              className="hi-badge-spin absolute z-20 top-[5%] right-[5%] md:top-[8%] md:right-[6%] w-[76px] h-[76px] sm:w-[90px] sm:h-[90px] md:w-[108px] md:h-[108px] rounded-full bg-[#E91E8C] flex items-center justify-center text-center text-white shadow-[0_0_24px_rgba(233,30,140,0.55)]"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)', lineHeight: 1.15 }}
            >
              EDICIÓN<br />LIMITADA
            </div>
          </div>
        </div>

      </div>

      {/* ── Barra inferior trust ── */}
      <div className="absolute bottom-0 left-0 right-0 min-h-[64px] bg-black/90 border-t border-white/10 flex items-center justify-center md:justify-around px-2 sm:px-6 z-20 flex-wrap gap-x-4 gap-y-2 py-3 md:py-0">
        {TRUST.map(({ icon, label, sub }) => (
          <div key={label} className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-base sm:text-[1.1rem]">{icon}</span>
            <div>
              <div className="text-[10px] sm:text-[0.72rem] font-bold text-white leading-[1.2]">{label}</div>
              <div className="text-[9px] sm:text-[0.58rem] text-white/40">{sub}</div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
