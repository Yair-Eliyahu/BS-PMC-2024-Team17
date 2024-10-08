import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {SessionProvider} from "next-auth/react";
import Header from '@/components/ui/header';
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sami QuizzerAI',
  description: 'Generated Quizzes And Study Faster Using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <SessionProvider>
        <body className={inter.className}>
          <Header />
          {children}
          <Toaster
          toastOptions={{
            style: {
              textAlign: "center",
            },
          }}
        />
          </body>
      </SessionProvider>
      
    </html>
  )
}
