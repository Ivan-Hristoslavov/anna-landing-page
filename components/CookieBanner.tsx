"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = localStorage.getItem("cookie-consent");
    if (!choice) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
          className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto"
        >
          <div className="bg-warm-900 rounded-2xl px-6 py-5 shadow-2xl border border-warm-800">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white mb-1.5">
                  Използваме бисквитки
                </p>
                <p className="text-[11px] text-warm-400 font-light leading-relaxed">
                  Сайтът използва бисквитки за подобряване на потребителското изживяване.{" "}
                  <Link
                    href="/privacy"
                    className="text-warm-300 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    Политика за поверителност
                  </Link>{" "}
                  и{" "}
                  <Link
                    href="/terms"
                    className="text-warm-300 hover:text-white underline underline-offset-2 transition-colors"
                  >
                    Условия за ползване
                  </Link>
                  .
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={decline}
                  className="text-[11px] font-medium tracking-widest uppercase text-warm-500 hover:text-warm-300 transition-colors duration-200 whitespace-nowrap"
                >
                  Отказвам
                </button>
                <button
                  onClick={accept}
                  className="text-[11px] font-medium tracking-widest uppercase bg-white text-warm-900 px-5 py-2.5 rounded-xl hover:bg-warm-100 active:bg-warm-200 transition-colors duration-200 whitespace-nowrap"
                >
                  Приемам
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
