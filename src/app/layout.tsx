import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Favicon from "@/app/icon.ico";
import "./globals.css"
import ToastProvider from "@/lib/react-toastify/ToastProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eventuner",
  description: "Eventuner is an event scheduling application. Schedule Smarter, Plan Easier.",
  icons: [{ rel: 'icon', url: Favicon.src }]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
