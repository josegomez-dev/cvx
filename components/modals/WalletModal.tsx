'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Wallet, CreditCard, Coins, ArrowRight, Check, Copy, ExternalLink, AlertCircle } from 'lucide-react'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'connect' | 'payment'
  walletId?: string
  networkId?: string
}

interface PaymentAmount {
  value: string
  currency: string
  symbol: string
}

export function WalletModal({ isOpen, onClose, mode, walletId, networkId }: WalletModalProps) {
  const [step, setStep] = useState<'select' | 'connecting' | 'connected' | 'payment' | 'processing' | 'success'>('select')
  const [selectedAmount, setSelectedAmount] = useState<PaymentAmount>({ value: '', currency: 'USD', symbol: '$' })
  const [customAmount, setCustomAmount] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const presetAmounts = [
    { value: '0.001', currency: 'ETH', symbol: 'Ξ' },
    { value: '0.01', currency: 'ETH', symbol: 'Ξ' },
    { value: '0.05', currency: 'ETH', symbol: 'Ξ' },
    { value: '0.1', currency: 'ETH', symbol: 'Ξ' },
    { value: '0.5', currency: 'ETH', symbol: 'Ξ' },
    { value: '1', currency: 'ETH', symbol: 'Ξ' },
    { value: '10', currency: 'XLM', symbol: '⭐' },
    { value: '50', currency: 'XLM', symbol: '⭐' },
    { value: '100', currency: 'XLM', symbol: '⭐' },
  ]

  const networks = {
    ethereum: { name: 'Ethereum', icon: '🔷', color: 'from-blue-500 to-blue-600' },
    starknet: { name: 'Starknet', icon: '🛡️', color: 'from-green-500 to-green-600' },
    stellar: { name: 'Stellar', icon: '⭐', color: 'from-yellow-500 to-yellow-600' }
  }

  const wallets = {
    metamask: { name: 'MetaMask', icon: '🦊', color: 'from-orange-500 to-orange-600' },
    braavos: { name: 'Braavos', icon: '🛡️', color: 'from-green-500 to-green-600' },
    freighter: { name: 'Freighter', icon: '⭐', color: 'from-yellow-500 to-yellow-600' }
  }

  useEffect(() => {
    if (isOpen) {
      setStep('select')
      setSelectedAmount({ value: '', currency: 'USD', symbol: '$' })
      setCustomAmount('')
    }
  }, [isOpen])

  const handleConnectWallet = async () => {
    if (!walletId) return
    
    setIsConnecting(true)
    setStep('connecting')
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 3000))
      setStep('connected')
    } catch (error) {
      console.error('Connection failed:', error)
      setStep('select')
    } finally {
      setIsConnecting(false)
    }
  }

  const handlePayment = async () => {
    if (!selectedAmount.value && !customAmount) return
    
    setIsProcessing(true)
    setStep('processing')
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      setStep('success')
    } catch (error) {
      console.error('Payment failed:', error)
      setStep('payment')
    } finally {
      setIsProcessing(false)
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAddress(id)
      setTimeout(() => setCopiedAddress(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getPaymentAddress = () => {
    if (selectedAmount.currency === 'ETH') {
      return '0x9391A141b5409d7c14DbAbd0F9FE3B92C331387e'
    }
    return 'GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  }

  const getPaymentAmount = () => {
    return customAmount || selectedAmount.value
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-gradient-to-b from-gray-900 to-black border border-white/10 rounded-2xl p-6 w-full max-w-md backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  {mode === 'connect' ? <Wallet className="w-5 h-5 text-white" /> : <CreditCard className="w-5 h-5 text-white" />}
                </div>
                                 <div>
                   <h2 className="text-lg font-bold text-white">
                     {mode === 'connect' ? 'Connect Wallet' : 'Crypto Donation'}
                   </h2>
                   <p className="text-sm text-white/60">
                     {mode === 'connect' ? 'Choose your wallet' : 'Support my work with crypto'}
                   </p>
                 </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {step === 'select' && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {mode === 'connect' ? (
                    /* Wallet Connection */
                    <div className="space-y-4">
                      {networkId && networks[networkId as keyof typeof networks] && (
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{networks[networkId as keyof typeof networks].icon}</span>
                            <div>
                              <h3 className="font-semibold text-white">{networks[networkId as keyof typeof networks].name}</h3>
                              <p className="text-sm text-white/60">Selected Network</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        {Object.entries(wallets).map(([id, wallet]) => (
                          <motion.button
                            key={id}
                            onClick={() => {
                              if (mode === 'connect') {
                                handleConnectWallet()
                              } else {
                                setStep('payment')
                              }
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="text-2xl">{wallet.icon}</div>
                                <div className="text-left">
                                  <h4 className="font-semibold text-white">{wallet.name}</h4>
                                  <p className="text-sm text-white/60">Click to connect</p>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-white/60" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Payment Selection */
                    <div className="space-y-4">
                                             <div>
                         <h3 className="font-semibold text-white mb-3">Select Donation Amount</h3>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {presetAmounts.map((amount, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setSelectedAmount(amount)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`p-3 rounded-lg border transition-all duration-200 ${
                                selectedAmount.value === amount.value
                                  ? 'border-purple-500 bg-purple-500/20 text-white'
                                  : 'border-white/20 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                              }`}
                            >
                              <div className="text-center">
                                <div className="text-lg font-bold">{amount.symbol}{amount.value}</div>
                                <div className="text-xs">{amount.currency}</div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm text-white/60">Custom Amount</label>
                          <input
                            type="text"
                            value={customAmount}
                            onChange={(e) => setCustomAmount(e.target.value)}
                            placeholder="Enter custom amount"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>
                      </div>

                                             <motion.button
                         onClick={() => setStep('payment')}
                         disabled={!selectedAmount.value && !customAmount}
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                         Continue to Donation
                       </motion.button>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 'connecting' && (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Connecting Wallet</h3>
                  <p className="text-sm text-white/60">Please approve the connection in your wallet</p>
                </motion.div>
              )}

              {step === 'connected' && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Wallet Connected!</h3>
                  <p className="text-sm text-white/60 mb-6">Your wallet is now connected and ready to use</p>
                  
                  <motion.button
                    onClick={() => setStep('payment')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                  >
                    Continue to Payment
                  </motion.button>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                                     <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                     <h3 className="font-semibold text-white mb-3">Donation Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Amount:</span>
                        <span className="text-white font-semibold">
                          {selectedAmount.symbol}{getPaymentAmount()} {selectedAmount.currency}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Network:</span>
                        <span className="text-white">{networkId ? networks[networkId as keyof typeof networks]?.name : 'Ethereum'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Wallet:</span>
                        <span className="text-white">{walletId ? wallets[walletId as keyof typeof wallets]?.name : 'MetaMask'}</span>
                      </div>
                    </div>
                  </div>

                                     <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                     <h3 className="font-semibold text-white mb-3">My Wallet Address</h3>
                    <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                      <span className="text-sm text-white/80 font-mono">
                        {getPaymentAddress().slice(0, 10)}...{getPaymentAddress().slice(-8)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(getPaymentAddress(), 'payment-address')}
                        className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                      >
                        {copiedAddress === 'payment-address' ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-1">Important</h4>
                        <p className="text-sm text-yellow-300/80">
                          Send the exact amount to the address above. Double-check the amount and address before confirming.
                        </p>
                      </div>
                    </div>
                  </div>

                                     <motion.button
                     onClick={handlePayment}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200"
                   >
                     Confirm Donation
                   </motion.button>
                </motion.div>
              )}

              {step === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 border-4 border-white/20 border-t-green-500 rounded-full animate-spin mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">Processing Payment</h3>
                  <p className="text-sm text-white/60">Please wait while we process your transaction</p>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-400" />
                  </div>
                                     <h3 className="text-lg font-bold text-white mb-2">Donation Successful!</h3>
                  <p className="text-sm text-white/60 mb-6">Thank you for your support!</p>
                  
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                  >
                    Close
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
