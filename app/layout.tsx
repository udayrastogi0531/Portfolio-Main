import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://udayrastogi.dev"),
  title: {
    default: "Uday Prakash Rastogi — Gen AI Engineer & Full Stack Developer | Cinematic Portfolio",
    template: "%s | Uday Prakash Rastogi",
  },
  description:
    "Gen AI Engineer & Full Stack Developer building next-generation Agentic AI experiences. Expert in Next.js, React, TypeScript, LangChain, LangGraph, and C++ (DSA).",
  keywords: [
    "Uday Prakash Rastogi",
    "Gen AI Engineer",
    "Agentic AI Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "LangChain Developer",
    "LangGraph Developer",
    "React Developer",
    "C++ DSA",
    "Portfolio",
    "Hyderabad",
    "OpenAI",
    "LLM",
    "RAG Systems",
  ],
  authors: [{ name: "Uday Prakash Rastogi", url: "https://udayrastogi.dev" }],
  creator: "Uday Prakash Rastogi",
  publisher: "Uday Prakash Rastogi",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://udayrastogi.dev",
    title: "Uday Prakash Rastogi — Gen AI Engineer & Full Stack Developer",
    description:
      "Full Stack & AI Engineer | Next.js | Python | LangChain | AWS | Cinematic Portfolio Experience",
    siteName: "Uday Prakash Rastogi Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Uday Prakash Rastogi — Gen AI Engineer & Full Stack Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uday Prakash Rastogi — Gen AI Engineer & Full Stack Developer",
    description:
      "Gen AI Engineer & Full Stack Developer | Next.js | React | TypeScript | LangChain | Cinematic Portfolio",
    creator: "@udayrastogi0531",
    site: "@udayrastogi0531",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://udayrastogi.dev",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Uday Prakash Rastogi",
  url: "https://udayrastogi.dev",
  image: "https://udayrastogi.dev/og-image.jpg",
  sameAs: [
    "https://github.com/udayrastogi0531",
    "https://linkedin.com/in/udayrastogi0531",
    "https://twitter.com/udayrastogi0531",
  ],
  jobTitle: "Gen AI Engineer & Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "TechNova AI",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "LangChain",
    "OpenAI",
    "AWS",
    "Docker",
    "Machine Learning",
    "RAG Systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#050508" />
        <meta name="color-scheme" content="dark" />
        {/* Prevent flash */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="antialiased bg-[#050508] text-slate-200 selection:bg-cyan-500/30 selection:text-white">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0f1624",
              color: "#e2e8f0",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              boxShadow:
                "0 0 20px rgba(6, 182, 212, 0.15), 0 20px 60px rgba(0,0,0,0.5)",
              borderRadius: "12px",
              fontFamily: "var(--font-inter)",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#050508",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#050508",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
