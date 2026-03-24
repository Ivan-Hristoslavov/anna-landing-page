"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useContact } from "@/app/contact-context";

export default function Hero() {
  const { openContact } = useContact();

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-warm-900">
      {/* Hero image */}
      <Image
        src="/images/hero/hero-image.jpeg"
        alt="Anna Training"
        fill
        sizes="100vw"
        quality={90}
        className="object-cover object-center opacity-65"
        priority
      />

      {/* Background texture layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-900/60 via-warm-900/25 to-warm-900/60" />

      {/* Subtle grain overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Decorative top line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-400/40 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="label-sm text-warm-400 mb-8 tracking-widest3"
        >
          Майсторски класове · 2026
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl text-white mb-6 text-balance"
        >
          Професионални
          <br />
          <span className="italic font-light text-warm-200">
            обучения в България
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="divider-line mb-8"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-warm-300 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto"
        >
          IntraSculpt™ · BLEPH EFFECT™ · Face Massage Mastery
          <br />
          <span className="text-warm-400 text-base">София · Варна</span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => openContact()}
            className="group inline-flex items-center gap-3 bg-white text-warm-900 px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-warm-100 transition-all duration-300 rounded-none cursor-pointer"
          >
            Запиши се сега
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          <Link
            href="#courses"
            className="inline-flex items-center gap-3 border border-white/30 text-white/80 px-10 py-4 text-sm font-medium tracking-widest uppercase hover:border-white/60 hover:text-white transition-all duration-300 rounded-none"
          >
            Обученията
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-sm text-warm-500">Прелисти</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-warm-400 to-transparent"
        />
      </motion.div>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warm-400/40 to-transparent"
      />
    </section>
  );
}
