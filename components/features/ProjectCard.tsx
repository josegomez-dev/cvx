'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Play, Globe, FileText } from 'lucide-react'
import { Badge } from '../ui/Badge'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  links: Array<{ label: string; url: string }>
  demoVideo?: string
  liveApp?: string
  docs?: string
  githubRepo?: string
  company?: string
  role?: string
  year?: number
  variant?: 'primary' | 'secondary' | 'default' | 'personal'
}

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  links, 
  demoVideo,
  liveApp,
  docs,
  githubRepo,
  company,
  role,
  year,
  variant = 'default' 
}: ProjectCardProps) {
  const variantColors = {
    primary: 'primary',
    secondary: 'secondary',
    default: 'primary',
    personal: 'arts-primary'
  }

  const color = variantColors[variant]

  return (
    <motion.div
      className="card card-hover p-6 relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Company Badge */}
      {company && (
        <div className="absolute top-4 right-4">
          <motion.div 
            className="inline-flex items-center px-2 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-medium cursor-pointer"
            whileHover={{ 
              scale: 1.1,
              y: -2,
              rotateZ: 2,
              boxShadow: "0 8px 20px -4px rgba(0, 229, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10 
            }}
          >
            {company}
          </motion.div>
        </div>
      )}
      
      {/* Role Badge */}
      {role && (
        <div className="absolute bottom-4 right-4">
          <motion.div 
            className="inline-flex items-center px-2 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs font-medium cursor-pointer"
            whileHover={{ 
              scale: 1.1,
              y: -2,
              rotateZ: 2,
              boxShadow: "0 8px 20px -4px rgba(155, 92, 255, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10 
            }}
          >
            {role}
          </motion.div>
        </div>
      )}
      
      {/* Year Badge */}
      {year && (
        <div className="absolute top-4 left-4">
          <motion.div 
            className="inline-flex items-center px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium cursor-pointer"
            whileHover={{ 
              scale: 1.1,
              y: -2,
              rotateZ: 2,
              boxShadow: "0 8px 20px -4px rgba(255, 255, 255, 0.2)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10 
            }}
          >
            {year}
          </motion.div>
        </div>
      )}
      
      <h3 className={`text-lg font-bold text-${color} mb-3 ${company ? 'pr-20' : ''} ${year ? 'pl-16' : ''}`}>
        {title}
      </h3>
      <p className="dark:text-white/70 light:text-gray-600 mb-4 text-sm">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <Badge 
            key={index} 
            variant={variant} 
            size="sm"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {demoVideo && (
          <motion.a
            href={demoVideo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-all duration-200 text-xs font-medium cursor-pointer border border-primary/30 hover:border-primary/50"
          >
            <Play className="h-3 w-3" />
            <span>Demo</span>
          </motion.a>
        )}
        {liveApp && (
          <motion.a
            href={liveApp}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-all duration-200 text-xs font-medium cursor-pointer border border-secondary/30 hover:border-secondary/50"
          >
            <Globe className="h-3 w-3" />
            <span>Live App</span>
          </motion.a>
        )}
        {docs && (
          <motion.a
            href={docs}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all duration-200 text-xs font-medium cursor-pointer border border-accent/30 hover:border-accent/50"
          >
            <FileText className="h-3 w-3" />
            <span>Docs</span>
          </motion.a>
        )}
        {githubRepo && (
          <motion.a
            href={githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-arts-primary/20 text-arts-primary hover:bg-arts-primary/30 transition-all duration-200 text-xs font-medium cursor-pointer border border-arts-primary/30 hover:border-arts-primary/50"
          >
            <Github className="h-3 w-3" />
            <span>Repo</span>
          </motion.a>
        )}
        {links.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white/80 hover:bg-white/20 transition-all duration-200 text-xs font-medium cursor-pointer border border-white/20 hover:border-white/30"
          >
            <span>{link.label}</span>
            <ExternalLink className="h-3 w-3" />
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}
