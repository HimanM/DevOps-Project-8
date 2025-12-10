import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'DevOps Project 8',
    description: 'Enterprise DevOps Infrastructure Automation Documentation',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
                {children}
            </body>
        </html>
    )
}
