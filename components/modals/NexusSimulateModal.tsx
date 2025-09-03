'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import NexusSimulate from '../interactive/NexusSimulate';

interface NexusSimulateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NexusSimulateModal({ isOpen, onClose }: NexusSimulateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-6xl h-auto max-h-[90vh] bg-black/95 border border-orange-500/30 rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <NexusSimulate isOpen={isOpen} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
