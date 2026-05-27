import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uday Kumar — Full Stack & AI Engineer | Cinematic Portfolio",
  description:
    "Full Stack & AI Engineer building next-generation digital experiences. Expert in Next.js, Python, LangChain, and production AI systems. 3+ years, 25+ projects, 50K+ users served.",
  keywords: [
    "Uday Kumar",
    "Full Stack Engineer",
    "AI Engineer",
    "Next.js Developer",
    "LangChain",
    "React Developer",
    "Python Developer",
    "Portfolio",
    "Hyderabad",
  ],
  authors: [{ name: "Uday Kumar", url: "https://udaykumar.dev" }],
  creator: "Uday Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://udaykumar.dev",
    title: "Uday Kumar — Full Stack & AI Engineer",
    description: "Full Stack & AI Engineer | Next.js | Python | LangChain | AWS",
    siteName: "Uday Kumar Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Uday Kumar — Full Stack & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uday Kumar — Full Stack & AI Engineer",
    description: "Full Stack & AI Engineer | Next.js | Python | LangChain | AWS",
    creator: "@udaykumar",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#050508] text-slate-200">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0f1624",
              color: "#e2e8f0",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.1)",
            },
          }}
        />
      </body>
    </html>
  );
}
