"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useContact } from "@/app/contact-context";

function motionProps(reduceMotion: boolean | null) {
  const off = reduceMotion === true;
  return {
    hiddenY: (px: number) => (off ? { opacity: 1, y: 0 } : { opacity: 0, y: px }),
    hiddenYLight: () => (off ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }),
    hiddenLine: () =>
      off ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 },
    fade: () => (off ? { opacity: 1 } : { opacity: 0 }),
    line: () => (off ? { scaleX: 1 } : { scaleX: 0 }),
    t: (duration: number, delay: number) =>
      off ? { duration: 0, delay: 0 } : { duration, delay },
    tEase: (duration: number, delay: number) =>
      off
        ? { duration: 0, delay: 0 }
        : { duration, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

/** Shorter stagger on narrow viewports so the hero finishes animating sooner on phones. */
function useHeroStaggerDelays() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    function sync() {
      setNarrow(mq.matches);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return narrow
    ? { logo: 0.08, eyebrow: 0.18, title: 0.32, divider: 0.58, subtitle: 0.76, cta: 0.95, scroll: 1.2 }
    : { logo: 0.12, eyebrow: 0.25, title: 0.4, divider: 0.8, subtitle: 1.0, cta: 1.2, scroll: 1.6 };
}

export default function Hero() {
  const { openContact } = useContact();
  const reduceMotion = useReducedMotion();
  const m = motionProps(reduceMotion);
  const stagger = useHeroStaggerDelays();

  return (
    <section
      id="home"
      className="relative flex min-h-dvh flex-col overflow-x-hidden bg-warm-900"
    >
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
      <div className="absolute inset-0 bg-linear-to-b from-warm-900/78 via-warm-900/48 to-warm-900/78" />

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
        initial={m.line()}
        animate={{ scaleX: 1 }}
        transition={m.tEase(1.4, 0)}
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-warm-400/40 to-transparent"
      />

      {/* Content + scroll hint — flex keeps „Надолу“ visible (no overflow clip) */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-4 py-3 text-center sm:px-6 sm:py-5 md:py-6">
        {/* Logo — wrapper sets width so Image can use w-full h-auto (avoids Next.js aspect warning) */}
        <motion.div
          initial={m.hiddenYLight()}
          animate={{ opacity: 1, y: 0 }}
          transition={m.t(0.6, stagger.logo)}
          className="flex justify-center mb-0"
        >
          <div className="w-[min(45vw,158px)] sm:w-[min(44vw,198px)] md:w-[min(42vw,238px)] max-w-full shrink-0">
            <Image
              src="/images/logo/anna-hd-logo.png"
              alt="Anna"
              width={422}
              height={282}
              sizes="(max-width: 640px) 45vw, (max-width: 768px) 44vw, 238px"
              className="h-auto w-full object-contain"
              loading="eager"
              priority
            />
          </div>
        </motion.div>

        {/* Eyebrow label */}
        <motion.p
          initial={m.hiddenY(12)}
          animate={{ opacity: 1, y: 0 }}
          transition={m.t(0.8, stagger.eyebrow)}
          className="-mt-2.5 text-[11px] leading-none text-warm-200 mb-2 sm:mb-3 tracking-widest sm:-mt-3 sm:text-[12px] md:text-[13px]"
        >
          Майсторски класове · 2026
        </motion.p>

        {/* Main headline */}
        <motion.h1
          initial={m.hiddenY(22)}
          animate={{ opacity: 1, y: 0 }}
          transition={m.tEase(1, stagger.title)}
          className="heading-xl text-white mb-3 text-balance sm:mb-4 [text-shadow:0_2px_18px_rgba(0,0,0,0.38)]"
        >
          Професионални
          <br />
          <span className="italic font-light text-warm-200">
            обучения в България
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={m.hiddenLine()}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={m.t(0.8, stagger.divider)}
          className="divider-line mb-4 sm:mb-5"
        />

        {/* Subtitle */}
        <motion.p
          initial={m.hiddenY(12)}
          animate={{ opacity: 1, y: 0 }}
          transition={m.t(0.8, stagger.subtitle)}
          className="text-warm-200 text-xs sm:text-sm md:text-base font-light leading-snug sm:leading-relaxed mb-4 max-w-xl mx-auto sm:mb-6 md:mb-8 [text-shadow:0_2px_12px_rgba(0,0,0,0.28)]"
        >
          <span className="text-balance md:whitespace-nowrap">
            INTRASCULPT™ · BLEPH EFFECT™ · FACE MASSAGE MASTERY LEVEL 1
          </span>
          <span className="mt-2 block">
            <span className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-2.5 py-1.5 text-xs md:text-sm font-medium tracking-wide text-white backdrop-blur-[1px]">
              София · Варна
            </span>
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={m.hiddenY(12)}
          animate={{ opacity: 1, y: 0 }}
          transition={m.t(0.8, stagger.cta)}
          className="flex w-full max-w-md flex-col sm:max-w-none sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mx-auto"
        >
          <button
            type="button"
            onClick={() => openContact()}
            className="group inline-flex min-h-11 w-full items-center justify-center gap-3 bg-white text-warm-900 px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:bg-warm-100 transition-all duration-300 rounded-none cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.24)] hover:-translate-y-0.5 sm:w-auto sm:px-10 sm:py-4 active:scale-[0.99]"
          >
            Запиши се сега
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          <Link
            href="#courses"
            className="inline-flex min-h-11 w-full items-center justify-center gap-3 border border-white/50 bg-black/15 text-white px-8 py-3.5 text-sm font-medium tracking-widest uppercase hover:border-white/80 hover:bg-black/25 transition-all duration-300 rounded-none sm:w-auto sm:px-10 sm:py-4 active:scale-[0.99]"
          >
            Обученията
          </Link>
        </motion.div>
        </div>

        {/* Scroll indicator — in document flow so it stays visible above fold */}
        <motion.div
          initial={m.fade()}
          animate={{ opacity: 1 }}
          transition={m.t(1, stagger.scroll)}
          className="flex shrink-0 flex-col items-center gap-1.5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-1"
        >
          <span className="label-sm text-warm-500">Надолу</span>
          <motion.div
            animate={reduceMotion ? false : { y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-linear-to-b from-warm-400 to-transparent"
          />
        </motion.div>
      </div>

      {/* Decorative bottom line */}
      <motion.div
        initial={m.line()}
        animate={{ scaleX: 1 }}
        transition={m.tEase(1.4, 0.3)}
        className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-warm-400/40 to-transparent"
      />
    </section>
  );
}
