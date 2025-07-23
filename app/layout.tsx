import "./globals.css"
import { ppEditorialNewUltralightItalic, inter } from "./fonts"
import { TranslationProvider } from "../contexts/TranslationContext"
import { ThemeProvider } from "../contexts/ThemeContext"
import type React from "react"

export const metadata = {
  title: "Dynamic Frame Layout",
  description: "A dynamic frame layout with custom fonts",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ppEditorialNewUltralightItalic.variable} ${inter.variable}`}>
      <body className={inter.className}>
        <ThemeProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
