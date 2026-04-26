// ================================================================
// ProductDetailModal.jsx — Distribuidora CENIT
// Con lightbox al hacer clic en la imagen + framer-motion
// ================================================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppButton from './WhatsAppButton';
import ImageLightbox from './ImageLightbox';

function AvailabilityDot({ availability }) {
  const map = {
    "Disponible":     { color: "bg-green-500", label: "Disponible" },
    "Pocas unidades": { color: "bg-amber-400", label: "Pocas unidades" },
    "Agotado":        { color: "bg-gray-400",  label: "Agotado" },
  };
  const cfg = map[availability] || map["Disponible"];
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
      <span className={`w-2.5 h-2.5 rounded-full ${cfg.color}`} />
      {cfg.label}
    </span>
  );
}

export default function ProductDetailModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && !lightboxOpen) onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, lightboxOpen]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!product) return null;

  const { name, modelCode, category, type, material, color, colorsAvailable,
    sizesAvailable, availability, isNew, images, description, brandLine } = product;

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            className="bg-white w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl max-h-[95vh] overflow-y-auto shadow-2xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            {/* ── Header modal ── */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{brandLine}</p>
                <h2 className="text-lg font-black text-gray-900 leading-tight">{name}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors text-lg font-bold"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid sm:grid-cols-2 gap-6">

                {/* ── Imagen clickeable → lightbox ── */}
                <motion.div
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden aspect-square flex items-center justify-center cursor-zoom-in relative group"
                  onClick={() => setLightboxOpen(true)}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {!imgLoaded && (
                    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin absolute" />
                  )}
                  <img
                    src={images[0]}
                    alt={name}
                    className={`w-full h-full object-contain p-4 transition-all duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImgLoaded(true)}
                  />
                  {/* Hint zoom */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/60 text-white text-xs px-2 py-1 rounded-lg">
                    🔍 Ampliar
                  </div>
                </motion.div>

                {/* ── Info ── */}
                <div className="flex flex-col">
                  {/* Badges */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {isNew && (
                      <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs font-bold rounded-full">✨ Nuevo</span>
                    )}
                    <AvailabilityDot availability={availability} />
                  </div>

                  {/* Detalles */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 text-sm">
                    {[
                      { label: "Modelo",    value: modelCode },
                      { label: "Categoría", value: category },
                      { label: "Tipo",      value: type },
                      { label: "Material",  value: material },
                      { label: "Color",     value: color },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                        <p className="text-gray-800 font-medium">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Precio */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-xl">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-0.5">Precio</p>
                    <p className="text-gray-600 text-sm font-semibold italic">Consultar por WhatsApp</p>
                  </div>

                  {/* Selector talla */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Talla {selectedSize && <span className="text-blue-700">— {selectedSize}</span>}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {sizesAvailable.map((s) => (
                        <motion.button
                          key={s}
                          onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-11 h-11 rounded-xl border-2 text-sm font-bold transition-colors ${
                            selectedSize === s
                              ? 'bg-blue-800 text-white border-blue-800 shadow-md'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'
                          }`}
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Selector color */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Color {selectedColor && <span className="text-blue-700">— {selectedColor}</span>}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {colorsAvailable.map((c) => (
                        <motion.button
                          key={c}
                          onClick={() => setSelectedColor(selectedColor === c ? null : c)}
                          whileHover={{ scale: 1.05 }}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                            selectedColor === c
                              ? 'bg-blue-800 text-white border-blue-800'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400'
                          }`}
                        >
                          {c}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="mt-2 mb-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Descripción</p>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>

              {/* CTA WhatsApp */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  {selectedSize || selectedColor
                    ? `¿Listo para consultar por talla ${selectedSize || '?'} en ${selectedColor || 'el color elegido'}?`
                    : 'Seleccioná tu talla y color para la consulta exacta:'}
                </p>
                <WhatsAppButton
                  productName={name}
                  size={selectedSize}
                  color={selectedColor}
                  label="Consultar por WhatsApp"
                  className="w-full justify-center py-3.5 text-base"
                />
                <p className="text-xs text-gray-400 text-center mt-2">Te respondemos de inmediato 💬</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <ImageLightbox
          src={images[0]}
          alt={name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
