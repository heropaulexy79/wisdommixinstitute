import type { Metadata } from 'next'
import { Montserrat, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800', '900'] 
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic']
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wisdommixinstitute.vercel.app'),
  title: 'NexLeadership Community | Transformation & Leadership',
  description: 'Raising transformed leaders for lasting impact through leadership development, discipleship, mind transformation, and mentorship.',
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${cormorant.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}

