"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import {
  Modal,
  ModalBackdrop,
  ModalContainer,
  ModalDialog,
  ModalHeader,
  ModalHeading,
  ModalBody,
  ModalFooter,
  Button,
  useOverlayState,
} from "@heroui/react";

const REGISTRATION_URL = "https://forms.gle/your-registration-form-id";

export default function FloatingQR() {
  const state = useOverlayState();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 8, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative bg-warm-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
            >
              Запиши се
              <span className="absolute right-3 -bottom-1 w-2 h-2 bg-warm-900 rotate-45 block" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={state.open}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative w-16 h-16 rounded-full bg-warm-900 text-white shadow-2xl shadow-warm-900/40 flex items-center justify-center overflow-hidden"
          aria-label="Запиши се – отвори QR код"
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.4, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full bg-warm-700"
          />
          {/* QR icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="relative z-10">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="1.8" />
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="white" strokeWidth="1.8" />
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="white" strokeWidth="1.8" />
            <rect x="5" y="5" width="3" height="3" rx="0.5" fill="white" />
            <rect x="16" y="5" width="3" height="3" rx="0.5" fill="white" />
            <rect x="5" y="16" width="3" height="3" rx="0.5" fill="white" />
            <path d="M14 14h2v2h-2zM18 14h3M18 18h3M14 18v3" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.button>
      </div>

      {/* Modal */}
      <Modal.Root state={state}>
        <ModalBackdrop
          isDismissable
          className="fixed inset-0 bg-warm-900/60 backdrop-blur-sm z-50"
        />
        <ModalContainer
          placement="center"
          size="sm"
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ModalDialog className="bg-white rounded-2xl border border-warm-100 shadow-2xl w-full max-w-sm mx-auto overflow-hidden">
              {/* Header */}
              <ModalHeader className="px-6 pt-6 pb-4 border-b border-warm-100">
                <p className="text-[10px] font-medium tracking-widest uppercase text-warm-400 mb-1">
                  Регистрация
                </p>
                <ModalHeading className="font-playfair text-2xl font-light text-warm-900">
                  Запази своето място
                </ModalHeading>
              </ModalHeader>

              {/* Body */}
              <ModalBody className="px-6 py-8 flex flex-col items-center gap-5">
                <div className="bg-white p-4 rounded-xl border border-warm-100 shadow-sm">
                  <QRCode
                    value={REGISTRATION_URL}
                    size={200}
                    bgColor="#FFFFFF"
                    fgColor="#1C1917"
                    level="M"
                    style={{ display: "block" }}
                  />
                </div>

                <div className="text-center">
                  <p className="text-sm text-warm-600 font-light leading-relaxed">
                    Сканирай QR кода за записване
                  </p>
                  <p className="text-xs text-warm-400 mt-1">
                    Насочи камерата на телефона към кода
                  </p>
                </div>

                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-warm-400 hover:text-warm-600 transition-colors underline underline-offset-4 decoration-warm-200"
                >
                  Или отвори директната връзка
                </a>
              </ModalBody>

              {/* Footer */}
              <ModalFooter className="px-6 pb-6 pt-4 border-t border-warm-100 flex gap-3">
                <a
                  href={REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-warm-900 text-white text-xs font-medium tracking-widest uppercase px-6 py-3 text-center hover:bg-warm-800 transition-colors rounded-none"
                >
                  Регистрирай се
                </a>
                {/* slot="close" tells react-aria Dialog to close on press — no nesting needed */}
                <Button
                  slot="close"
                  variant="outline"
                  className="border-warm-200 text-warm-600 text-xs font-medium px-5 rounded-none hover:bg-warm-50"
                  size="md"
                >
                  Затвори
                </Button>
              </ModalFooter>
            </ModalDialog>
          </motion.div>
        </ModalContainer>
      </Modal.Root>
    </>
  );
}
