import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/site/theme-provider";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { BugReportLauncher } from "@/components/site/bug-report-launcher";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MIAN DAST — Safe-by-Default Dynamic Application Security Testing",
  description:
    "Continuous DAST with mandatory attestation gates, boundary fences, and adaptive canaries. Zero collateral outages.",
  metadataBase: new URL("https://dast.askmian.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <BugReportLauncher />
          <ScrollReveal />
          <Toaster
            position="bottom-left"
            toastOptions={{
              className:
                "border border-border bg-card text-foreground font-mono text-xs rounded-[2px]",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
