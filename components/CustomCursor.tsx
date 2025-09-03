'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface CustomCursorProps {
  children: React.ReactNode
}

export function CustomCursor({ children }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isHoveringButton, setIsHoveringButton] = useState(false)
  const [isHoveringName, setIsHoveringName] = useState(false)
  const [isHoveringPhoto, setIsHoveringPhoto] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isTechPage = pathname === '/tech'

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for different hover states
      if (target.closest('.card') || target.closest('[data-cursor="card"]')) {
        setIsHovering(true)
      } else if (target.closest('.ai-button') || target.closest('[data-cursor="ai-button"]')) {
        setIsHoveringButton(true)
      } else if (target.closest('.name-text') || target.closest('[data-cursor="name"]')) {
        setIsHoveringName(true)
      } else if (target.closest('.profile-photo') || target.closest('[data-cursor="photo"]')) {
        setIsHoveringPhoto(true)
      } else if (target.closest('.tech-title') || target.closest('[data-cursor="tech-title"]')) {
        setIsHoveringName(true)
      } else if (target.closest('.tech-name') || target.closest('[data-cursor="tech-name"]')) {
        setIsHoveringName(true)
      } else if (target.closest('.tech-card-title') || target.closest('[data-cursor="tech-card-title"]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
        setIsHoveringButton(false)
        setIsHoveringName(false)
        setIsHoveringPhoto(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseEnter)
    window.addEventListener('mouseout', () => {
      setIsHovering(false)
      setIsHoveringButton(false)
      setIsHoveringName(false)
      setIsHoveringPhoto(false)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseEnter)
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering || isHoveringButton || isHoveringName || isHoveringPhoto ? 1.5 : 1,
          opacity: (isHomePage || isTechPage) && (isHovering || isHoveringButton || isHoveringName || isHoveringPhoto) ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      >
        {/* Main cursor dot */}
        <motion.div
          className="w-8 h-8 rounded-full bg-white shadow-lg"
          animate={{
            scale: isHovering ? 2 : isHoveringButton ? 1.8 : isHoveringName ? 2.2 : isHoveringPhoto ? 2.5 : 1,
            rotate: isHovering ? 180 : isHoveringButton ? 90 : isHoveringName ? 360 : isHoveringPhoto ? 720 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        />
        
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: isHovering ? 3 : isHoveringButton ? 2.5 : isHoveringName ? 3.5 : isHoveringPhoto ? 4 : 1.5,
            opacity: isHovering || isHoveringButton || isHoveringName || isHoveringPhoto ? 1 : 0.5,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 25
          }}
        />
        
        {/* Sparkle effect for special elements */}
        {(isHoveringName || isHoveringPhoto) && (
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-20px)`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* AI Button specific effect */}
        {isHoveringButton && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Show custom cursor only on home page and tech page hover */}
      <style jsx global>{`
        ${isHomePage ? `
          .card:hover *,
          .ai-button:hover *,
          .name-text:hover *,
          .profile-photo:hover * {
            cursor: none !important;
          }
        ` : ''}
        
        ${isTechPage ? `
          .tech-title:hover *,
          .tech-name:hover *,
          .tech-card-title:hover *,
          .ai-button:hover *,
          .profile-photo:hover * {
            cursor: none !important;
          }
        ` : ''}
        
        /* Show default cursor on mobile/touch devices */
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

      {children}
    </>
  )
}
