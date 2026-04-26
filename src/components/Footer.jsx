// ================================================================
// Footer.jsx — Distribuidora CENIT — Dark Street Style
// ================================================================
export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black border-t border-white/8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          <div>
            <img src="/logo-cenit.jpg" alt="Distribuidora CENIT" className="h-12 w-auto rounded-lg mb-3 opacity-90" />
            <p className="text-gray-600 text-sm leading-relaxed">Encuentra tu modelo ideal: tallas, colores y diseños en un solo catálogo.</p>
          </div>
          <div>
            <h4 className="font-black text-white mb-3 text-xs uppercase tracking-[0.2em]">Catálogo</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {['Caña Baja', 'Caña Alta', 'Plataforma', 'Ediciones Especiales'].map(item => (
                <li key={item}>
                  <button onClick={() => onNavigate?.('catalog')} className="hover:text-yellow-400 transition-colors text-left">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-black text-white mb-3 text-xs uppercase tracking-[0.2em]">Contacto</h4>
            <a href="https://wa.me/59178930774" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-200">
              WhatsApp
            </a>
            <p className="text-gray-700 text-xs mt-3">Tallas 35 al 40 · Bolivia</p>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 text-center">
          <p className="text-gray-700 text-xs">© {year} Distribuidora CENIT. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
