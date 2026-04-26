// ================================================================
// COMPONENT: ProductGrid — Distribuidora CENIT
// Grilla responsiva de productos filtrados
// ================================================================

import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onOpenModal }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">👟</div>
        <h3 className="text-xl font-bold text-gray-700 mb-2">
          Sin resultados
        </h3>
        <p className="text-gray-400 text-sm">
          Intenta con otro filtro o búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
}
