// ================================================================
// CatalogPage.jsx — Street Commerce Style + ChromaGrid effect
// ================================================================
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useFilters } from '../hooks/useFilters';
import ProductDetailModal from '../components/ProductDetailModal';
import { useState } from 'react';

const WHATSAPP = "59178930774";
const COLOR_ACCENTS = {
  "Mostaza":"#d4a017","Turquesa":"#40e0d0","Blanco total":"#cbd5e1","Blanco":"#cbd5e1",
  "Negro y Blanco":"#64748b","Bicolor":"#64748b","Snake":"#92805a","Snake print":"#92805a",
  "Beige con glitter":"#d4c5a9","Beige Glitter":"#d4c5a9","Amarillo azufre":"#e8d44d",
  "Azufre":"#e8d44d","Natural / Crudo":"#c8b89a","Natural":"#c8b89a","Negro elegante":"#475569",
  "Negro":"#475569","Rosa charol":"#f472b6","Rosa":"#f472b6","Multicolor":"#4d96ff",
  "Geométrico multicolor":"#4d96ff","Beige":"#d2b48c",
};

function Badge({ availability, isNew }) {
  if (isNew) return <div className="absolute left-4 top-4 z-20 rounded-full bg-cyan-400 px-3 py-1 text-xs font-black uppercase text-black">✨ Nuevo</div>;
  if (availability === "Agotado") return <div className="absolute left-4 top-4 z-20 rounded-full bg-gray-600 px-3 py-1 text-xs font-black uppercase text-white">Agotado</div>;
  if (availability === "Pocas unidades") return <div className="absolute left-4 top-4 z-20 rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase text-black">🔥 Últimas</div>;
  return <div className="absolute left-4 top-4 z-20 rounded-full bg-green-500 px-3 py-1 text-xs font-black uppercase text-black">✓ Disponible</div>;
}

// ChromaGrid wrapper — spotlight cursor effect
function ChromaWrapper({ children, radius = 280 }) {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null); const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x); setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => gsap.to(pos.current, { x, y, duration: 0.4, ease: 'power3.out',
    onUpdate: () => { setX.current?.(pos.current.x); setY.current?.(pos.current.y); }, overwrite: true });

  return (
    <div ref={rootRef} className="relative w-full"
      style={{ '--x': '50%', '--y': '50%', '--r': `${radius}px` }}
      onPointerMove={e => { const r = rootRef.current.getBoundingClientRect(); moveTo(e.clientX - r.left, e.clientY - r.top); gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true }); }}
      onPointerLeave={() => gsap.to(fadeRef.current, { opacity: 1, duration: 0.6, overwrite: true })}
    >
      {children}
      {/* Chroma overlay */}
      <div className="absolute inset-0 pointer-events-none z-[20]" style={{
        backdropFilter: 'grayscale(0.5) brightness(0.72)',
        WebkitBackdropFilter: 'grayscale(0.5) brightness(0.72)',
        maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 20%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 65%, black 100%)',
        WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), transparent 0%, transparent 20%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.4) 65%, black 100%)',
      }} />
      <div ref={fadeRef} className="absolute inset-0 pointer-events-none z-[21]" style={{
        backdropFilter: 'grayscale(0.5) brightness(0.72)',
        WebkitBackdropFilter: 'grayscale(0.5) brightness(0.72)',
        maskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 65%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(circle var(--r) at var(--x) var(--y), white 0%, white 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 65%, transparent 100%)',
        opacity: 1, transition: 'opacity 0.25s ease',
      }} />
    </div>
  );
}

