import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/PROMOS/promo 1.png',
  '/PROMOS/promo 2.png',
];

const slideVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function PromosSlider() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000); // Cambia de slide cada 5 segundos
    return () => clearInterval(timer);
  }, [page]);

  const imageIndex = Math.abs(page % IMAGES.length);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section className="bg-black py-16 overflow-hidden relative">
      <div className="text-center mb-8 px-4">
        <h2 className="text-4xl sm:text-5xl font-black text-white uppercase drop-shadow-xl"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.04em' }}>
          OFERTAS <span className="text-yellow-400">ESPECIALES</span>
        </h2>
      </div>

      <div className="relative w-full overflow-hidden bg-[#0b0b0d] group">
        {/* Imagen invisible para darle la altura exacta y proporcional al contenedor */}
        <img src={IMAGES[0]} alt="" className="w-full h-auto opacity-0 pointer-events-none" />

        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={IMAGES[imageIndex]}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute top-0 left-0 w-full h-full object-contain shadow-2xl"
            alt={`Oferta Especial ${imageIndex + 1}`}
          />
        </AnimatePresence>

        {/* Flecha Izquierda */}
        <button
          className="absolute left-4 sm:left-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/10 transition-colors"
          onClick={() => paginate(-1)}
          aria-label="Oferta anterior"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Flecha Derecha */}
        <button
          className="absolute right-4 sm:right-8 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/10 transition-colors"
          onClick={() => paginate(1)}
          aria-label="Oferta siguiente"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Indicadores (Dots) */}
        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-3">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const dir = i > imageIndex ? 1 : -1;
                setPage([page + (i - imageIndex), dir]);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === imageIndex ? 'bg-yellow-400 scale-125' : 'bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir a la oferta ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
