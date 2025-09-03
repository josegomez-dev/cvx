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

interface DeveloperConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeveloperConsole({ isOpen, onClose }: DeveloperConsoleProps) {
  const [messages, setMessages] = useState<ConsoleMessage[]>([
    {
      id: '1',
      type: 'info',
      content: `Welcome to José's CVX Developer Console v1.0.0
      
Available commands:
• help - Show all available commands
• about - About José's background and skills
• projects - List Web3 and Web2 projects
• experience - Work experience and achievements
• skills - Technical skills and expertise
• contact - Contact information and social links
• clear - Clear console
• exit - Close console

Type 'help' for more information.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);

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

  const commands = {
    help: () => `Available Commands:
• about - About José's background and skills
• projects - List Web3 and Web2 projects  
• experience - Work experience and achievements
• skills - Technical skills and expertise
• contact - Contact information and social links
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
• Winner of Starknet Hackathon 2025 (2nd Place)
• Enterprise experience with Stellar Nexus Experience
• Published technical articles and guides

Vision: Become a Web3 Founder and build innovative decentralized solutions`,

    projects: () => `Web3 Projects:
================
• BlockBeats 3.0 - Starknet Hackathon Winner
  - Cairo smart contracts for music NFTs
  - Trustless music streaming platform
  - 2nd Place in Starknet Hackathon 2025

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
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black/90 border border-green-500/30 rounded-lg w-full max-w-4xl h-[600px] flex flex-col shadow-2xl font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-green-500/30">
              <div className="flex items-center space-x-3">
                <Terminal className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-semibold">CVX Developer Console</span>
                <span className="text-green-400/60 text-sm">v1.0.0</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-green-500/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-green-400" />
              </button>
            </div>

            {/* Console Output */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-green-400 text-sm">
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
                      <ChevronRight className="w-4 h-4 text-green-500" />
                      <span className="text-green-300">{message.content}</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap ml-6">
                    {message.content}
                  </div>
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

            {/* Input */}
            <div className="p-4 border-t border-green-500/30">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-green-500 flex-shrink-0" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent border-none outline-none text-green-300 placeholder-green-400/40"
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
