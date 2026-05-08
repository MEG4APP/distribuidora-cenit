// ================================================================
// HomePage.jsx — Dark street style — TODO negro
// Refactorizado con GSAP + ScrollTrigger
// ================================================================
import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroInicio from '../components/HeroInicio';
import CircularGallery from '../components/CircularGallery';
import TrustSection from '../components/TrustSection';
import WhatsAppButton from '../components/WhatsAppButton';
import PromosSlider from '../components/PromosSlider';
import { products } from '../data/products';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HomePage({ onNavigateToCatalog, onOpenProduct }) {
  const container = useRef();
  const galleryItems = products.map(p => ({ image: p.images[0], text: p.name, product: p }));
  const featured     = products.filter(p => p.featured);

  useGSAP(() => {
    // Parallax suave para los fondos "radiales" de las secciones (efecto de cámara de estudio)
    gsap.utils.toArray('.bg-parallax').forEach((bg) => {
      gsap.to(bg, {
        yPercent: 15, // Mueve el fondo un 15% de su altura al hacer scroll
        ease: 'none',
        scrollTrigger: {
          trigger: bg.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Revelado de la Galería
    gsap.from('.gallery-header-item', {
      scrollTrigger: {
        trigger: '.gallery-section',
        start: 'top 85%',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Revelado del botón "Ver catálogo"
    gsap.from('.gallery-cta', {
      scrollTrigger: {
        trigger: '.gallery-cta',
        start: 'top 95%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.5)'
    });

    // Botones finales
    gsap.from('.final-cta', {
      scrollTrigger: {
        trigger: '.final-cta-container',
        start: 'top 95%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.5)'
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-black">

      {/* ── Hero Inicio ── */}
      <HeroInicio onShopClick={onNavigateToCatalog} />

      {/* ── Galería circular WebGL ── */}
      <section 
        className="gallery-section relative overflow-hidden bg-black"
        style={{ background: "url('/inicio/fondo%20carrusel.png') center/cover no-repeat" }}
      >
        {/* Fondo parallax (sin gradiente radial para respetar la imagen) */}
        <div className="bg-parallax absolute -inset-[20%] pointer-events-none" />

        <div className="relative z-10 pt-20 pb-8 text-center px-4">
          <p className="gallery-header-item text-sm sm:text-base font-black uppercase tracking-[0.4em] text-cyan-400 mb-2">Colección 2026</p>
          <h2 className="gallery-header-item text-5xl sm:text-7xl font-black text-white uppercase drop-shadow-xl"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
            Todos los modelos
          </h2>
          <p className="gallery-header-item text-gray-400 text-base sm:text-lg mt-3">Deslizá para explorar · Hacé clic para ver detalles</p>
        </div>

        <div className="relative z-10 h-[400px] md:h-[520px]">
          <CircularGallery items={galleryItems} bend={1} textColor="#ffffff" borderRadius={0.05} scrollSpeed={2} scrollEase={0.085} />
        </div>

        <div className="relative z-10 pb-16 pt-6 text-center overflow-hidden">
          <button
            onClick={onNavigateToCatalog}
            className="gallery-cta px-8 py-3.5 bg-yellow-400 text-black font-black uppercase text-sm tracking-wider hover:bg-yellow-300 transition-colors shadow-xl shadow-yellow-400/20"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.12em' }}
          >
            Ver catálogo completo →
          </button>
        </div>
      </section>

      {/* ── Trust Section ── */}
      <TrustSection />

      {/* ── Ofertas Especiales (Slider Edge-to-Edge) ── */}
      <PromosSlider />

      <section className="bg-[#050505] py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="final-cta-container text-center overflow-hidden py-4">
            <button
              onClick={onNavigateToCatalog}
              className="final-cta px-8 py-3.5 bg-yellow-400 text-black font-black uppercase text-sm tracking-wider hover:bg-pink-500 hover:text-white transition-all duration-200 mr-4 inline-block mb-4 sm:mb-0"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.12em' }}
            >
              Ver catálogo completo
            </button>
            <a
              href="https://wa.me/59178930774?text=Hola%2C%20quiero%20consultar%20modelos%20disponibles."
              target="_blank" rel="noopener noreferrer"
              className="final-cta inline-block border border-green-500 text-green-400 px-8 py-3.5 font-black uppercase text-sm tracking-wider hover:bg-green-500 hover:text-black transition-all duration-200"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
