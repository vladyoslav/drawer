import { type PropsWithChildren } from 'react'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/shared/lib'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn('bg-black', inter.className)}>
        <main
          className={cn(
            'bg-slate-100 p-4 min-h-screen',
            'flex justify-start items-center flex-col gap-4'
          )}
          vladyoslav-drawer-wrapper=""
        >
          {children}
        </main>
      </body>
    </html>
  )
}