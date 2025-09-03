import { ethers } from 'ethers'
import StellarSdk from '@stellar/stellar-sdk'

export interface WalletConnection {
  id: string
  name: string
  address: string
  balance?: string
  network: string
  isConnected: boolean
}

export class WalletService {
  private static instance: WalletService
  private connections: Map<string, WalletConnection> = new Map()

  static getInstance(): WalletService {
    if (!WalletService.instance) {
      WalletService.instance = new WalletService()
    }
    return WalletService.instance
  }

  // MetaMask/Ethereum Connection
  async connectMetaMask(): Promise<WalletConnection> {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_requestAccounts', [])
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const balance = await provider.getBalance(address)
        
        const connection: WalletConnection = {
          id: 'metamask',
          name: 'MetaMask',
          address: address,
          balance: ethers.formatEther(balance),
          network: 'Ethereum',
          isConnected: true
        }
        
        this.connections.set('metamask', connection)
        return connection
      } else {
        throw new Error('MetaMask not found')
      }
    } catch (error) {
      console.error('MetaMask connection failed:', error)
      throw error
    }
  }

  // Starknet Connection (Argent X / Braavos)
  async connectStarknet(walletType: 'argent' | 'braavos'): Promise<WalletConnection> {
    try {
      if (typeof window !== 'undefined') {
        // For now, simulate Starknet connection
        // In a real implementation, you'd use @starknet-react/core
        const mockAddress = '0x' + Math.random().toString(16).slice(2, 42)
        
        const connection: WalletConnection = {
          id: walletType,
          name: walletType === 'argent' ? 'Argent' : 'Braavos',
          address: mockAddress,
          balance: '0.05',
          network: 'Starknet',
          isConnected: true
        }
        
        this.connections.set(walletType, connection)
        return connection
      } else {
        throw new Error('Starknet wallet not available')
      }
    } catch (error) {
      console.error('Starknet connection failed:', error)
      throw error
    }
  }

  // Stellar Connection (Freighter)
  async connectFreighter(): Promise<WalletConnection> {
    try {
      if (typeof window !== 'undefined' && window.stellar) {
        // For now, simulate Freighter connection
        // In a real implementation, you'd use the Freighter API
        const mockAddress = 'G' + Math.random().toString(36).slice(2, 34).toUpperCase()
        
        const connection: WalletConnection = {
          id: 'freighter',
          name: 'Freighter',
          address: mockAddress,
          balance: '1000',
          network: 'Stellar',
          isConnected: true
        }
        
        this.connections.set('freighter', connection)
        return connection
      } else {
        throw new Error('Freighter wallet not found')
      }
    } catch (error) {
      console.error('Freighter connection failed:', error)
      throw error
    }
  }

  // Disconnect wallet
  disconnectWallet(walletId: string): void {
    this.connections.delete(walletId)
  }

  // Get all connected wallets
  getConnectedWallets(): WalletConnection[] {
    return Array.from(this.connections.values())
  }

  // Check if wallet is connected
  isWalletConnected(walletId: string): boolean {
    return this.connections.has(walletId)
  }

  // Get wallet connection
  getWalletConnection(walletId: string): WalletConnection | undefined {
    return this.connections.get(walletId)
  }

  // Check if MetaMask is available
  isMetaMaskAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.ethereum
  }

  // Check if Starknet wallet is available
  isStarknetAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.starknet
  }

  // Check if Freighter is available
  isFreighterAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.stellar
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, handler: (params: any) => void) => void;
      removeListener: (eventName: string, handler: (params: any) => void) => void;
    };
    starknet?: unknown;
    stellar?: unknown;
  }
}
