// ================================================================
// ChromaGrid.jsx — Shoe Catalog with GSAP Chroma Spotlight
// Adapted from user's design for Distribuidora CENIT shoes
// ================================================================

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

// Color accents per shoe color (for gradients and borders)
const COLOR_ACCENTS = {
  "Mostaza":              "#d4a017",
  "Beige":                "#d2b48c",
  "Multicolor":           "#4d96ff",
  "Geométrico multicolor":"#4d96ff",
  "Turquesa":             "#40e0d0",
  "Blanco total":         "#cbd5e1",
  "Blanco":               "#cbd5e1",
  "Negro y Blanco":       "#64748b",
  "Bicolor":              "#64748b",
  "Snake":                "#92805a",
  "Snake print":          "#92805a",
  "Beige con glitter":    "#d4c5a9",
  "Beige Glitter":        "#d4c5a9",
  "Amarillo azufre":      "#e8d44d",
  "Azufre":               "#e8d44d",
  "Natural / Crudo":      "#c8b89a",
  "Natural":              "#c8b89a",
  "Negro elegante":       "#475569",
  "Negro":                "#475569",
  "Rosa charol":          "#f472b6",
  "Rosa":                 "#f472b6",
};

function BadgeChip({ availability, isNew }) {
  if (isNew) return <span className="chroma-badge new">✨ Nuevo</span>;
  if (availability === "Agotado") return <span className="chroma-badge sold">Agotado</span>;
  if (availability === "Pocas unidades") return <span className="chroma-badge few">🔥 Últimas</span>;
  return <span className="chroma-badge avail">✓ Disponible</span>;
}

export default function ChromaGrid({ items = [], onCardClick, radius = 260, damping = 0.4, fadeOut = 0.6, ease = 'power3.out', columns = 3 }) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX    = useRef(null);
  const setY    = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x, y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  if (!items.length) return null;

  return (
    <div
      ref={rootRef}
      className="chroma-grid"
      style={{ '--r': `${radius}px`, '--cols': columns }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((item, i) => {
        const accent = COLOR_ACCENTS[item.product?.color] || '#1d4ed8';
        const gradient = `linear-gradient(145deg, ${accent}55 0%, #080808 60%)`;

        return (
          <article
            key={item.product?.id || i}
            className="chroma-card"
            onMouseMove={handleCardMove}
            onClick={() => onCardClick?.(item.product)}
            style={{
              '--card-border': accent,
              '--card-gradient': gradient,
            }}
          >
            {/* Badge */}
            <BadgeChip availability={item.product?.availability} isNew={item.product?.isNew} />

            {/* Image */}
            <div className="chroma-img-wrapper">
              <img src={item.image} alt={item.title} loading="lazy" />
            </div>

            {/* Info */}
            <footer className="chroma-info">
              <h3 className="shoe-name">{item.title}</h3>
              <span className="shoe-type">{item.subtitle}</span>
              <span className="shoe-handle">{item.handle}</span>

              {/* Sizes */}
              {item.product?.sizesAvailable && (
                <div className="shoe-sizes">
                  {item.product.sizesAvailable.map(s => (
                    <span key={s} className="shoe-size-chip">{s}</span>
                  ))}
                </div>
              )}

              <div className="shoe-cta">Ver detalles →</div>
            </footer>
          </article>
        );
      })}

      {/* Chroma effects */}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
}
