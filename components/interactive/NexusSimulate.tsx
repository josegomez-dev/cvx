'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, RotateCcw, Settings, Zap, TrendingUp, Users, Code, Rocket, Target, Lightbulb } from 'lucide-react';

interface SimulationState {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'paused' | 'completed';
  progress: number;
  results: any[];
  timestamp: Date;
}

interface NexusSimulateProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NexusSimulate({ isOpen, onClose }: NexusSimulateProps) {
  const [activeTab, setActiveTab] = useState('scenarios');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenarios = [
    {
      id: 'web3-startup',
      name: '🚀 Web3 Startup Launch',
      description: 'Simulate launching a Web3 startup from idea to MVP',
      duration: '5-10 min',
      difficulty: 'Medium',
      tags: ['Startup', 'Web3', 'MVP']
    },
    {
      id: 'defi-protocol',
      name: '💰 DeFi Protocol Development',
      description: 'Design and simulate a DeFi protocol with tokenomics',
      duration: '8-15 min',
      difficulty: 'Hard',
      tags: ['DeFi', 'Smart Contracts', 'Tokenomics']
    },
    {
      id: 'dao-governance',
      name: '🏛️ DAO Governance Model',
      description: 'Create and test a DAO governance structure',
      duration: '6-12 min',
      difficulty: 'Medium',
      tags: ['DAO', 'Governance', 'Voting']
    },
    {
      id: 'nft-marketplace',
      name: '🎨 NFT Marketplace',
      description: 'Build an NFT marketplace with royalty systems',
      duration: '7-13 min',
      difficulty: 'Medium',
      tags: ['NFT', 'Marketplace', 'Royalties']
    },
    {
      id: 'cross-chain-bridge',
      name: '🌉 Cross-Chain Bridge',
      description: 'Design a cross-chain bridge for asset transfers',
      duration: '10-18 min',
      difficulty: 'Hard',
      tags: ['Cross-Chain', 'Bridge', 'Security']
    }
  ];

  const tabs = [
    { id: 'scenarios', name: 'Scenarios', icon: Target },
    { id: 'simulation', name: 'Simulation', icon: Play },
    { id: 'results', name: 'Results', icon: TrendingUp },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [simulationState]);

  const startSimulation = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    setSelectedScenario(scenarioId);
    setActiveTab('simulation');
    
    const newState: SimulationState = {
      id: Date.now().toString(),
      name: scenario.name,
      description: scenario.description,
      status: 'running',
      progress: 0,
      results: [],
      timestamp: new Date()
    };

    setSimulationState(newState);
    setIsRunning(true);
    
