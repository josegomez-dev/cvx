'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, description, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`mb-16 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="container mx-auto max-w-6xl">        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}
