// ================================================================
// App.jsx — Distribuidora CENIT — Con Loading Screen + 3 páginas
// ================================================================
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProductDetailModal from './components/ProductDetailModal';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.18 } },
};

export default function App() {
  const [loading, setLoading]               = useState(true);
  const [currentPage, setCurrentPage]       = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // El LoadingScreen ahora se renderiza por encima de la app para que la app cargue en segundo plano

  return (
    <>
      <div className="min-h-screen bg-black">
      <Header currentPage={currentPage} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        <motion.div key={currentPage} variants={pageVariants} initial="initial" animate="animate" exit="exit">
          {currentPage === 'home'    && <HomePage onNavigateToCatalog={() => navigate('catalog')} onOpenProduct={setSelectedProduct} />}
          {currentPage === 'catalog' && <CatalogPage onOpenProduct={setSelectedProduct} />}
          {currentPage === 'contact' && <ContactPage />}
        </motion.div>
      </AnimatePresence>

      <Footer onNavigate={navigate} />

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>

        <WhatsAppButton variant="float" />
      </div>

      {/* Loading Screen superpuesto */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
    </>
  );
}
