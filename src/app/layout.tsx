import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import './globals.css'
import QueryWrapper from './components/QueryWrapper/QueryWrapper'
import SessionWrapper from './components/SessionWrapper/SessionWrapper'

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
        <SessionWrapper>
          <QueryWrapper>
            {children}
          </QueryWrapper>
        </SessionWrapper>
      </body>
    </html>
  )
}
