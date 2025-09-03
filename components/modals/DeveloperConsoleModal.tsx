'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, ChevronRight, Copy, Check, ExternalLink } from 'lucide-react';

interface ConsoleMessage {
  id: string;
  type: 'input' | 'output' | 'error' | 'info';
  content: string;
  timestamp: Date;
}

interface DeveloperConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(31, 41, 55, 0.5);
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(16, 185, 129, 0.6);
    border-radius: 4px;
    transition: background 0.2s ease;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(16, 185, 129, 0.8);
  }
  
  .custom-scrollbar::-webkit-scrollbar-corner {
    background: rgba(31, 41, 55, 0.5);
  }
`;

export default function DeveloperConsoleModal({ isOpen, onClose }: DeveloperConsoleModalProps) {
  const [messages, setMessages] = useState<ConsoleMessage[]>([
    {
      id: '1',
      type: 'info',
      content: `🎯 Welcome to CVx Developer Console v2.0.0
==============================================

🚀 Interactive terminal for José's portfolio
📍 Click outside to close | Type commands below

Quick Start:
• help - Show all available commands
• about - About José's background and skills  
• projects - List Web3 and Web2 projects
• contact - Contact information and links

💡 Tip: Use arrow keys ↑↓ to navigate command history
🔧 Type 'help' for complete command list`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Inject custom scrollbar styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = scrollbarStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [scrollbarStyles]);

  const scrollToBottom = () => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatHelpText = (text: string) => {
    return text
      .replace(/(•\s*)(\w+)(\s*-\s*)/g, '$1<span class="text-cyan-400 font-semibold">$2</span><span class="text-yellow-400">$3</span>')
      .replace(/(Type\s+)(['"]?)(\w+)(['"]?)(\s+)/g, '$1<span class="text-green-300 font-semibold">$2$3$4</span>$5')
      .replace(/(Available Commands:)/g, '<span class="text-purple-400 font-bold">$1</span>')
      .replace(/(Quick Start:)/g, '<span class="text-orange-400 font-bold">$1</span>')
      .replace(/(💡|🔧|🎯|🚀|📍)/g, '<span class="text-yellow-300">$1</span>');
  };

  const commands = {
    help: () => `Available Commands:
• about - About José's background and skills
• projects - List Web3 and Web2 projects  
• experience - Work experience and achievements
• skills - Technical skills and expertise
• contact - Contact information and social links
• portfolio - Portfolio features and components
• nexus - Nexus Simulate information
• assistant - AI Assistant features
• clear - Clear console
• exit - Close console

Type any command to get started!`,

    about: () => `José Alejandro Gómez Castro
=======================

🎯 Next-Gen Web3 Open Source Developer
📍 Based in Colombia
🌐 Passionate about blockchain and decentralized systems

Background:
• 10+ years in software development
• Specialized in Web3, React, and modern web technologies
• Winner of Starknet Hackathon 2025 (2nd Place) - BlockBeats 3.0
• Enterprise experience with Stellar Nexus Experience
• Published technical articles and guides
• Active open source contributor

Current Focus:
• Web3 Development & Smart Contracts
• DeFi Protocol Design
• Cross-chain Interoperability
• AI Integration in Web3
• Community Building & Education

Vision: Become a Web3 Founder and build innovative decentralized solutions`,

    projects: () => `Web3 Projects:
================
• BlockBeats 3.0 - Starknet Hackathon Winner
  - Cairo smart contracts for music NFTs
  - Trustless music streaming platform
  - 2nd Place in Starknet Hackathon 2025
  - Live on Starknet mainnet

        • CVx Portfolio v2.0
  - Interactive developer console
  - AI-powered assistant integration
  - Nexus Simulate Web3 scenarios
  - Custom cursor effects & animations

• Stellar Nexus Experience
  - Enterprise blockchain solutions
  - Cross-chain interoperability
  - Production-grade DeFi applications

Web2 Projects:
==============
• E-commerce platforms
• SaaS applications  
• Mobile development
• API development and integration`,

    experience: () => `Work Experience:
==================
• Senior Full-Stack Developer (Current)
  - Web3 and blockchain development
  - React, TypeScript, Node.js
  - Smart contract development

• Enterprise Blockchain Developer
  - Stellar Nexus Experience
  - Cross-chain solutions
  - Production DeFi applications

• Open Source Contributor
  - Active in Web3 communities
  - Technical writing and documentation
  - Hackathon participation`,

    skills: () => `Technical Skills:
==================
Frontend:
• React, Next.js, TypeScript
• Tailwind CSS, Framer Motion
• Web3 integration (ethers.js, wagmi)

Backend:
• Node.js, Express, FastAPI
• PostgreSQL, MongoDB
• REST APIs, GraphQL

Blockchain:
• Solidity, Cairo (Starknet)
• Smart contract development
• DeFi protocols, NFTs
• Cross-chain interoperability

DevOps:
• Docker, AWS, Vercel
• CI/CD, Git, GitHub
• Testing frameworks`,

    contact: () => `Contact Information:
