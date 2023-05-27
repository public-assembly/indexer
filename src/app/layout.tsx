import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'

export const metadata = {
  title: 'wagmi',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">        
      <body className={inter.className}>
        <Providers>
          <Header />
          <Footer />
          {children}
        </Providers>        
      </body>
    </html>
  )
}