export default function CatalogPage({ onOpenProduct }) {
  const { search, setSearch, category, setCategory, size, setSize,
    availability, setAvail, filtered, resetFilters, totalResults } = useFilters();

  const filters = ['Todos', 'Low Top', 'High Top', 'Platform', 'Edition Special'];
  const filterLabels = { 'Todos': 'Todos', 'Low Top': 'Caña Baja', 'High Top': 'Caña Alta', 'Platform': 'Plataforma', 'Edition Special': 'Edición Especial' };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070f] px-4 sm:px-6 py-20 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,0,102,0.18),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(0,221,255,0.18),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(255,213,0,0.10),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div className="mb-12 text-center" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Catálogo 2026</p>
          <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">
            Todos los{' '}
            <span className="text-yellow-400 drop-shadow-[0_0_18px_rgba(250,204,21,.45)]">modelos</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Zapatillas urbanas y casuales con diseños únicos. Tallas del 35 al 40.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl"
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}>
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <input type="text" placeholder="Buscar modelo, color o estilo..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-white/35 focus:border-cyan-300 transition-colors" />
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola, quiero consultar el catálogo de Distribuidora CENIT.')}`}
              target="_blank" rel="noreferrer"
              className="rounded-2xl border border-green-400 px-6 py-4 text-center font-bold text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200">
              WhatsApp
            </a>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 items-center">
            {filters.map(f => (
              <button key={f} onClick={() => setCategory(f === 'Todos' ? 'all' : f)}
                className={`rounded-full px-5 py-2 text-sm font-black uppercase tracking-wide transition ${
                  (f === 'Todos' && category === 'all') || category === f
                    ? 'bg-yellow-400 text-black shadow-[0_0_24px_rgba(250,204,21,.35)]'
                    : 'border border-white/15 bg-black/30 text-white/70 hover:border-cyan-300 hover:text-cyan-300'
                }`}>
                {filterLabels[f]}
              </button>
            ))}
            <span className="ml-auto text-sm text-white/45">{totalResults} modelos</span>
          </div>
          {/* Tallas */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[35,36,37,38,39,40].map(s => (
              <button key={s} onClick={() => setSize(size === s ? null : s)}
                className={`w-10 h-10 rounded-xl border text-xs font-bold transition-all ${
                  size === s ? 'bg-cyan-400 text-black border-cyan-400' : 'border-white/15 text-white/60 hover:border-cyan-300 hover:text-cyan-300'
                }`}>
                {s}
              </button>
            ))}
            {(search || category !== 'all' || size || availability !== 'all') && (
              <button onClick={resetFilters} className="px-3 h-10 rounded-xl border border-red-500/40 text-red-400 text-xs font-bold hover:bg-red-500/10 transition-colors">
                Limpiar
              </button>
            )}
          </div>
        </motion.div>

        {/* Products Grid with Chroma effect */}
        {filtered.length > 0 ? (
          <ChromaWrapper radius={300}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => {
                const accent = COLOR_ACCENTS[product.color] || '#1d4ed8';
                const waMsg = encodeURIComponent(`Hola, quiero consultar por el modelo ${product.name}, talla:`);
                return (
                  <motion.article
                    key={product.id}
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.6, delay: (i % 3) * 0.07 }}
                    className="group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0b0b0d] shadow-2xl transition duration-300 hover:-translate-y-2 cursor-pointer"
                    style={{ '--accent': accent, borderColor: 'rgba(255,255,255,0.08)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}60`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    onClick={() => onOpenProduct(product)}
                  >
                    <Badge availability={product.availability} isNew={product.isNew} />

                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-gradient-to-br from-white/5 to-black">
                      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 35%, ${accent}22, transparent 60%)` }} />
                      <img src={product.images[0]} alt={product.name}
                        className="h-full w-full object-contain p-4 transition duration-500 group-hover:scale-110 drop-shadow-xl" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="relative p-5">
                      <p className="mb-1 text-xs font-black uppercase tracking-[0.25em]" style={{ color: accent }}>{product.type}</p>
                      <h2 className="text-xl font-black text-white">{product.name}</h2>
                      <p className="mt-1 text-sm text-white/45">Mod. {product.modelCode} · {product.material}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {product.sizesAvailable.map(s => (
                          <span key={s} className="rounded-md border border-white/15 px-2 py-0.5 text-xs text-white/60">{s}</span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase text-white/35">Precio</p>
                          <p className="text-lg font-black text-yellow-400">Consultar</p>
                        </div>
                        <a href={`https://wa.me/${WHATSAPP}?text=${waMsg}`}
                          target="_blank" rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="rounded-full bg-pink-600 px-5 py-2.5 text-sm font-black uppercase text-white hover:bg-yellow-400 hover:text-black transition-all duration-200">
                          Pedir
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </ChromaWrapper>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👟</div>
            <h3 className="text-xl font-black text-gray-300 mb-4">Sin resultados</h3>
            <button onClick={resetFilters} className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-black uppercase text-sm hover:bg-cyan-400 transition-colors">
              Ver todos los modelos
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
