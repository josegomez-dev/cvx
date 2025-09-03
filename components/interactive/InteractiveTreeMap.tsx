'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Search, Filter, ChevronRight, ChevronDown, ExternalLink, Github, Globe, Award, BookOpen, Code, Music, Brain, Zap, Users, Target, Rocket, MapPin, Calendar, Heart, Star } from 'lucide-react';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background, 
  MiniMap, 
  NodeTypes,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  EdgeTypes
} from 'reactflow';
import 'reactflow/dist/style.css';

interface TreeNode {
  id: string;
  label: string;
  description: string;
  category: 'tech' | 'arts' | 'crossover' | 'experience' | 'skills' | 'projects' | 'achievements' | 'timeline';
  icon?: string;
  links?: Array<{
    label: string;
    url: string;
    type: 'internal' | 'external';
  }>;
  children?: string[];
  level: number;
  x: number;
  y: number;
}

interface InteractiveTreeMapProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'overview' | 'projects' | 'competitions' | 'blog' | 'journey' | 'achievements' | 'interests' | 'timeline';
}

// Custom Node Component
const CustomNode = ({ data }: { data: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (category: string) => {
    switch (category) {
      case 'tech': return <Code className="w-4 h-4" />;
      case 'arts': return <Music className="w-4 h-4" />;
      case 'crossover': return <Brain className="w-4 h-4" />;
      case 'experience': return <Users className="w-4 h-4" />;
      case 'skills': return <Target className="w-4 h-4" />;
      case 'projects': return <Globe className="w-4 h-4" />;
      case 'achievements': return <Award className="w-4 h-4" />;
      case 'timeline': return <Calendar className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tech': return 'border-blue-500 bg-blue-500/10 text-blue-400';
      case 'arts': return 'border-purple-500 bg-purple-500/10 text-purple-400';
      case 'crossover': return 'border-green-500 bg-green-500/10 text-green-400';
      case 'experience': return 'border-orange-500 bg-orange-500/10 text-orange-400';
      case 'skills': return 'border-cyan-500 bg-cyan-500/10 text-cyan-400';
      case 'projects': return 'border-indigo-500 bg-indigo-500/10 text-indigo-400';
      case 'achievements': return 'border-yellow-500 bg-yellow-500/10 text-yellow-400';
      case 'timeline': return 'border-pink-500 bg-pink-500/10 text-pink-400';
      default: return 'border-gray-500 bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <motion.div
      className={`relative p-4 rounded-xl border-2 backdrop-blur-sm min-w-[200px] max-w-[300px] cursor-pointer transition-all duration-300 ${getCategoryColor(data.category)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        zIndex: 10
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: isHovered 
          ? "0 15px 40px rgba(0, 0, 0, 0.4)" 
          : "0 5px 15px rgba(0, 0, 0, 0.2)"
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getIcon(data.category)}
          <h3 className="font-semibold text-sm">{data.label}</h3>
        </div>
        {data.children && data.children.length > 0 && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </motion.button>
        )}
      </div>

      {/* Description */}
      <p className="text-xs opacity-80 mb-3 line-clamp-2">{data.description}</p>

      {/* Links */}
      {data.links && data.links.length > 0 && (
        <div className="space-y-1">
          {data.links.slice(0, 2).map((link: any, index: number) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-xs opacity-70 hover:opacity-100 transition-opacity"
              whileHover={{ x: 2 }}
            >
              <ExternalLink className="w-3 h-3" />
              <span>{link.label}</span>
            </motion.a>
          ))}
          {data.links.length > 2 && (
            <span className="text-xs opacity-50">+{data.links.length - 2} more</span>
          )}
        </div>
      )}

      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-2xl max-w-xs z-50"
          >
            <div className="text-white text-xs">
              <div className="font-semibold mb-1">{data.label}</div>
              <div className="opacity-80">{data.description}</div>
              {data.links && data.links.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/20">
                  <div className="text-xs opacity-60 mb-1">Quick Links:</div>
                  {data.links.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

export default function InteractiveTreeMap({ isOpen, onClose, activeTab }: InteractiveTreeMapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Compact tree data based on active tab
  const getTreeData = (tab: string) => {
    switch (tab) {
      case 'overview':
        return {
          nodes: [
            // Tech Overview - Compact and focused
            {
              id: 'tech-overview',
              label: 'José Alejandro Gómez Castro',
              description: 'Next-Gen Web3 Open Source Developer',
              category: 'crossover',
              level: 0,
              x: 400,
              y: 100,
              children: ['core-skills', 'key-projects', 'achievements']
            },
            {
              id: 'core-skills',
              label: 'Core Technical Skills',
              description: 'Full-Stack Web3 Development',
              category: 'tech',
              level: 1,
              x: 220,
              y: 250,
              children: ['frontend', 'backend', 'web3']
            },
            {
              id: 'key-projects',
              label: 'Key Projects',
              description: 'Innovative Web3 Solutions',
              category: 'projects',
              level: 1,
              x: 640,
              y: 250,
              children: ['blockbeats', 'defi-protocol', 'enterprise']
            },
            {
              id: 'achievements',
              label: 'Major Achievements',
              description: 'Recognition & Innovation',
              category: 'achievements',
              level: 1,
              x: 1080,
              y: 250,
              children: ['hackathon-winner', 'ethereum-builder', 'open-source']
            },
            {
              id: 'frontend',
              label: 'Frontend Mastery',
              description: 'React, Next.js, TypeScript',
              category: 'skills',
              level: 2,
              x: 80,
              y: 380,
              links: [
                { label: 'GitHub', url: process.env.NEXT_PUBLIC_GITHUB_URL || '#', type: 'external' }
              ]
            },
            {
              id: 'backend',
              label: 'Backend Expertise',
              description: 'Firebase, MongoDB, Node.js',
              category: 'skills',
              level: 2,
              x: 220,
              y: 520
            },
            {
              id: 'web3',
              label: 'Web3 Technologies',
              description: 'Solidity, Cairo, Stellar SDK',
              category: 'skills',
              level: 2,
              x: 360,
              y: 380,
              links: [
                { label: 'Ethereum Speedrun', url: process.env.NEXT_PUBLIC_ETHEREUM_BUILDER_URL || '#', type: 'external' }
              ]
            },
            {
              id: 'blockbeats',
              label: 'BlockBeats 3.0',
              description: 'Starknet Hackathon Winner',
              category: 'achievements',
              level: 2,
              x: 500,
              y: 520
            },
            {
              id: 'defi-protocol',
              label: 'DeFi Protocol',
              description: 'Decentralized Finance Platform',
              category: 'projects',
              level: 2,
              x: 640,
              y: 380
            },
            {
              id: 'enterprise',
              label: 'Enterprise Solutions',
              description: 'Large-Scale Business Platforms',
              category: 'projects',
              level: 2,
              x: 780,
              y: 520
            },
            {
              id: 'hackathon-winner',
              label: 'Hackathon Winner',
              description: 'BlockBeats 3.0 - Second Place',
              category: 'achievements',
              level: 2,
              x: 920,
              y: 380
            },
            {
              id: 'ethereum-builder',
              label: 'Ethereum Builder',
              description: 'Recognized in Ethereum Ecosystem',
              category: 'achievements',
              level: 2,
              x: 1060,
              y: 520
            },
            {
              id: 'open-source',
              label: 'Open Source Contributor',
              description: 'Active Web3 Community Member',
              category: 'achievements',
              level: 2,
              x: 1200,
              y: 380
            }
          ],
          edges: [
            { id: 'e1', source: 'tech-overview', target: 'core-skills', type: 'smoothstep', style: { stroke: '#4ade80', strokeWidth: 4 } },
            { id: 'e2', source: 'tech-overview', target: 'key-projects', type: 'smoothstep', style: { stroke: '#4ade80', strokeWidth: 4 } },
            { id: 'e3', source: 'tech-overview', target: 'achievements', type: 'smoothstep', style: { stroke: '#4ade80', strokeWidth: 4 } },
            { id: 'e4', source: 'core-skills', target: 'frontend', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e5', source: 'core-skills', target: 'backend', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e6', source: 'core-skills', target: 'web3', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e7', source: 'key-projects', target: 'blockbeats', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e8', source: 'key-projects', target: 'defi-protocol', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e9', source: 'key-projects', target: 'enterprise', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e10', source: 'achievements', target: 'hackathon-winner', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e11', source: 'achievements', target: 'ethereum-builder', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e12', source: 'achievements', target: 'open-source', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } }
          ]
        };

      case 'journey':
        return {
          nodes: [
            // Biography Journey - Compact and focused
            {
              id: 'bio-journey',
              label: 'José Alejandro Gómez Castro',
              description: 'From Costa Rica to Web3 Founder',
              category: 'crossover',
              level: 0,
              x: 400,
              y: 100,
              children: ['roots', 'career-path', 'impact']
            },
            {
              id: 'roots',
              label: 'Costa Rican Roots',
              description: 'Music, Culture, Early Tech',
              category: 'experience',
              level: 1,
              x: 200,
              y: 250,
              children: ['costa-rica', 'music-awards', 'early-programming']
            },
            {
              id: 'career-path',
              label: 'Career Evolution',
              description: 'Web2 → Web3 → Founder',
              category: 'experience',
              level: 1,
              x: 640,
              y: 250,
              children: ['web2-developer', 'web3-pioneer', 'founder']
            },
            {
              id: 'impact',
              label: 'Cultural Impact',
              description: 'Music & Tech Innovation',
              category: 'crossover',
              level: 1,
              x: 1080,
              y: 250,
              children: ['cultural-preservation', 'tech-innovation', 'community']
            },
            {
              id: 'costa-rica',
              label: 'Costa Rica',
              description: 'Born and raised in beautiful landscapes',
              category: 'experience',
              level: 2,
              x: 80,
              y: 380
            },
            {
              id: 'music-awards',
              label: 'National Music Awards',
              description: '2013, 2015, 2024 Costa Rica',
              category: 'achievements',
              level: 2,
              x: 220,
              y: 520
            },
            {
              id: 'early-programming',
              label: 'Early Programming',
              description: 'Discovered coding at young age',
              category: 'tech',
              level: 2,
              x: 360,
              y: 380
            },
            {
              id: 'web2-developer',
              label: 'Web2 Developer',
              description: '2015-2022: Enterprise platforms',
              category: 'tech',
              level: 2,
              x: 500,
              y: 520
            },
            {
              id: 'web3-pioneer',
              label: 'Web3 Pioneer',
              description: '2022-2024: Blockchain innovation',
              category: 'tech',
              level: 2,
              x: 640,
              y: 380
            },
            {
              id: 'founder',
              label: 'Web3 Founder',
              description: '2024+: Building the future',
              category: 'experience',
              level: 2,
              x: 780,
              y: 520
            },
            {
              id: 'cultural-preservation',
              label: 'Cultural Preservation',
              description: 'Modern folkloric adaptations',
              category: 'arts',
              level: 2,
              x: 920,
              y: 380
            },
            {
              id: 'tech-innovation',
              label: 'Tech Innovation',
              description: 'Web3 development and open source',
              category: 'tech',
              level: 2,
              x: 1060,
              y: 520
            },
            {
              id: 'community',
              label: 'Community Building',
              description: 'Open source and education',
              category: 'experience',
              level: 2,
              x: 1200,
              y: 380
            }
          ],
          edges: [
            { id: 'e1', source: 'bio-journey', target: 'roots', type: 'smoothstep', style: { stroke: '#4ade80', strokeWidth: 4 } },
            { id: 'e2', source: 'bio-journey', target: 'career-path', type: 'smoothstep', style: { stroke: '#4ade80', strokeWidth: 4 } },
            { id: 'e3', source: 'bio-journey', target: 'impact', type: 'smoothstep', style: { stroke: '#4ade80', strokeWidth: 4 } },
            { id: 'e4', source: 'roots', target: 'costa-rica', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e5', source: 'roots', target: 'music-awards', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e6', source: 'roots', target: 'early-programming', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e7', source: 'career-path', target: 'web2-developer', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e8', source: 'career-path', target: 'web3-pioneer', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e9', source: 'career-path', target: 'founder', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e10', source: 'impact', target: 'cultural-preservation', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e11', source: 'impact', target: 'tech-innovation', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } },
            { id: 'e12', source: 'impact', target: 'community', type: 'smoothstep', style: { stroke: '#60a5fa', strokeWidth: 3 } }
          ]
        };

      default:
        return { nodes: [], edges: [] };
    }
  };

  // Initialize tree data when component mounts
  useEffect(() => {
    const treeData = getTreeData(activeTab);
    
    const reactFlowNodes: Node[] = treeData.nodes.map((node) => ({
      id: node.id,
      position: { x: node.x, y: node.y },
      data: { 
        label: node.label,
        description: node.description,
        category: node.category,
        links: node.links,
        children: node.children,
        level: node.level
      },
      type: 'custom',
      style: {
        width: 250,
        height: 'auto',
        minHeight: 120
      }
    }));

    const reactFlowEdges: Edge[] = treeData.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: edge.type,
      style: edge.style || { 
        stroke: '#666',
        strokeWidth: 2,
        strokeDasharray: '5,5'
      },
      animated: true
    }));

    setNodes(reactFlowNodes);
    setEdges(reactFlowEdges);
  }, [activeTab, setNodes, setEdges]);

  const handleConnect = (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setSelectedCategory(null);
    setSearchTerm('');
  };

  const handleDownload = () => {
    // Implementation for downloading tree as image
    console.log('Download tree as image');
  };

  const filteredNodes = nodes.filter(node => {
    const matchesSearch = searchTerm === '' || 
      node.data.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.data.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      node.data.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['tech', 'arts', 'crossover', 'experience', 'skills', 'projects', 'achievements', 'timeline'];

  const getTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Tech Skills & Projects Overview';
      case 'journey':
        return 'Personal Journey & Impact';
      default:
        return 'Interactive Tree Map';
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
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-full max-w-6xl h-[700px] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{getTitle()}</h3>
                  <p className="text-white/60 text-sm">Key Highlights & Impact</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-4">
                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-white/60" />
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value || null)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search */}
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search nodes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleZoomIn}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ZoomIn className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleZoomOut}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ZoomOut className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Tree Visualization */}
            <div className="flex-1 relative">
              <ReactFlow
                nodes={filteredNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={handleConnect}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.3, includeHiddenNodes: false }}
                attributionPosition="bottom-left"
                className="bg-transparent"
                style={{ background: 'transparent' }}
                defaultViewport={{ x: 0, y: 0, zoom: 0.7 }}
                minZoom={0.4}
                maxZoom={1.5}
              >
                <Background color="#666" gap={40} size={1} />
                <Controls className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg" />
                <MiniMap 
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg"
                  nodeColor="#666"
                  maskColor="rgba(0, 0, 0, 0.1)"
                  zoomable
                  pannable
                />
              </ReactFlow>
            </div>

            {/* Legend */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center justify-center space-x-6">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      category === 'tech' ? 'bg-blue-500' :
                      category === 'arts' ? 'bg-purple-500' :
                      category === 'crossover' ? 'bg-green-500' :
                      category === 'experience' ? 'bg-orange-500' :
                      category === 'skills' ? 'bg-cyan-500' :
                      category === 'projects' ? 'bg-indigo-500' :
                      category === 'achievements' ? 'bg-yellow-500' :
                      'bg-pink-500'
                    }`} />
                    <span className="text-white/60 text-xs capitalize">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
