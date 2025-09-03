'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Terminal, 
  Zap, 
  Settings, 
  X, 
  Minimize2, 
  Maximize2,
  Brain,
  Rocket,
  Code,
  Palette,
  Database,
  Globe,
  Shield,
  Cpu,
  Wifi,
  Battery,
  Activity,
  TrendingUp,
  Users,
  Star,
  Heart,
  Coffee,
  Pizza,
  Gamepad2,
  Music,
  Camera,
  BookOpen,
  Lightbulb,
  Target,
  Award,
  Trophy,
  Medal,
  Crown,
  Sparkles
} from 'lucide-react';
import DeveloperConsoleModal from '../modals/DeveloperConsoleModal';
import NexusSimulateModal from '../modals/NexusSimulateModal';
import AIChat from '../interactive/AIChat';

interface InteractiveToolsSidebarProps {}

interface ToolStats {
  id: string;
  name: string;
  icon: React.ReactNode;
  value: number;
  unit: string;
  description: string;
  color: string;
  animation: 'pulse' | 'bounce' | 'spin' | 'ping' | 'none';
}

export default function InteractiveToolsSidebar({}: InteractiveToolsSidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isNexusOpen, setIsNexusOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate visitor count
  useEffect(() => {
    const baseCount = 1234;
    const timer = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const openConsole = () => {
    setIsConsoleOpen(true);
  };

  const closeConsole = () => {
    setIsConsoleOpen(false);
  };

  const openNexus = () => {
    setIsNexusOpen(true);
  };

  const closeNexus = () => {
    setIsNexusOpen(false);
  };

  const openAIChat = () => {
    setIsAIChatOpen(true);
  };

  const closeAIChat = () => {
    setIsAIChatOpen(false);
  };

  const tools: ToolStats[] = [
    {
      id: 'console',
      name: 'CVx Developer Console',
      icon: <Terminal className="w-4 h-4" />,
      value: 8,
      unit: 'commands',
      description: 'Interactive terminal with José\'s background',
      color: 'from-green-500 to-emerald-500',
      animation: 'pulse'
    },
    {
      id: 'ai-assistant',
      name: 'AI Assistant',
      icon: <Brain className="w-4 h-4" />,
      value: 100,
      unit: '% free',
      description: 'Powered by HuggingFace models',
      color: 'from-purple-500 to-pink-500',
      animation: 'bounce'
    },
    {
      id: 'nexus-simulate',
      name: 'Nexus Simulate',
      icon: <Rocket className="w-4 h-4" />,
      value: 5,
      unit: 'scenarios',
      description: 'Web3 development simulations',
      color: 'from-blue-500 to-cyan-500',
      animation: 'ping'
    },
  ];

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'pulse': return 'animate-pulse';
      case 'bounce': return 'animate-bounce';
      case 'spin': return 'animate-spin';
      case 'ping': return 'animate-ping';
      default: return '';
    }
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
          {/* Main Avatar Button */}
          <motion.button
            onClick={openConsole}
            className="relative group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            
            {/* Pulse Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 rounded-full"
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
                <Sparkles className="w-4 h-4 text-green-400" />
                <span>CVx Interactive Tools</span>
              </div>
              <div className="text-xs text-white/60 mt-1">Fun & Playful Stats</div>
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
            className="fixed left-0 top-0 h-full w-96 bg-black/90 backdrop-blur-md border-r border-white/20 z-50 overflow-y-auto"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 sticky top-0 bg-black/90 backdrop-blur-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">CVx Interactive Tools</h3>
                  <p className="text-white/60 text-sm">Fun & Playful Stats</p>
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
            <div className="p-4 space-y-4">
              {/* Live Stats */}
              <div className="bg-white/5 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">Current Time</span>
                  <span className="text-green-400 font-mono text-sm">
                    {currentTime.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center justify-between blur-sm opacity-60">
                  <span className="text-white/60 text-sm">Visitors Today</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400 font-semibold">
                      {visitorCount.toLocaleString()}
                    </span>
                    <div className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-semibold">
                      WIP
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between blur-sm opacity-60">
                  <span className="text-white/60 text-sm">Server Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Online</span>
                    <div className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-semibold">
                      WIP
                    </div>
                  </div>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm">Interactive Tools & Stats</h4>
                <div className="grid grid-cols-1 gap-3">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.id}
                      className={`bg-gradient-to-r ${tool.color} p-3 rounded-lg cursor-pointer group relative overflow-hidden`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                                             onClick={() => {
                         if (tool.id === 'console') {
                           openConsole();
                         } else if (tool.id === 'nexus-simulate') {
                           openNexus();
                         } else if (tool.id === 'ai-assistant') {
                           openAIChat();
                         }
                       }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-white/20 rounded-full flex items-center justify-center ${getAnimationClass(tool.animation)}`}>
                            {tool.icon}
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm">{tool.name}</div>
                            <div className="text-white/80 text-xs">{tool.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold text-lg">{tool.value}</div>
                          <div className="text-white/80 text-xs">{tool.unit}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Fun Facts */}
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold text-sm mb-3">Fun Facts</h4>
                <div className="space-y-2 text-xs text-white/80">
                  <div>🎯 This portfolio took 10 cups of coffee to build</div>
                  <div>🚀 This CVx was coded for 96 hours straight</div>
                  <div>💡 69% of ideas happen at 3 AM</div>
                  <div>🎵 Favorite coding music: Lo-Fi & me :) | <a href={process.env.NEXT_PUBLIC_SPOTIFY_URL || '#'} target="_blank" className="text-blue-400 cursor-pointer">Spotify Album</a></div>
                </div>
              </div>
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
            className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 backdrop-blur-sm"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Developer Console Modal */}
      <DeveloperConsoleModal 
        isOpen={isConsoleOpen} 
        onClose={closeConsole}
      />

      {/* Nexus Simulate Modal */}
      <NexusSimulateModal 
        isOpen={isNexusOpen} 
        onClose={closeNexus}
      />

      {/* AI Chat Modal */}
      <AIChat 
        isOpen={isAIChatOpen} 
        onClose={closeAIChat}
      />
    </>
  );
}
