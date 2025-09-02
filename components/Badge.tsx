'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'default' | 'personal'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variantClasses = {
    primary: 'bg-primary/20 text-primary border border-primary/30',
    secondary: 'bg-secondary/20 text-secondary border border-secondary/30',
    accent: 'bg-accent/20 text-accent border border-accent/30',
    default: 'bg-white/10 text-white/80 border border-white/20',
    personal: 'bg-arts-primary/20 text-arts-primary border border-arts-primary/30',
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }

  return (
    <motion.span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.span>
  )
}