====================
📧 Email: josegomezdev@gmail.com
💼 LinkedIn: linkedin.com/in/josealejandrogomezcastro
🐙 GitHub: github.com/josegomez-dev
📱 Discord: Available for Web3 communities

Business Inquiries:
• Web3 project collaborations
• Smart contract development
• Technical consulting
• Open source contributions`,

    portfolio: () => `Portfolio Features:
==================
• Interactive Tree Maps - Visual project hierarchies
        • CVx Developer Console - This interactive terminal
• AI Assistant - Powered by HuggingFace models
• Nexus Simulate - Web3 scenario simulations
• Custom Cursor Effects - Enhanced user experience
• Responsive Design - Works on all devices
• Dark Theme - Modern developer aesthetic
• Typewriter Animations - Dynamic text effects

Built with Next.js, React, TypeScript, and TailwindCSS`,

    nexus: () => `Nexus Simulate:
===============
• Interactive Web3 Development Simulations
• 5 Different Scenarios Available:
  - Web3 Startup Launch
  - DeFi Protocol Development
  - DAO Governance Model
  - NFT Marketplace
  - Cross-Chain Bridge
• Real-time Progress Tracking
• Step-by-step Guidance
• AI-Powered Insights
• Access via right-side floating button

Experience the future of Web3 development!`,

    assistant: () => `AI Assistant Features:
=====================
• Powered by HuggingFace Open Source Models
• Free AI-powered guidance
• Web3 opportunities & career advice
• Quick business proposals & project ideas
• Personalized development guidance
• Real-time responses
• Access via right-side floating button
• No API costs - completely free

Ask anything about Web3, development, or career advice!`,

    clear: () => {
      setMessages([{
        id: Date.now().toString(),
        type: 'info',
        content: 'Console cleared. Type "help" to see available commands.',
        timestamp: new Date()
      }]);
      return null;
    },

    exit: () => {
      onClose();
      return null;
    }
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const response = commands[cmd as keyof typeof commands];

    if (response) {
      const result = response();
      if (result) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'output',
          content: result,
          timestamp: new Date()
        }]);
      }
    } else {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'error',
        content: `Command not found: ${cmd}\nType 'help' to see available commands.`,
        timestamp: new Date()
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add input to messages
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'input',
      content: input,
      timestamp: new Date()
    }]);

    // Add to history
    setInputHistory(prev => [...prev, input]);
    setHistoryIndex(-1);

    // Process command
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < inputHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[inputHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(inputHistory[inputHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

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
            className="w-full max-w-4xl h-auto max-h-[80vh] bg-black/95 border border-green-500/30 rounded-lg font-mono shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-green-500/30">
              <div className="flex items-center space-x-3">
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">CVx Developer Console</span>
                <span className="text-green-400/60 text-sm">v2.0.0</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-green-500/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-green-400" />
              </button>
            </div>

            {/* Console Output */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-2 text-green-400 text-xs custom-scrollbar" 
              style={{ 
                maxHeight: '400px',
                minHeight: '300px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#10b981 #1f2937'
              }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`${
                    message.type === 'input' ? 'text-green-300' :
                    message.type === 'error' ? 'text-red-400' :
                    message.type === 'info' ? 'text-blue-400' :
                    'text-green-400'
                  }`}
                >
                  {message.type === 'input' && (
                    <div className="flex items-center space-x-2 mb-1">
                      <ChevronRight className="w-3 h-3 text-green-500" />
                      <span className="text-green-300 text-xs">{message.content}</span>
                    </div>
                  )}
                  <div 
                    className="whitespace-pre-wrap ml-6"
                    dangerouslySetInnerHTML={{
                      __html: (message.type === 'output' && message.content.includes('Available Commands:')) || 
                              (message.type === 'info' && message.content.includes('Welcome to CVx'))
                        ? formatHelpText(message.content)
                        : message.content
                    }}
                  />
                  {message.type !== 'input' && (
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-green-400/40 text-xs">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      <button
                        onClick={() => copyToClipboard(message.content, message.id)}
                        className="p-1 hover:bg-green-500/10 rounded transition-colors"
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-green-400/60" />
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-green-500/20 bg-black/50 flex-shrink-0">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4 text-green-400/60">
                  <span className="flex items-center space-x-1">
                    <Terminal className="w-3 h-3" />
                    <span>CVx v2.0.0</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ExternalLink className="w-3 h-3" />
                    <span>Ready</span>
                  </span>
                  <span className="text-green-400/40">
                    {messages.length} messages
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCommand('help')}
                    className="px-2 py-1 text-xs bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded transition-colors"
                  >
                    Help
                  </button>
                  <button
                    onClick={() => handleCommand('clear')}
                    className="px-2 py-1 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-green-500/30 flex-shrink-0">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <ChevronRight className="w-3 h-3 text-green-500 flex-shrink-0" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent border-none outline-none text-green-300 placeholder-green-400/40 text-xs"
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
