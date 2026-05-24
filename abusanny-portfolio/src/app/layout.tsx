import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abu Sanny | Academic Portfolio",
  description:
    "Interdisciplinary AI researcher bridging electronics engineering and clinical medical technology. Deep learning for ultrasound imaging, multimodal diagnostics, and secure clinical AI deployment.",
  keywords: [
    "Abu Sanny",
    "AI Researcher",
    "Medical Technology",
    "Deep Learning",
    "Healthcare AI",
    "Ultrasound Imaging",
    "IIT Jodhpur",
    "Clinical AI",
  ],
  authors: [{ name: "Abu Sanny" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Abu Sanny | Academic Portfolio",
    description:
      "Interdisciplinary AI researcher bridging electronics engineering and clinical medical technology.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abu Sanny | Academic Portfolio",
    description:
      "Interdisciplinary AI researcher bridging electronics engineering and clinical medical technology.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
