import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NEXUS COMMAND CENTER',
  description: 'Transforming Admin Tasks Into Epic Quests',
  generator: 'React.js',
  icons: {
    icon: '/fav.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
