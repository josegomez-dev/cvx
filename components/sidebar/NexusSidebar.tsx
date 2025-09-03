'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Terminal, Zap, Settings, X, Minimize2, Maximize2 } from 'lucide-react';
import DeveloperConsole from '../web3/DeveloperConsole';

interface NexusSidebarProps {
  // Add props if needed in the future
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
}

export default function DeveloperSidebar({}: NexusSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const openConsole = () => {
    setIsConsoleOpen(true);
    setIsExpanded(true);
  };

  const closeConsole = () => {
    setIsConsoleOpen(false);
  };

  return (
    <>
      {/* Collapsed Sidebar */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: isVisible ? 0 : -100 }}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col items-center space-y-4 p-2">
          {/* Developer Console Avatar Button */}
          <motion.button
            onClick={openConsole}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 backdrop-blur-sm">
              <Terminal className="w-8 h-8 text-white" />
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            
            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span>CVx Developer Console</span>
              </div>
              <div className="text-xs text-white/60 mt-1">Interactive Terminal</div>
            </div>
          </motion.button>

          {/* Expand/Collapse Button */}
          <motion.button
            onClick={toggleExpanded}
            className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </motion.button>

          {/* Hide Button */}
          <motion.button
            onClick={() => setIsVisible(false)}
            className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Expanded Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            className="fixed left-0 top-0 h-full w-96 bg-black/90 backdrop-blur-md border-r border-white/20 z-50"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
                          <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">CVx Developer Console</h3>
                <p className="text-white/60 text-sm">Interactive Terminal</p>
              </div>
            </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={toggleExpanded}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Minimize2 className="w-4 h-4 text-white/60" />
                </motion.button>
                <motion.button
                  onClick={() => {
                    setIsExpanded(false);
                    setIsConsoleOpen(false);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 text-white/60" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {isConsoleOpen ? (
                <DeveloperConsole 
                  isOpen={isConsoleOpen} 
                  onClose={closeConsole}
                />
              ) : (
                <div className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                      <Terminal className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">Welcome to CVx Console</h3>
                      <p className="text-white/60 text-sm mb-4">
                        Interactive developer terminal with José&apos;s background, 
                        projects, and technical information. Type &apos;help&apos; to get started!
                      </p>
                    </div>
                    <motion.button
                      onClick={openConsole}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center space-x-2">
                        <Terminal className="w-4 h-4" />
                        <span>Launch Console</span>
                      </div>
                    </motion.button>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="mt-8 space-y-3">
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Available Commands</span>
                        <span className="text-green-400 font-semibold">8</span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Projects Showcased</span>
                        <span className="text-blue-400 font-semibold">10+</span>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-white/60 text-sm">Experience Years</span>
                        <span className="text-cyan-400 font-semibold">10+</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show Button when hidden */}
      <AnimatePresence>
        {!isVisible && (
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            onClick={() => setIsVisible(true)}
            className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Terminal className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
