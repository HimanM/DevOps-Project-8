import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'Enterprise Automation | HimanM',
    description: 'Enterprise DevOps Infrastructure Automation Documentation',
    icons: {
        icon: '/favicon.ico',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <script src="/env.js" />
            </head>
            <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
                {children}
            </body>
        </html>
    )
}
