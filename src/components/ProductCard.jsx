// ================================================================
// COMPONENT: ProductCard — Distribuidora CENIT
// Tarjeta individual de producto en el catálogo
// ================================================================

import WhatsAppButton from "./WhatsAppButton";

// Colores para los dots de variantes de color
const COLOR_MAP = {
  "Mostaza":             "#d4a017",
  "Beige":               "#d2b48c",
  "Multicolor":          "linear-gradient(135deg, #f00, #0f0, #00f)",
  "Geométrico multicolor":"linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff)",
  "Turquesa":            "#40e0d0",
  "Blanco total":        "#f0f0f0",
  "Negro y Blanco":      "#333",
  "Snake print":         "#8b7355",
  "Beige con glitter":   "#d4c5a9",
  "Amarillo azufre":     "#e8d44d",
  "Natural / Crudo":     "#c8b89a",
  "Negro elegante":      "#1a1a1a",
  "Rosa charol":         "#f4a0c0",
  "Blanco":              "#f8f8f8",
  "Negro":               "#222",
  "Rosa":                "#f4a0c0",
  "Natural":             "#c8b89a",
};

function AvailabilityBadge({ availability, isNew }) {
  if (isNew) {
    return (
      <span className="badge-new inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-500 text-white text-xs font-bold rounded-full">
        ✨ Nuevo
      </span>
    );
  }
  if (availability === "Agotado") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-200 text-gray-500 text-xs font-semibold rounded-full">
        Agotado
      </span>
    );
  }
  if (availability === "Pocas unidades") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
        🔥 Pocas unidades
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
      ✓ Disponible
    </span>
  );
}

export default function ProductCard({ product, onOpenModal }) {
  const {
    name, category, type, material,
    colorsAvailable, sizesAvailable,
    availability, isNew, images,
  } = product;

  const isAvailable = availability !== "Agotado";

  return (
    <article className={`product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col ${!isAvailable ? "opacity-70" : ""}`}>

      {/* ── Imagen ── */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-square overflow-hidden group">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge disponibilidad */}
        <div className="absolute top-3 left-3">
          <AvailabilityBadge availability={availability} isNew={isNew} />
        </div>

        {/* Overlay botón ver detalles */}
        <div className="absolute inset-0 bg-blue-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => onOpenModal(product)}
            className="px-4 py-2 bg-white text-blue-900 rounded-xl font-bold text-sm shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
          >
            Ver detalles
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-4 flex flex-col flex-1">

        {/* Categoría + tipo */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
            {type}
          </span>
          <span className="text-gray-300">·</span>
          <span className="text-xs text-gray-400">{material}</span>
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2 line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* Colores disponibles */}
        <div className="flex items-center gap-1.5 mb-3">
          {colorsAvailable.slice(0, 5).map((color) => {
            const bg = COLOR_MAP[color] || "#ccc";
            const isGradient = bg.includes("gradient");
            return (
              <div
                key={color}
                title={color}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200"
                style={isGradient ? { backgroundImage: bg } : { backgroundColor: bg }}
              />
            );
          })}
          {colorsAvailable.length > 5 && (
            <span className="text-xs text-gray-400 font-medium">
              +{colorsAvailable.length - 5}
            </span>
          )}
        </div>

        {/* Tallas */}
        <div className="flex flex-wrap gap-1 mb-4">
          {sizesAvailable.map((s) => (
            <span
              key={s}
              className="inline-flex items-center justify-center w-7 h-7 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Precio */}
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-500 italic">
            Consultar precio
          </span>
        </div>

        {/* Botones */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onOpenModal(product)}
            className="flex-1 py-2.5 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-colors duration-200"
          >
            Ver detalles
          </button>
          <WhatsAppButton
            variant="icon"
            productName={name}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </article>
  );
}
