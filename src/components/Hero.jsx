// ================================================================
// Hero.jsx — Ultra Impact Street Style — Distribuidora CENIT 2026
// Bebas Neue + Portada.png + neon gradients
// ================================================================
import { motion } from 'framer-motion';

export default function Hero({ onShopClick }) {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">

      {/* ── Fondo: imagen Portada como textura de fondo ── */}
      <div className="absolute inset-0">
        <img
          src="/Portada.png"
          alt=""
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        {/* Overlay oscuro para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/95 to-black/60" />
      </div>

      {/* ── Textura neon ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,0,102,0.28),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(0,255,255,0.22),transparent_42%),radial-gradient(circle_at_55%_80%,rgba(250,204,21,0.12),transparent_38%)]" />

      {/* ── Grid decorativo ── */}
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px)] bg-[size:55px_55px]" />

      {/* ── Contenido principal ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-28 pt-16 sm:pt-24 grid lg:grid-cols-2 gap-8 items-center" style={{ minHeight: '100svh' }}>

        {/* LEFT — Texto */}
        <div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 bg-pink-600 px-4 py-1.5 text-xs font-black tracking-[0.2em] uppercase shadow-lg shadow-pink-600/40"
          >
            🔥 NUEVA COLECCIÓN 2026
          </motion.div>

          {/* Logo CENIT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-5"
          >
            <img src="/logo-cenit.jpg" alt="Distribuidora CENIT"
              className="h-14 w-auto rounded-lg shadow-xl" />
          </motion.div>

          {/* TÍTULO — Bebas Neue */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, type: 'spring', bounce: 0.35 }}
            style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 0.88, letterSpacing: '0.02em' }}
            className="text-[5.5rem] sm:text-[8rem] md:text-[10rem] lg:text-[9vw] font-normal"
          >
            <span className="block text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
              MARCA TU
            </span>
            <span
              className="block text-yellow-400"
              style={{
                textShadow: '0 0 40px rgba(250,204,21,0.7), 0 0 80px rgba(250,204,21,0.35), 2px 2px 0 rgba(0,0,0,0.8)',
                WebkitTextStroke: '1px rgba(255,180,0,0.3)',
              }}
            >
              ESTILO
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-5 text-gray-300 text-base sm:text-lg max-w-md leading-relaxed"
          >
            Zapatillas que hablan por ti. Diseñadas para destacar en cada paso con identidad urbana.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42 }}
            className="mt-2 text-gray-500 text-sm"
          >
            Tallas del 35 al 40 · Pedidos por WhatsApp
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.button
              onClick={onShopClick}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-yellow-400 text-black px-7 py-3.5 font-black uppercase text-sm tracking-wider shadow-xl shadow-yellow-400/30 hover:bg-yellow-300 transition-colors"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.12em', fontSize: '1.05rem' }}
            >
              👟 VER CATÁLOGO
            </motion.button>

            <a
              href="https://wa.me/59178930774?text=Hola%2C%20quiero%20consultar%20zapatillas%20disponibles."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-pink-500 px-7 py-3.5 font-black uppercase text-sm tracking-wider hover:bg-pink-500 hover:text-white transition-all duration-200"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.12em', fontSize: '1.05rem' }}
            >
              PEDIR POR WHATSAPP
            </a>
          </motion.div>
        </div>

        {/* RIGHT — Producto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 90, damping: 14, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Glow de color detrás */}
          <div className="absolute -inset-12 bg-gradient-to-tr from-pink-500/50 via-yellow-400/35 to-cyan-400/45 blur-3xl rounded-full" />

          {/* Imagen del producto */}
          <img
            src="/Portada.png"
            alt="Distribuidora CENIT — Zapatilla portada"
            className="relative z-10 w-full max-w-xl mx-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.95)] hover:scale-[1.03] transition-transform duration-700"
          />

          {/* Círculo EDICIÓN LIMITADA */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute top-4 right-0 sm:top-8 sm:right-4 bg-pink-600 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full font-black text-center text-xs sm:text-sm shadow-2xl shadow-pink-600/50 z-20"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em', fontSize: '0.95rem', lineHeight: 1.2 }}
          >
            EDICIÓN<br />LIMITADA
          </motion.div>
        </motion.div>
      </div>

      {/* ── Barra inferior ── */}
      <div className="absolute bottom-0 w-full bg-black/90 border-t border-white/10 py-4 px-6 z-10">
        <div className="max-w-7xl mx-auto flex justify-around text-xs sm:text-sm">
          {['🔥 Modelos Exclusivos', '✔ Calidad Garantizada', '🚚 Envíos Coordinados', '💬 Atención Directa'].map(f => (
            <span key={f} className="text-white/70 font-semibold">{f}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
