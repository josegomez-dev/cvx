'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Brain, Zap, MessageCircle, Copy, Check } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'error';
  content: string;
  timestamp: Date;
  aiProvider?: string;
  errorDetails?: string;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Business Assistant. I can help you with:\n\n🚀 **Business Opportunities** - Find Web3 projects and collaborations\n💼 **Career Growth** - Connect with potential employers and mentors\n🤝 **Networking** - Discover relevant communities and events\n💡 **Innovation** - Brainstorm new project ideas and solutions\n\nHow can I assist you today?",
      timestamp: new Date(),
      aiProvider: 'Business AI'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAI, setSelectedAI] = useState('huggingface');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const aiProviders = [
    { 
      id: 'huggingface', 
      name: 'HuggingFace', 
      icon: Brain, 
      color: 'text-blue-400',
      description: 'Free open-source models',
      model: 'DialoGPT-medium',
      available: true
    },
    { 
      id: 'openai', 
      name: 'OpenAI GPT', 
      icon: Sparkles, 
      color: 'text-green-400',
      description: 'Advanced language model',
      model: 'GPT-3.5 (simulated)',
      available: false,
      comingSoon: true
    },
    { 
      id: 'anthropic', 
      name: 'Claude', 
      icon: Zap, 
      color: 'text-purple-400',
      description: 'AI safety focused',
      model: 'Claude (simulated)',
      available: false,
      comingSoon: true
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const selectedProvider = aiProviders.find(p => p.id === selectedAI);
    if (!selectedProvider?.available) {
      const errorResponse: Message = {
        id: Date.now().toString(),
        type: 'error',
        content: `🚫 **Provider Not Available**\n\n${selectedProvider?.name} is coming soon!\n\n**Available Now:**\n• HuggingFace - Free open-source models\n\n**Coming Soon:**\n• OpenAI GPT - Advanced language model\n• Claude - AI safety focused\n\nPlease select HuggingFace to get started.`,
        timestamp: new Date(),
        aiProvider: selectedProvider?.name,
        errorDetails: 'Provider not available'
      };
      setMessages(prev => [...prev, errorResponse]);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          provider: selectedAI
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      // Only show response if it's not a fallback (real AI response)
      if (data.response && !data.response.includes('fallback') && !data.response.includes('All models failed')) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: data.response,
          timestamp: new Date(),
          aiProvider: aiProviders.find(p => p.id === selectedAI)?.name
        };
        setMessages(prev => [...prev, aiResponse]);
      } else {
        // Show error message with details
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: `🚫 **HuggingFace Connection Failed**\n\nI cannot provide AI responses until we successfully connect to HuggingFace models.\n\n**Error Details:**\n${data.error || 'All models failed to connect'}\n\n**Next Steps:**\n1. Check your API key in .env.local\n2. Verify internet connection\n3. Try again in a moment`,
          timestamp: new Date(),
          aiProvider: aiProviders.find(p => p.id === selectedAI)?.name,
          errorDetails: data.error || 'Connection failed'
        };
        setMessages(prev => [...prev, errorResponse]);
      }
    } catch (error) {
      console.error('AI API Error:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: `🚫 **Connection Error**\n\nFailed to connect to AI service.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**Please check:**\n• Internet connection\n• API key configuration\n• Server status`,
        timestamp: new Date(),
        aiProvider: aiProviders.find(p => p.id === selectedAI)?.name,
        errorDetails: error instanceof Error ? error.message : 'Unknown error'
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-white/60 text-sm">Powered by {aiProviders.find(p => p.id === selectedAI)?.name}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* AI Provider Selector */}
            <div className="p-4 border-b border-white/20">
              <div className="space-y-3">
                <div className="flex space-x-2">
                  {aiProviders.map((provider) => {
                    const Icon = provider.icon;
                    return (
                      <button
                        key={provider.id}
                        onClick={() => provider.available && setSelectedAI(provider.id)}
                        disabled={!provider.available}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 relative ${
                          selectedAI === provider.id
                            ? 'bg-white/20 text-white'
                            : provider.available
                            ? 'bg-white/5 text-white/60 hover:bg-white/10'
                            : 'bg-white/5 text-white/30 cursor-not-allowed opacity-50'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${provider.color}`} />
                        <span className="text-sm font-medium">{provider.name}</span>
                        {provider.comingSoon && (
                          <motion.span 
                            className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded-full font-bold cursor-pointer"
                            whileHover={{ 
                              scale: 1.2,
                              rotateZ: 5,
                              boxShadow: "0 4px 12px -2px rgba(255, 193, 7, 0.4)"
                            }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 500, 
                              damping: 15 
                            }}
                          >
                            SOON
                          </motion.span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs text-white/60">
                  <span className="font-medium">Current Model:</span> {aiProviders.find(p => p.id === selectedAI)?.model}
                  {selectedAI === 'huggingface' && (
                    <span className="ml-2 text-green-400">✓ Free & Open Source</span>
                  )}
                  {aiProviders.find(p => p.id === selectedAI)?.comingSoon && (
                    <span className="ml-2 text-yellow-400">⚠️ Coming Soon</span>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : message.type === 'error'
                        ? 'bg-red-500/20 backdrop-blur-sm text-white border border-red-500/30'
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    }`}
                  >
                    {message.type === 'ai' && message.aiProvider && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-white/60">{message.aiProvider}</span>
                      </div>
                    )}
                    {message.type === 'error' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Bot className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-red-400 font-medium">Connection Error</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-white/40">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {(message.type === 'ai' || message.type === 'error') && (
                        <button
                          onClick={() => copyToClipboard(message.content, message.id)}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          {copiedId === message.id ? (
                            <Check className="w-3 h-3 text-green-400" />
                          ) : (
                            <Copy className="w-3 h-3 text-white/60" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={aiProviders.find(p => p.id === selectedAI)?.available 
                    ? "Ask about Web3 opportunities, career advice, or project ideas..." 
                    : "This provider is coming soon. Select HuggingFace to get started."}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors"
                  disabled={isLoading || !aiProviders.find(p => p.id === selectedAI)?.available}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading || !aiProviders.find(p => p.id === selectedAI)?.available}
                  className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
