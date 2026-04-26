// ================================================================
// HOOK: useFilters — DISTRIBUIDORA CENIT
// Gestiona el estado de todos los filtros del catálogo
// ================================================================

import { useState, useMemo } from "react";
import products from "../data/products";

export function useFilters() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("all");
  const [size, setSize]           = useState(null);
  const [availability, setAvail]  = useState("all");

  // Productos filtrados — recalcula solo cuando cambian los filtros
  const filtered = useMemo(() => {
    return products.filter((p) => {
      // Búsqueda por nombre o modelo
      const matchSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.modelCode.toLowerCase().includes(search.toLowerCase()) ||
        p.color.toLowerCase().includes(search.toLowerCase());

      // Categoría
      const matchCat = category === "all" || p.category === category;

      // Talla
      const matchSize = !size || p.sizesAvailable.includes(size);

      // Disponibilidad
      const matchAvail = availability === "all" || p.availability === availability;

      return matchSearch && matchCat && matchSize && matchAvail;
    });
  }, [search, category, size, availability]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setSize(null);
    setAvail("all");
  };

  return {
    search, setSearch,
    category, setCategory,
    size, setSize,
    availability, setAvail,
    filtered,
    resetFilters,
    totalResults: filtered.length,
  };
}

export default useFilters;
