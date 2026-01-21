import type { Metadata } from 'next'
import { Onest, Calvino } from '@/styles/fonts'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ToastProvider } from '@/components/ToastProvider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Cloud.co - Облачный коворкинг',
  description: 'Платформа для аренды оборудования и компьютеров с удаленным управлением',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${Onest.variable} ${Calvino.variable || ''}`}>
        <ErrorBoundary>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
