"use client";
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  dialogClassName?: string;
};

export function Modal({ open, onClose, title, children, dialogClassName }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(36, 55, 104, 0.90)' }}
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="absolute inset-0 grid place-items-center p-4 md:p-8">
            <motion.div
              role="dialog"
              aria-modal="true"
              className={`relative bg-white shadow-2xl ${dialogClassName ?? ''}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ width: '100%', maxWidth: '1692px' }}
            >
              {/* Bouton de fermeture en position absolue */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 h-12 w-12 inline-flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#243768] text-3xl font-light shadow-lg transition-all"
                aria-label="Fermer"
              >
                ×
              </button>
              
              {/* Contenu de la modal sans padding */}
              <div className="relative">{children}</div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}


