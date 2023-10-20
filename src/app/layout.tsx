import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'

const mulish = Mulish({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Painel de colaboradores',
  description: 'Painel de controle de colaboradores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${mulish.className} h-screen overflow-hidden`}>
        <Header />
        <div className='flex h-full'>
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  )
}
