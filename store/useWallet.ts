import { create } from 'zustand'

type WalletState = {
  address?: string
  isConnected: boolean
  setAddress: (address?: string) => void
  setIsConnected: (connected: boolean) => void
  disconnect: () => void
}

export const useWallet = create<WalletState>((set) => ({
  address: undefined,
  isConnected: false,
  setAddress: (address) => set({ address, isConnected: !!address }),
  setIsConnected: (isConnected) => set({ isConnected }),
  disconnect: () => set({ address: undefined, isConnected: false }),
}))
