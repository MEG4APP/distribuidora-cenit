// ================================================================
// COMPONENT: CategoryNav — Distribuidora CENIT
// Pills de filtrado rápido por categoría
// ================================================================

import { categories } from "../data/categories";

export default function CategoryNav({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`filter-chip px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
            activeCategory === cat.id
              ? "bg-blue-800 text-white border-blue-800 shadow-md"
              : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700"
          }`}
        >
          {cat.icon} {cat.label}
        </button>
      ))}
    </div>
  );
}
