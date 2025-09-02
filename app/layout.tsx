import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'José Alejandro Gómez Castro | Next-Gen Web3 Open Source Developer',
  description: 'Next-Gen Web3 Open Source Developer',
  keywords: ['Web3', 'Developer', 'Blockchain', 'Open Source'],
  authors: [{ name: 'José Alejandro Gómez Castro' }],
  openGraph: {
    title: 'José Alejandro Gómez Castro | Next-Gen Web3 Open Source Developer',
    description: 'Next-Gen Web3 Open Source Developer',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'José Alejandro Gómez Castro | Next-Gen Web3 Open Source Developer',
    description: 'Next-Gen Web3 Open Source Developer',
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
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
