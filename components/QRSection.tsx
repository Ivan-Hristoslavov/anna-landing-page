"use client";

import { motion } from "framer-motion";
import QRCode from "react-qr-code";

export const REGISTRATION_URL = "https://forms.gle/your-registration-form-id";

export default function QRSection() {
  return (
    <section
      id="qr-section"
      className="section-padding bg-warm-900 relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/20" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="label-sm text-warm-400 mb-4 tracking-widest3">
            Регистрация
          </p>
          <h2 className="heading-lg text-white mb-6">Запази своето място</h2>
          <div className="divider-line mb-8" />
          <p className="text-warm-300 text-lg font-light">
            Сканирай QR кода за записване
          </p>
        </motion.div>

        {/* QR code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex flex-col items-center"
        >
          {/* QR frame */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl shadow-black/30 mb-8">
            <div className="bg-white p-2 rounded-xl">
              <QRCode
                value={REGISTRATION_URL}
                size={220}
                bgColor="#FFFFFF"
                fgColor="#1C1917"
                level="M"
                style={{ display: "block" }}
              />
            </div>
            <div className="mt-4 pt-4 border-t border-warm-100 text-center">
              <p className="text-[11px] text-warm-500 tracking-wider uppercase font-medium">
                Обучения 2026
              </p>
            </div>
          </div>

          {/* Instruction */}
          <p className="text-warm-400 text-sm font-light mb-8 flex items-center gap-3">
            <span className="w-8 h-px bg-warm-600" />
            Насочи камерата на телефона към кода
            <span className="w-8 h-px bg-warm-600" />
          </p>

          {/* CTA Button */}
          <a
            href={REGISTRATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-warm-900 font-medium px-12 py-4 text-sm tracking-widest uppercase hover:bg-warm-100 transition-colors"
          >
            Регистрирай се
          </a>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-warm-600 text-xs font-light mt-12"
        >
          Местата са ограничени. Осигури своето навреме.
        </motion.p>
      </div>
    </section>
  );
}
