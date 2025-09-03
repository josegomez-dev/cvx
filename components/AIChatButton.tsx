'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MessageCircle, Terminal, X, Sparkles } from 'lucide-react';

interface AIChatButtonProps {
  onOpenChat: (type: 'ai' | 'console') => void;
}

export default function AIChatButton({ onOpenChat }: AIChatButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTooltipIndex, setCurrentTooltipIndex] = useState(0);

  const tooltipMessages = [
    "🤖 Free AI Assistant powered by HuggingFace",
    "💬 Ask about Web3 opportunities & career advice",
    "⚡ Quick business proposals & project ideas",
    "🎯 Get personalized development guidance",
    "🚀 Explore next-gen Web3 technologies",
    "💡 Free AI chat - no API costs!",
    "🔍 CVX Developer Console - navigate portfolio",
    "✨ Magic AI button - try it now!",
    "🎪 Interactive AI experience",
    "🌟 Powered by open-source models"
  ];

  useEffect(() => {
    if (showTooltip) {
      const interval = setInterval(() => {
        setCurrentTooltipIndex((prev) => (prev + 1) % tooltipMessages.length);
      }, 3000); // Change message every 3 seconds

      return () => clearInterval(interval);
    }
  }, [showTooltip, tooltipMessages.length]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Animated Tooltip */}
      <AnimatePresence>
        {showTooltip && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="absolute bottom-20 right-0 mb-3 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-2xl max-w-xs"
          >
            <motion.div
              key={currentTooltipIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5 }}
              className="text-white text-sm font-medium text-center"
            >
              {tooltipMessages[currentTooltipIndex]}
            </motion.div>
            {/* Tooltip arrow */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 right-0 mb-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl"
          >
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onOpenChat('ai');
                  setIsExpanded(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-purple-500/30 rounded-xl transition-all duration-200 text-white"
              >
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span className="font-medium">Assistant</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onOpenChat('console');
                  setIsExpanded(false);
                }}
                className="flex items-center space-x-3 w-full px-4 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-xl transition-all duration-200 text-white"
              >
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="font-medium">Console</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleExpanded}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full shadow-2xl border-2 border-white/20 flex items-center justify-center transition-all duration-300"
        animate={{
          boxShadow: [
            "0 0 0 rgba(147, 51, 234, 0)",
            "0 0 20px rgba(147, 51, 234, 0.3)",
            "0 0 0 rgba(147, 51, 234, 0)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
