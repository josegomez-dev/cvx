'use client'

import { useState, useEffect } from 'react'
import { WalletSidebar } from './WalletSidebar'

export function WalletSidebarManager() {
  const [isWalletOpen, setIsWalletOpen] = useState(false)

  // Debug: Log when component renders
  useEffect(() => {
    console.log('WalletSidebarManager rendered')
  }, [])

  // Close wallet sidebar when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsWalletOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <WalletSidebar 
      isOpen={isWalletOpen} 
      onToggle={() => setIsWalletOpen(!isWalletOpen)} 
    />
  )
}
