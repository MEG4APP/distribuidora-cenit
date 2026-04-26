// ================================================================
// Header.jsx — Distribuidora CENIT — Dark theme
// ================================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppButton from './WhatsAppButton';

export default function Header({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio',   page: 'home'    },
    { label: 'Catálogo', page: 'catalog' },
    { label: 'Contacto', page: 'contact' },
  ];

  const handleNav = (page) => {
    onNavigate(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <button onClick={() => handleNav('home')} className="flex items-center gap-2 group" aria-label="Inicio">
            <img
              src="/logo-cenit.jpg"
              alt="Distribuidora CENIT"
              className="h-10 w-auto object-contain rounded-lg shadow-sm group-hover:opacity-85 transition-opacity duration-200"
            />
          </button>

          {/* ── Nav Desktop ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNav(link.page)}
                className={`relative px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-colors duration-200 ${
                  currentPage === link.page
                    ? 'text-yellow-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {currentPage === link.page && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-yellow-400 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* ── WhatsApp + Hamburguesa ── */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/59178930774?text=Hola%2C%20quiero%20consultar%20el%20cat%C3%A1logo."
              target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200"
            >
              WhatsApp
            </a>
            <button
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Nav Mobile ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="py-3">
                {navLinks.map((link) => (
                  <button
                    key={link.page}
                    onClick={() => handleNav(link.page)}
                    className={`w-full text-left py-3 px-3 text-sm font-bold border-b border-white/5 last:border-0 transition-colors ${
                      currentPage === link.page ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-3">
                  <a href="https://wa.me/59178930774" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-black font-black uppercase text-sm rounded-lg">
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
