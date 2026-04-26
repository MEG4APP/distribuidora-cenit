// ================================================================
// ContactPage.jsx — Distribuidora CENIT — Street Style
// Pedidos grandes: WhatsApp + Email
// ================================================================
import { useState } from 'react';
import { motion } from 'framer-motion';

const WHATSAPP_NUMBER = "59178930774";
const CONTACT_EMAIL   = "distribuidora.cenit.bo@gmail.com";

function encode(t) { return encodeURIComponent(t); }

function Input({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-white/70">{label}</span>
      <input
        name={name} type={type} value={value} onChange={onChange}
        required={required} placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-cyan-400 transition-colors"
      />
    </label>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ nombre: '', negocio: '', ciudad: '', whatsapp: '', email: '', cantidad: '', tallas: '', mensaje: '' });
  const update = (e) => { const { name, value } = e.target; setForm(p => ({ ...p, [name]: value })); };

  const texto = `Hola, quiero hacer un pedido grande de zapatillas.\n\nNombre: ${form.nombre}\nNegocio: ${form.negocio}\nCiudad: ${form.ciudad}\nWhatsApp: ${form.whatsapp}\nEmail: ${form.email}\nCantidad: ${form.cantidad}\nTallas: ${form.tallas}\n\nMensaje: ${form.mensaje || 'Sin mensaje adicional.'}`;
  const waUrl   = `https://wa.me/${WHATSAPP_NUMBER}?text=${encode(texto)}`;
  const mailUrl = `mailto:${CONTACT_EMAIL}?subject=${encode('Pedido grande de zapatillas')}&body=${encode(texto)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    window.location.href = mailUrl;
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05070f] px-6 py-20 text-white">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,0,102,0.18),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(0,221,255,0.18),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(255,213,0,0.10),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div className="mb-14 text-center" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="mb-3 text-sm font-black uppercase tracking-[0.35em] text-cyan-300">Contacto</p>
          <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">
            Hablemos de{' '}
            <span className="text-yellow-400 drop-shadow-[0_0_18px_rgba(250,204,21,0.45)]">zapatillas</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Pedidos individuales, pedidos grandes, consultas de tallas o modelos especiales.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Compra directa */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl">
              <h2 className="text-3xl font-black uppercase">Compra directa</h2>
              <p className="mt-3 text-white/60">
                Para consultas rápidas, tallas disponibles o pedidos por modelo, escribinos por WhatsApp.
              </p>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encode('Hola, quiero consultar por zapatillas disponibles.')}`}
                target="_blank" rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-4 font-black uppercase text-black hover:scale-105 hover:bg-yellow-400 transition-all duration-200">
                💬 WhatsApp directo
              </a>
            </div>

            {/* Redes */}
            <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0d] p-7 shadow-2xl">
              <h3 className="text-2xl font-black uppercase text-yellow-400">Redes sociales</h3>
              <div className="mt-5 grid gap-3">
                {[
                  { label: 'Instagram · @distribuidoracenit', href: 'https://instagram.com/distribuidoracenit', hover: 'hover:border-pink-500 hover:text-pink-400' },
                  { label: 'Facebook · Distribuidora Cenit',  href: 'https://facebook.com',                    hover: 'hover:border-cyan-400 hover:text-cyan-300' },
                  { label: `Email · ${CONTACT_EMAIL}`,        href: `mailto:${CONTACT_EMAIL}`,                 hover: 'hover:border-yellow-400 hover:text-yellow-400' },
                ].map(r => (
                  <a key={r.label} href={r.href} target="_blank" rel="noreferrer"
                    className={`rounded-2xl border border-white/10 px-5 py-4 font-bold text-white/80 transition ${r.hover}`}>
                    {r.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Nota */}
            <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">Tallas disponibles</p>
              <p className="mt-3 text-white/65">
                Trabajamos tallas del <strong>35 al 40</strong>. Consultá disponibilidad antes de confirmar tu pedido.
              </p>
            </div>
          </div>

          {/* RIGHT — Form */}
          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl backdrop-blur-xl">
            <div className="mb-7">
              <p className="text-sm font-black uppercase tracking-[0.35em] text-pink-500">Pedidos grandes</p>
              <h2 className="mt-2 text-3xl font-black uppercase">Cotizá tu pedido</h2>
              <p className="mt-3 text-white/55">
                Completá los datos y se generará un mensaje para WhatsApp y correo automáticamente.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Nombre completo" name="nombre" value={form.nombre} onChange={update} required />
              <Input label="Negocio / institución" name="negocio" value={form.negocio} onChange={update} />
              <Input label="Ciudad" name="ciudad" value={form.ciudad} onChange={update} required />
              <Input label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={update} required />
              <Input label="Email" name="email" type="email" value={form.email} onChange={update} />
              <Input label="Cantidad aproximada" name="cantidad" value={form.cantidad} onChange={update} required />
            </div>
            <div className="mt-4">
              <Input label="Tallas requeridas" name="tallas" value={form.tallas} onChange={update} placeholder="Ej: 35, 36, 37, 38, 39, 40" />
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-bold text-white/70">Mensaje adicional</span>
              <textarea name="mensaje" value={form.mensaje} onChange={update} rows="4"
                placeholder="Ej: Quiero 20 pares surtidos, modelos deportivos y casuales..."
                className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-cyan-400 transition-colors" />
            </label>

            <div className="mt-7 flex flex-wrap gap-4">
              <button type="submit"
                className="rounded-2xl bg-yellow-400 px-7 py-4 font-black uppercase text-black hover:scale-105 hover:bg-pink-500 hover:text-white transition-all duration-200">
                Enviar pedido
              </button>
              <a href={waUrl} target="_blank" rel="noreferrer"
                className="rounded-2xl border border-green-400 px-7 py-4 font-black uppercase text-green-400 hover:bg-green-400 hover:text-black transition-all duration-200">
                Solo WhatsApp
              </a>
              <a href={mailUrl}
                className="rounded-2xl border border-white/15 px-7 py-4 font-black uppercase text-white/70 hover:border-cyan-300 hover:text-cyan-300 transition-all duration-200">
                Solo email
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
