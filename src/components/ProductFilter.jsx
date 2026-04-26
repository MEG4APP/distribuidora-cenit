// ================================================================
// COMPONENT: ProductFilter — Distribuidora CENIT
// Panel de filtros: búsqueda, categoría, talla, disponibilidad
// ================================================================

import { useState } from "react";
import { sizes } from "../data/categories";
import CategoryNav from "./CategoryNav";

export default function ProductFilter({
  search, onSearchChange,
  category, onCategoryChange,
  size, onSizeChange,
  availability, onAvailChange,
  onReset,
  totalResults,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    search !== "" || category !== "all" || size !== null || availability !== "all";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">

      {/* ── Buscador ── */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          id="search-input"
          type="text"
          placeholder="Buscar modelo, color..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── CategoryNav ── */}
      <div className="mb-4">
        <CategoryNav activeCategory={category} onCategoryChange={onCategoryChange} />
      </div>

      {/* ── Toggle filtros avanzados ── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm text-blue-700 font-semibold hover:text-blue-900 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zM7 10a1 1 0 011-1h8a1 1 0 010 2H8a1 1 0 01-1-1zM11 16a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1z" />
          </svg>
          {showFilters ? "Ocultar filtros" : "Más filtros"}
          {hasActiveFilters && !showFilters && (
            <span className="w-2 h-2 bg-blue-600 rounded-full" />
          )}
        </button>

        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Limpiar filtros
            </button>
          )}
          <span className="text-xs text-gray-400 font-medium">
            {totalResults} {totalResults === 1 ? "modelo" : "modelos"}
          </span>
        </div>
      </div>

      {/* ── Filtros avanzados ── */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100 grid sm:grid-cols-2 gap-4 animate-fade-in">

          {/* Tallas */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Talla
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => onSizeChange(size === s ? null : s)}
                  className={`size-chip w-10 h-10 rounded-lg border text-sm font-bold transition-all ${
                    size === s
                      ? "bg-blue-800 text-white border-blue-800"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Disponibilidad */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Disponibilidad
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all",            label: "Todos",          color: "gray"  },
                { id: "Disponible",     label: "Disponible",     color: "green" },
                { id: "Pocas unidades", label: "Pocas unidades", color: "amber" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => onAvailChange(opt.id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                    availability === opt.id
                      ? "bg-blue-800 text-white border-blue-800"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
