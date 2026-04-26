// ================================================================
// HomePage.jsx — Dark street style — TODO negro
// ================================================================
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import CircularGallery from '../components/CircularGallery';
import TrustSection from '../components/TrustSection';
import WhatsAppButton from '../components/WhatsAppButton';
import { products } from '../data/products';

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { type: 'spring', bounce: 0.3, duration: 0.7 } },
};

export default function HomePage({ onNavigateToCatalog, onOpenProduct }) {
  const galleryItems = products.map(p => ({ image: p.images[0], text: p.name, product: p }));
  const featured     = products.filter(p => p.featured);

  return (
    <main className="bg-black">

      {/* ── Hero ── */}
      <Hero onShopClick={onNavigateToCatalog} />

      {/* ── Galería circular WebGL ── */}
      <section className="bg-[#05070f] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,221,255,0.07),transparent_50%)]" />

        <motion.div className="pt-16 pb-6 text-center px-4"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-cyan-400 mb-2">Colección 2026</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
            Todos los modelos
          </h2>
          <p className="text-gray-500 text-sm mt-2">Deslizá para explorar · Hacé clic para ver detalles</p>
        </motion.div>

        <div style={{ height: '520px', position: 'relative' }}>
          <CircularGallery items={galleryItems} bend={1} textColor="#ffffff" borderRadius={0.05} scrollSpeed={2} scrollEase={0.05} />
        </div>

        <motion.div className="pb-16 pt-6 text-center"
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
          <button
            onClick={onNavigateToCatalog}
            className="px-8 py-3.5 bg-yellow-400 text-black font-black uppercase text-sm tracking-wider hover:bg-yellow-300 transition-colors shadow-xl shadow-yellow-400/20"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.12em' }}
          >
            Ver catálogo completo →
          </button>
        </motion.div>
      </section>

      {/* ── Trust Section ── */}
      <TrustSection />

      {/* ── Modelos destacados ── */}
      <section className="py-16 bg-[#0b0b0d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,102,0.06),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(250,204,21,0.06),transparent_40%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div className="text-center mb-10"
            initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-pink-500 mb-2">Los más pedidos</p>
            <h2 className="text-4xl font-black text-white uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
              Modelos <span className="text-yellow-400">destacados</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ type: 'spring', bounce: 0.35, duration: 0.65, delay: i * 0.07 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div
                  className="bg-[#111115] rounded-[1.3rem] overflow-hidden border border-white/8 hover:border-pink-500/40 cursor-pointer group transition-all duration-300"
                  onClick={() => onOpenProduct(product)}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-white/5 to-black p-3">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_60%)]" />
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
                      loading="lazy"
                    />
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    {product.isNew && <span className="text-xs font-black text-cyan-400">✨ NUEVO</span>}
                    <p className="font-black text-white text-xs sm:text-sm leading-tight mt-0.5">{product.name}</p>
                    <p className="text-xs text-pink-500 font-bold mt-1 uppercase tracking-wide">{product.type}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.sizesAvailable.map(s => (
                        <span key={s} className="text-xs bg-white/8 text-gray-400 px-1.5 py-0.5 rounded-md font-bold border border-white/10">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12"
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <button
              onClick={onNavigateToCatalog}
              className="px-8 py-3.5 bg-yellow-400 text-black font-black uppercase text-sm tracking-wider hover:bg-pink-500 hover:text-white transition-all duration-200 mr-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.12em' }}
            >
              Ver catálogo completo
            </button>
            <a
              href="https://wa.me/59178930774?text=Hola%2C%20quiero%20consultar%20modelos%20disponibles."
              target="_blank" rel="noopener noreferrer"
              className="inline-block border border-green-500 text-green-400 px-8 py-3.5 font-black uppercase text-sm tracking-wider hover:bg-green-500 hover:text-black transition-all duration-200"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            >
              Consultar por WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
