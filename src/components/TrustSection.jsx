// ================================================================
// TrustSection.jsx — Distribuidora CENIT — Dark Street Style
// Refactorizado con GSAP + ScrollTrigger
// ================================================================
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TrustSection() {
  const container = useRef();
  const features = [
    { icon: '👟', title: 'Tallas del 35 al 40',    desc: 'Amplio rango para toda la familia.'          },
    { icon: '💬', title: 'Atención personalizada',  desc: 'Respondemos por WhatsApp con rapidez.'       },
    { icon: '📦', title: 'Reserva y entrega',        desc: 'Reserva tu modelo con un mensaje.'          },
    { icon: '✨', title: 'Diseños exclusivos',       desc: 'Snake, glitter, charol y más.'              },
  ];

  useGSAP(() => {
    // Revelar el header
    gsap.from('.trust-header', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 85%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Batch para las tarjetas de features
    ScrollTrigger.batch('.trust-feature-card', {
      interval: 0.1,
      batchMax: 4,
      onEnter: (batch) => gsap.fromTo(batch, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', overwrite: true }
      )
    });

    // Revelar la sección de tallas
    gsap.from('.trust-tallas', {
      scrollTrigger: {
        trigger: '.trust-tallas',
        start: 'top 90%',
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.2)'
    });

    // Efecto parallax súper sutil para los "neon blobs" de fondo
    gsap.to('.trust-bg-neon', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-16 bg-[#05070f] relative overflow-hidden">
      {/* Neon blobs */}
      <div className="trust-bg-neon absolute -inset-[10%] pointer-events-none bg-[radial-gradient(circle_at_20%_50%,rgba(255,0,102,0.08),transparent_40%),radial-gradient(circle_at_80%_50%,rgba(0,221,255,0.08),transparent_40%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="trust-header text-center mb-12 opacity-0">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-pink-500 mb-2">¿Por qué elegirnos?</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
            Tu tienda de confianza
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="trust-feature-card opacity-0 group p-6 rounded-[1.5rem] border border-white/8 bg-white/[0.04] hover:border-pink-500/40 hover:bg-white/[0.07] transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
              <h3 className="font-black text-white text-sm uppercase tracking-wide mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Tallas strip */}
        <div className="trust-tallas opacity-0 mt-10 rounded-[2rem] border border-white/10 bg-gradient-to-r from-pink-600/20 via-black to-cyan-600/20 p-6 text-white text-center">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Tallas disponibles en todos los modelos</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[35, 36, 37, 38, 39, 40].map(s => (
              <div key={s} className="w-12 h-12 bg-white/5 hover:bg-yellow-400/20 border border-white/15 hover:border-yellow-400/50 rounded-xl flex items-center justify-center font-black text-sm transition-all duration-200 text-white cursor-default">
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
