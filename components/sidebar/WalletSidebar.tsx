'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, CreditCard, Coins, X, ChevronLeft, ChevronRight, ExternalLink, Copy, Check, ArrowRight } from 'lucide-react'
import { WalletModal } from '../modals/WalletModal'
import { WalletService, WalletConnection } from '@/lib/web3/walletService'

interface WalletSidebarProps {
  isOpen: boolean
  onToggle: () => void
}

interface WalletInfo {
  id: string
  name: string
  icon: string
  network: string
  address?: string
  balance?: string
  color: string
  status: 'connected' | 'disconnected' | 'loading'
  isAvailable: boolean
}

interface NetworkInfo {
  id: string
  name: string
  icon: string
  color: string
  wallets: string[]
  chainId?: number
}

interface PaymentMethod {
  id: string
  name: string
  icon: string
  type: 'crypto' | 'fiat' | 'subscription'
  color: string
  url?: string
}

export function WalletSidebar({ isOpen, onToggle }: WalletSidebarProps) {
  const [activeTab, setActiveTab] = useState<'wallets' | 'payments' | 'patreon'>('wallets')
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)
  const [selectedNetwork, setSelectedNetwork] = useState<string>('ethereum')
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [connectedWallets, setConnectedWallets] = useState<WalletConnection[]>([])
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    mode: 'connect' | 'payment'
    walletId?: string
    networkId?: string
  }>({
    isOpen: false,
    mode: 'connect'
  })

  const walletService = WalletService.getInstance()

  const networks: NetworkInfo[] = [
    {
      id: 'ethereum',
      name: 'Ethereum',
      icon: '🔷',
      color: 'from-blue-500 to-blue-600',
      wallets: ['metamask', 'walletconnect'],
      chainId: 1
    },
    {
      id: 'starknet',
      name: 'Starknet',
      icon: '🛡️',
      color: 'from-green-500 to-green-600',
      wallets: ['braavos', 'argent'],
      chainId: 0x534e5f474f45524c49
    },
    {
      id: 'stellar',
      name: 'Stellar',
      icon: '⭐',
      color: 'from-yellow-500 to-yellow-600',
      wallets: ['freighter'],
      chainId: undefined
    }
  ]

  const allWallets: WalletInfo[] = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      network: 'Ethereum & EVM',
      color: 'from-orange-500 to-orange-600',
      status: 'disconnected',
      isAvailable: true
    },
    {
      id: 'braavos',
      name: 'Braavos',
      icon: '🛡️',
      network: 'Starknet',
      color: 'from-green-500 to-green-600',
      status: 'disconnected',
      isAvailable: true
    },
    {
      id: 'freighter',
      name: 'Freighter',
      icon: '⭐',
      network: 'Stellar',
      color: 'from-yellow-500 to-yellow-600',
      status: 'disconnected',
      isAvailable: true
    },
    {
      id: 'argent',
      name: 'Argent',
      icon: '🛡️',
      network: 'Starknet',
      color: 'from-blue-400 to-blue-500',
      status: 'disconnected',
      isAvailable: true
    }
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '💳',
      type: 'fiat',
      color: 'from-blue-500 to-blue-600',
      url: 'https://paypal.me/josegomezdev'
    },
    {
      id: 'coinpay',
      name: 'CoinPay',
      icon: '₿',
      type: 'crypto',
      color: 'from-orange-500 to-orange-600',
      url: 'https://coinpay.net'
    }
  ]

  const copyToClipboard = async (text: string, walletId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAddress(walletId)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shortenAddress = (address: string) => {
    if (address.length > 20) {
      return `${address.slice(0, 6)}...${address.slice(-4)}`
    }
    return address
  }

  const openWalletModal = (mode: 'connect' | 'payment', walletId?: string) => {
    setModalState({
      isOpen: true,
      mode,
      walletId,
      networkId: selectedNetwork
    })
  }

  const closeWalletModal = () => {
    setModalState({
      isOpen: false,
      mode: 'connect'
    })
  }

  const connectWallet = async (walletId: string) => {
    setIsConnecting(walletId)
    
    try {
      let connection: WalletConnection
      
      switch (walletId) {
        case 'metamask':
          connection = await walletService.connectMetaMask()
          break
        case 'argent':
        case 'braavos':
          connection = await walletService.connectStarknet(walletId as 'argent' | 'braavos')
          break
        case 'freighter':
          connection = await walletService.connectFreighter()
          break
        default:
          throw new Error('Unsupported wallet type')
      }
      
      setConnectedWallets(prev => [...prev.filter(w => w.id !== walletId), connection])
      console.log(`Connected to ${walletId}:`, connection)
    } catch (error) {
      console.error(`Failed to connect to ${walletId}:`, error)
      // Show error notification
    } finally {
      setIsConnecting(null)
    }
  }

  const disconnectWallet = (walletId: string) => {
    walletService.disconnectWallet(walletId)
    setConnectedWallets(prev => prev.filter(w => w.id !== walletId))
  }

  const copyWalletAddress = async (walletId: string) => {
    const wallet = allWallets.find(w => w.id === walletId)
    if (wallet) {
      const address = wallet.address || '0x9391A141b5409d7c14DbAbd0F9FE3B92C331387e'
      await copyToClipboard(address, walletId)
      
      // Show success animation
      const walletElement = document.querySelector(`[data-wallet-id="${walletId}"]`)
      if (walletElement) {
        walletElement.classList.add('copy-success')
        setTimeout(() => {
          walletElement.classList.remove('copy-success')
        }, 2000)
      }
    }
  }

  const openCryptoDonationsModal = () => {
    setModalState({
      isOpen: true,
      mode: 'payment'
    })
  }

  const getAvailableWallets = () => {
    const network = networks.find(n => n.id === selectedNetwork)
    if (!network) return []
    
    return allWallets.filter(wallet => 
      network.wallets.includes(wallet.id) && wallet.isAvailable
    )
  }

  const getConnectedWallets = () => {
    return connectedWallets
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-24 right-4 z-[99999] blur-sm opacity-60">
        <motion.button
          className="relative w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl border-2 border-white/20 flex items-center justify-center transition-all duration-300 wallet-button cursor-not-allowed pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 0 rgba(147, 51, 234, 0)",
              "0 0 20px rgba(147, 51, 234, 0.3)",
              "0 0 0 rgba(147, 51, 234, 0)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          title="🚧 Work in Progress - Payment Gateway Coming Soon"
        >
          <Wallet className="w-6 h-6 text-white" />
          
          {/* WIP Badge */}
          <motion.div
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            WIP
          </motion.div>
        </motion.button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black border-l border-white/10 backdrop-blur-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center relative">
                  <Wallet className="w-5 h-5 text-white" />
                  
                  {/* PENDING Badge */}
                  <motion.div
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    PENDING
                  </motion.div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Web3 Wallet</h2>
                  <p className="text-sm text-white/60">Payment Gateway</p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {[
                { id: 'wallets', label: 'Wallets', icon: '🦊' },
                { id: 'payments', label: 'Payments', icon: '💳' },
                { id: 'patreon', label: 'Support', icon: '❤️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'wallets' | 'payments' | 'patreon')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-white bg-white/10 border-b-2 border-purple-500'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'wallets' && (
                  <motion.div
                    key="wallets"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {/* Network Selection */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-white mb-3">Select Network</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {networks.map((network) => (
                          <button
                            key={network.id}
                            onClick={() => setSelectedNetwork(network.id)}
                            className={`p-3 rounded-lg border transition-all duration-200 ${
                              selectedNetwork === network.id
                                ? 'border-purple-500 bg-purple-500/20 text-white'
                                : 'border-white/20 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{network.icon}</span>
                              <span className="text-sm font-medium">{network.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Connected Wallets */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-white mb-3">Connected Wallets</h3>
                      {getConnectedWallets().length > 0 ? (
                        <div className="space-y-3">
                          {getConnectedWallets().map((wallet) => {
                            const walletInfo = allWallets.find(w => w.id === wallet.id)
                            return (
                              <motion.div
                                key={wallet.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <div className="text-2xl">{walletInfo?.icon || '🔗'}</div>
                                    <div>
                                      <h4 className="font-semibold text-white">{wallet.name}</h4>
                                      <p className="text-sm text-white/60">{wallet.network}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                      connected
                                    </div>
                                    <button
                                      onClick={() => disconnectWallet(wallet.id)}
                                      className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors"
                                    >
                                      <X className="w-3 h-3 text-red-400" />
                                    </button>
                                  </div>
                                </div>
                                
                                {wallet.address && (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm text-white/60">Address:</span>
                                      <button
                                        onClick={() => copyToClipboard(wallet.address!, wallet.id)}
                                        className="flex items-center space-x-1 text-xs text-white/80 hover:text-white transition-colors"
                                      >
                                        <span>{shortenAddress(wallet.address)}</span>
                                        {copiedAddress === wallet.id ? (
                                          <Check className="w-3 h-3 text-green-400" />
                                        ) : (
                                          <Copy className="w-3 h-3" />
                                        )}
                                      </button>
                                    </div>
                                    {wallet.balance && (
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm text-white/60">Balance:</span>
                                        <span className="text-sm font-medium text-white">{wallet.balance}</span>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </motion.div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-white/60">
                          <div className="text-4xl mb-2">🔗</div>
                          <p>No wallets connected</p>
                        </div>
                      )}
                    </div>

                    {/* Available Wallets */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3">Available Wallets</h3>
                      <div className="space-y-3">
                        {getAvailableWallets().map((wallet) => (
                          <motion.button
                            key={wallet.id}
                            data-wallet-id={wallet.id}
                            onClick={() => connectWallet(wallet.id)}
                            disabled={isConnecting === wallet.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 copy-wallet-button disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="text-2xl">{wallet.icon}</div>
                                <div className="text-left">
                                  <h4 className="font-semibold text-white">{wallet.name}</h4>
                                  <p className="text-sm text-white/60">
                                    {isConnecting === wallet.id ? 'Connecting...' : 'Click to connect'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {isConnecting === wallet.id ? (
                                  <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                  <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                                    <ArrowRight className="w-4 h-4 text-white/60" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'payments' && (
                  <motion.div
                    key="payments"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold text-white mb-4">Payment Methods</h3>
                                         {paymentMethods.map((method) => (
                       <motion.button
                         key={method.id}
                         onClick={() => {
                           if (method.id === 'coinpay') {
                             openWalletModal('payment')
                           } else if (method.url) {
                             window.open(method.url, '_blank')
                           }
                         }}
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         className="w-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                       >
                         <div className="flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                             <div className="text-2xl">{method.icon}</div>
                             <div className="text-left">
                               <h4 className="font-semibold text-white">{method.name}</h4>
                               <p className="text-sm text-white/60 capitalize">{method.type}</p>
                             </div>
                           </div>
                           <ArrowRight className="w-5 h-5 text-white/60" />
                         </div>
                       </motion.button>
                     ))}

                    {/* Direct Bank Transfer */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">🏦</span>
                        <h4 className="font-semibold text-white">Direct Bank Transfer</h4>
                      </div>
                      <p className="text-sm text-white/60 mb-4">
                        Send direct bank transfers to my BN account
                      </p>
                      <motion.button
                        onClick={() => copyToClipboard('CR123456789012345678901234', 'bn-iban')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
                      >
                        {copiedAddress === 'bn-iban' ? 'IBAN Copied!' : 'Copy BN IBAN'}
                      </motion.button>
                    </div>

                  </motion.div>
                )}

                {activeTab === 'patreon' && (
                  <motion.div
                    key="patreon"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">❤️</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">Support My Work</h3>
                      <p className="text-sm text-white/60 mb-6">
                        Help me continue building amazing Web3 projects and open source contributions
                      </p>
                    </div>

                    {/* Patreon Section */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">❤️</span>
                        <h4 className="font-semibold text-white">Patreon Membership</h4>
                      </div>
                      <p className="text-sm text-white/60 mb-4">
                        Join my Patreon for exclusive content and early access to projects
                      </p>
                      <motion.a
                        href="https://www.patreon.com/josegomez"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="block w-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-200"
                      >
                        Become a Patron
                      </motion.a>
                      {/* <div className="mt-3">
                        <h5 className="font-semibold text-white mb-2">Perks Include:</h5>
                        <ul className="space-y-1 text-sm text-white/80">
                          <li>• Early access to new projects</li>
                          <li>• Exclusive Web3 tutorials</li>
                          <li>• Direct Discord access</li>
                          <li>• Custom NFT rewards</li>
                        </ul>
                      </div> */}
                    </div>

                    {/* Crypto Donations Section */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="text-2xl">₿</span>
                        <h4 className="font-semibold text-white">Crypto Donations</h4>
                      </div>
                      <p className="text-sm text-white/60 mb-4">
                        Support my work with cryptocurrency donations
                      </p>
                      <div className="space-y-3">
                        <motion.button
                          onClick={openCryptoDonationsModal}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all duration-200"
                        >
                          💳 Interactive Donation
                        </motion.button>
                        <motion.button
                          onClick={() => copyToClipboard('0x9391A141b5409d7c14DbAbd0F9FE3B92C331387e', 'eth-donation')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
                        >
                          {copiedAddress === 'eth-donation' ? 'Address Copied!' : 'Copy ETH Address'}
                        </motion.button>
                        <motion.button
                          onClick={() => copyToClipboard('GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 'xlm-donation')}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-center py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200"
                        >
                          {copiedAddress === 'xlm-donation' ? 'Address Copied!' : 'Copy XLM Address'}
                        </motion.button>
                      </div>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={modalState.isOpen}
        onClose={closeWalletModal}
        mode={modalState.mode}
        walletId={modalState.walletId}
        networkId={modalState.networkId}
      />

      {/* Copy Success Animation Styles */}
      <style jsx>{`
        .copy-wallet-button.copy-success {
          animation: copySuccess 0.6s ease-in-out;
        }
        
        @keyframes copySuccess {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1)); }
          100% { transform: scale(1); }
        }
        
        .copy-wallet-button.copy-success .text-2xl {
          animation: bounce 0.6s ease-in-out;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  )
}
