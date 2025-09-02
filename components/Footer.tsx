'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, ExternalLink, Heart } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com/josegomez-dev', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/ale-gomez', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://medium.com/@alegomez', icon: ExternalLink, label: 'Medium' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-base-surface/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Bio */}
          <div className="text-center md:text-left">
                    <p className="text-white/60 text-sm">
          Next-Gen Web3 Open Source Developer
        </p>
            <p className="text-white/40 text-xs mt-1">
              Bridging technology and culture through innovation
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-white/40 hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-1 text-white/40 text-xs">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-3 w-3 text-arts-primary" />
            </motion.div>
            <span>by José Alejandro Gómez Castro</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
