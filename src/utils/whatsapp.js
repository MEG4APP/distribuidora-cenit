// ================================================================
// WHATSAPP UTILITIES — DISTRIBUIDORA CENIT
// ================================================================

const WHATSAPP_PHONE = "59176478586"; // Bolivia +591

/**
 * Genera un enlace de WhatsApp con mensaje pre-llenado.
 * @param {string} productName - Nombre del producto
 * @param {number|null} size - Talla seleccionada (opcional)
 * @param {string|null} color - Color seleccionado (opcional)
 * @param {string|null} customMessage - Mensaje personalizado (opcional)
 * @returns {string} URL de WhatsApp
 */
export function buildWhatsAppUrl({ productName, size = null, color = null, customMessage = null }) {
  let message = customMessage;

  if (!message) {
    message = `Hola! Quiero consultar por el modelo *${productName}*`;
    if (size) message += `, talla ${size}`;
    if (color) message += `, color ${color}`;
    message += `. ¿Está disponible?`;
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

/**
 * Genera mensaje de contacto general
 */
export function buildGeneralWhatsAppUrl() {
  const message = "Hola! Quiero ver el catálogo de Distribuidora CENIT. ¿Pueden mostrarme los modelos disponibles?";
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export default buildWhatsAppUrl;
