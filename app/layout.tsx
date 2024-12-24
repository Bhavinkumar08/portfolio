import "@/styles/globals.css"
import { Inter } from 'next/font/google'
import { Providers } from "./providers"
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bhavin Kumar - Robotics & AI Engineer",
  description: "Portfolio of Bhavin Kumar, a Robotics and AI Engineer specializing in intelligent systems and autonomous solutions.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          <ThemeToggle />
          {children}
        </Providers>
      </body>
    </html>
  )
}

