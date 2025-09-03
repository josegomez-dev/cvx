import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import AIChatManager from '@/components/interactive/AIChatManager'
import { CustomCursor } from '@/components/animations/CustomCursor'
import { WalletSidebarManager } from '@/components/sidebar/WalletSidebarManager'
import InteractiveToolsSidebar from '@/components/sidebar/InteractiveToolsSidebar'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'CVx | Home Page',
  description: 'CVx - Interactive Digital Portfolio & Web3 Developer Console',
  keywords: ['CVx', 'Web3', 'Developer', 'Blockchain', 'Portfolio', 'Interactive'],
  authors: [{ name: 'José Alejandro Gómez Castro' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'CVx | Home Page',
    description: 'CVx - Interactive Digital Portfolio & Web3 Developer Console',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVx | Home Page',
    description: 'CVx - Interactive Digital Portfolio & Web3 Developer Console',
    images: ['/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen">
        <CustomCursor>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
                            <Footer />
                  <AIChatManager />
                  <WalletSidebarManager />
                  <InteractiveToolsSidebar />
        </CustomCursor>
      </body>
    </html>
  )
}