    // Simulate progress
    const interval = setInterval(() => {
      setSimulationState(prev => {
        if (!prev || prev.progress >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return prev ? { ...prev, status: 'completed', progress: 100 } : null;
        }
        return { ...prev, progress: prev.progress + (10 * speed) };
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const pauseSimulation = () => {
    setSimulationState(prev => prev ? { ...prev, status: 'paused' } : null);
    setIsRunning(false);
  };

  const resumeSimulation = () => {
    setSimulationState(prev => prev ? { ...prev, status: 'running' } : null);
    setIsRunning(true);
  };

  const resetSimulation = () => {
    setSimulationState(null);
    setSelectedScenario(null);
    setIsRunning(false);
    setActiveTab('scenarios');
  };

  const getSimulationSteps = (scenarioId: string) => {
    const steps = {
      'web3-startup': [
        '🔍 Market Research & Analysis',
        '💡 Ideation & Problem Definition',
        '👥 Team Formation & Roles',
        '📊 Business Model Canvas',
        '🔧 MVP Development Planning',
        '💰 Funding Strategy',
        '🚀 Launch Strategy',
        '📈 Growth Metrics & KPIs'
      ],
      'defi-protocol': [
        '📋 Protocol Specification',
        '🔐 Security Architecture',
        '💰 Tokenomics Design',
        '⚡ Smart Contract Development',
        '🧪 Testing & Auditing',
        '🌐 Frontend Development',
        '🚀 Mainnet Deployment',
        '📊 TVL & User Acquisition'
      ],
      'dao-governance': [
        '🏛️ Governance Structure Design',
        '🗳️ Voting Mechanisms',
        '💰 Treasury Management',
        '👥 Member Onboarding',
        '📋 Proposal Framework',
        '🔐 Security Measures',
        '🌐 Community Building',
        '📈 Governance Metrics'
      ],
      'nft-marketplace': [
        '🎨 NFT Standards Selection',
        '🏪 Marketplace Architecture',
        '💰 Royalty System Design',
        '🔐 Smart Contract Development',
        '🎨 Frontend & UX Design',
        '🧪 Testing & Quality Assurance',
        '🚀 Platform Launch',
        '📊 Trading Volume & Metrics'
      ],
      'cross-chain-bridge': [
        '🌉 Bridge Architecture Design',
        '🔐 Security Protocol Development',
        '⚡ Cross-Chain Communication',
        '💰 Liquidity Pool Setup',
        '🧪 Security Auditing',
        '🌐 Multi-Chain Integration',
        '🚀 Bridge Deployment',
        '📊 Volume & Security Metrics'
      ]
    };
    return steps[scenarioId as keyof typeof steps] || [];
  };

  const getCurrentStep = (progress: number, steps: string[]) => {
    const stepIndex = Math.floor((progress / 100) * steps.length);
    return steps[Math.min(stepIndex, steps.length - 1)];
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-transparent w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20 bg-black/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Nexus Simulate</h3>
              <p className="text-white/60 text-sm">Interactive Web3 Development Simulations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white border-b-2 border-orange-500'
                    : 'text-white/60 hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-black/20 overflow-y-auto w-full" style={{maxHeight: '500px', minHeight: '300px', overflowX: 'hidden' }}>
          {/* Scenarios Tab */}
          {activeTab === 'scenarios' && (
            <div className="h-full" >
              <div className="p-6">
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">Choose a Simulation Scenario</h4>
                <p className="text-white/60 text-sm">Select a Web3 development scenario to simulate and learn from</p>
              </div>
              <div className="grid gap-4 ">
                {scenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                    onClick={() => startSimulation(scenario.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="text-white font-semibold mb-2">{scenario.name}</h5>
                        <p className="text-white/60 text-sm mb-3">{scenario.description}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <span className="text-white/40">⏱️ {scenario.duration}</span>
                          <span className="text-white/40">📊 {scenario.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {scenario.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              </div>
            </div>
          )}

          {/* Simulation Tab */}
          {activeTab === 'simulation' && simulationState && (
            <div className="h-full overflow-y-auto">
              <div className="p-6">
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">{simulationState.name}</h4>
                <p className="text-white/60 text-sm">{simulationState.description}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Progress</span>
                  <span className="text-white font-semibold">{Math.round(simulationState.progress)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${simulationState.progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Current Step */}
              <div className="mb-6">
                <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                  <h5 className="text-white font-semibold mb-2">Current Step</h5>
                  <p className="text-orange-400 font-medium">
                    {getCurrentStep(simulationState.progress, getSimulationSteps(selectedScenario!))}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4 mb-6">
                {isRunning ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={pauseSimulation}
                    className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-lg"
                  >
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resumeSimulation}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/30 rounded-lg"
                  >
                    <Play className="w-4 h-4" />
                    <span>Resume</span>
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetSimulation}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </motion.button>
              </div>

              {/* All Steps */}
              <div>
                <h5 className="text-white font-semibold mb-3">Simulation Steps</h5>
                <div className="space-y-2">
                  {getSimulationSteps(selectedScenario!).map((step, index) => {
                    const stepProgress = (index / (getSimulationSteps(selectedScenario!).length - 1)) * 100;
                    const isCompleted = simulationState.progress >= stepProgress;
                    const isCurrent = Math.abs(simulationState.progress - stepProgress) < 10;
                    
                    return (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          isCompleted
                            ? 'bg-green-500/10 border border-green-500/30'
                            : isCurrent
                            ? 'bg-orange-500/10 border border-orange-500/30'
                            : 'bg-white/5 border border-white/20'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : isCurrent
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/20 text-white/40'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <span className={`text-sm ${
                          isCompleted
                            ? 'text-green-300'
                            : isCurrent
                            ? 'text-orange-300'
                            : 'text-white/60'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              </div>
            </div>
          )}

          {/* Results Tab */}
          {activeTab === 'results' && simulationState && (
            <div className="h-full overflow-y-auto">
              <div className="p-6">
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">Simulation Results</h4>
                <p className="text-white/60 text-sm">Analysis and insights from your simulation</p>
              </div>

              {simulationState.status === 'completed' ? (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                    <h5 className="text-white font-semibold mb-3">📊 Summary</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">100%</div>
                        <div className="text-white/60 text-sm">Completion</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">8</div>
                        <div className="text-white/60 text-sm">Steps Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                    <h5 className="text-white font-semibold mb-3">💡 Key Insights</h5>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5" />
                        <div>
                          <h6 className="text-white font-medium">Market Research is Critical</h6>
                          <p className="text-white/60 text-sm">Understanding your target audience and competition is essential for success</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Users className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <h6 className="text-white font-medium">Team Building</h6>
                          <p className="text-white/60 text-sm">Assemble a diverse team with complementary skills and shared vision</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Code className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <h6 className="text-white font-medium">MVP Development</h6>
                          <p className="text-white/60 text-sm">Focus on core features first, iterate based on user feedback</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                    <h5 className="text-white font-semibold mb-3">🚀 Next Steps</h5>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Rocket className="w-4 h-4 text-orange-400" />
                        <span className="text-white/80 text-sm">Implement the MVP based on simulation insights</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-white/80 text-sm">Track key metrics and iterate on the strategy</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span className="text-white/80 text-sm">Build community and gather user feedback</span>
                      </div>
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                    <h5 className="text-white font-semibold mb-3">🎯 What's Next?</h5>
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          resetSimulation();
                          setActiveTab('scenarios');
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 rounded-xl transition-all duration-200 text-white font-medium"
                      >
                        <Target className="w-5 h-5 text-green-400" />
                        <span>Try Another Scenario</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          resetSimulation();
                          onClose();
                        }}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/30 rounded-xl transition-all duration-200 text-white font-medium"
                      >
                        <Rocket className="w-5 h-5 text-blue-400" />
                        <span>Close & Continue Browsing</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white/40" />
                  </div>
                  <p className="text-white/60">Complete a simulation to see results</p>
                </div>
              )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="h-full overflow-y-auto">
              <div className="p-6">
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">Simulation Settings</h4>
                <p className="text-white/60 text-sm">Customize your simulation experience</p>
              </div>

              <div className="space-y-6">
                {/* Speed Control */}
                <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                  <h5 className="text-white font-semibold mb-3">⚡ Simulation Speed</h5>
                  <div className="flex items-center space-x-4">
                    <span className="text-white/60 text-sm">Speed:</span>
                    <select
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                    >
                      <option value={0.5}>0.5x (Slow)</option>
                      <option value={1}>1x (Normal)</option>
                      <option value={2}>2x (Fast)</option>
                      <option value={3}>3x (Very Fast)</option>
                    </select>
                  </div>
                </div>

                {/* Preferences */}
                <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                  <h5 className="text-white font-semibold mb-3">⚙️ Preferences</h5>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                      <span className="text-white/80 text-sm">Show detailed step descriptions</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                      <span className="text-white/80 text-sm">Auto-save simulation progress</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded bg-white/10 border-white/20" />
                      <span className="text-white/80 text-sm">Show real-time metrics</span>
                    </label>
                  </div>
                </div>

                {/* About */}
                <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                  <h5 className="text-white font-semibold mb-3">ℹ️ About Nexus Simulate</h5>
                  <p className="text-white/60 text-sm mb-3">
                    Nexus Simulate provides interactive simulations for Web3 development scenarios, 
                    helping you learn and practice real-world project management and decision-making.
                  </p>
                  <div className="text-xs text-white/40">
                    Version 1.0.0 • Powered by CVx Portfolio
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
