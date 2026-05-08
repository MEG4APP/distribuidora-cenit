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
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        background: '#0a0a0a',
        color: '#fff',
      }}
    >

      {/* ── VIDEO DE FONDO ── */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline preload="auto"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', opacity: 1,
          pointerEvents: 'none',
        }}
      >
        <source src="/Fondo%20INICIO.mp4" type="video/mp4" />
      </video>

      {/* Overlay oscuro SOLO de izq a der — más ligero para que el video resalte */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.0) 100%)',
      }} />

      {/* ════ PANEL IZQUIERDO ════ */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 64, left: 0,
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '0 1rem 0 clamp(1.5rem, 4vw, 3.5rem)',
        gap: '1.2rem',
        overflow: 'hidden',
      }}>

        {/* Composición completa — imagen única animada */}
        <img
          src="/inicio/composicion%20completa.png"
          alt="Marca tu estilo — Distribuidora CENIT"
          className="hi-composicion"
          style={{
            width: '100%',
            maxWidth: 520,
            maxHeight: 'calc(100svh - 180px)',
            objectFit: 'contain',
            objectPosition: 'left center',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))',
          }}
        />

        {/* Botón catálogo — alineado al ancho de la composición */}
        <div style={{ width: '100%', maxWidth: 520, display: 'flex', justifyContent: 'flex-end' }}>
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
              style={{
                height: 'clamp(52px, 8vh, 72px)',
                width: 'auto',
                filter: 'drop-shadow(0 6px 20px rgba(233,30,140,0.5))',
              }}
            />
          </motion.button>
        </div>

      </div>

      {/* ════ PANEL DERECHO — zapatilla sin glow de color ════ */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 64, right: 0,
        width: '54%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div
          className="hi-shoe-wrap"
          style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {/* CAPA 0 — Efecto detrás de la zapatilla (no afecta al video) */}
          {/* La zapatilla cubre la parte superior; el bloque de tallas queda visible abajo */}
          <img
            src="/inicio/efecto%20detras%20zapatilla.png"
            alt=""
            style={{
              position: 'absolute',
              top: '60%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150%', maxWidth: 960,
              height: 'auto',
              zIndex: 1,                // detrás de la zapatilla
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          />

          {/* CAPA 1 — Zapatilla más grande, encima del efecto pero no tapa la parte baja */}
          <img
            src="/Portada.png"
            alt="Zapatilla CENIT"
            className="hi-shoe-img"
            style={{
              position: 'relative', zIndex: 10,
              width: '100%', maxWidth: 640,
              height: 'auto',
              marginBottom: '8%',       // sube la zapatilla para dejar el bloque del efecto visible
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.92))',
            }}
          />

          {/* Badge EDICIÓN LIMITADA */}
          <div
            className="hi-badge-spin"
            style={{
              position: 'absolute', top: '8%', right: '6%',
              width: 'clamp(76px, 7.5vw, 108px)',
              height: 'clamp(76px, 7.5vw, 108px)',
              borderRadius: '50%',
              background: '#E91E8C',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textAlign: 'center',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(0.7rem, 0.95vw, 0.9rem)',
              lineHeight: 1.15, color: '#fff',
              boxShadow: '0 0 24px rgba(233,30,140,0.55)',
              zIndex: 20,
            }}
          >
            EDICIÓN<br />LIMITADA
          </div>
        </div>
      </div>

      {/* ── Barra inferior trust ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 64,
        background: 'rgba(0,0,0,0.9)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
        padding: '0 1.5rem',
        zIndex: 10,
        flexWrap: 'wrap', gap: '0.5rem',
      }}>
        {TRUST.map(({ icon, label, sub }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ fontSize: '1.1rem' }}>{icon}</span>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>{label}</div>
              <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.42)' }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
