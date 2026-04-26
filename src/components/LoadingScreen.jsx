// ================================================================
// LoadingScreen.jsx — Stars + Logo + Progress Bar
// ================================================================
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.2,
      alpha: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.35 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.025 + 0.005,
    }));

    let raf;
    const draw = () => {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.twinkle += s.twinkleSpeed;
        const a = s.alpha * (0.65 + 0.35 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const DURATION = 2800;
    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(((Date.now() - start) / DURATION) * 100, 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(tick);
        setTimeout(() => { setVisible(false); setTimeout(onComplete, 650); }, 350);
      }
    }, 16);

    return () => { cancelAnimationFrame(raf); clearInterval(tick); window.removeEventListener('resize', resize); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.25 }}
              className="mb-6"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/30 to-pink-500/30 rounded-3xl blur-2xl" />
                <img src="/logo-cenit.jpg" alt="Distribuidora CENIT"
                  className="relative w-28 h-auto rounded-2xl shadow-2xl ring-1 ring-white/10" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-white font-black text-xl tracking-[0.3em] uppercase mb-1"
            >
              Distribuidora CENIT
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="text-gray-500 text-xs tracking-widest uppercase mb-8"
            >
              Catálogo 2026
            </motion.p>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 240 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="w-60 h-px bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-75"
                  style={{
                    width: `${progress}%`,
                    background: 'linear-gradient(90deg, #06b6d4, #ec4899)',
                    boxShadow: '0 0 10px rgba(6,182,212,0.7)',
                  }}
                />
              </div>
              <p className="text-center text-gray-600 text-xs mt-2 font-mono">
                {Math.round(progress)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
