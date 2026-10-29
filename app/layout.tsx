import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { siteConfig } from '@/lib/site-config';
import { Reticle } from '@/components/fx/reticle';
import { MotionProvider } from '@/components/fx/motion-provider';

const sans = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  display: 'swap',
  variable: '--font-sans',
  weight: '100 900'
});

const display = localFont({
  src: [
    { path: './fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic' }
  ],
  display: 'swap',
  variable: '--font-display'
});

const mono = localFont({
  src: './fonts/jetbrains-mono-latin-wght-normal.woff2',
  display: 'swap',
  variable: '--font-mono',
  weight: '100 800'
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — Data Science & Analytics`,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: `${siteConfig.name} — Data Science & Analytics`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: ['/hero-poster.jpg']
  }
};

export const viewport: Viewport = {
  themeColor: '#0a0908'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable} h-full scroll-smooth`}>
      <body className="min-h-screen font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
        <div className="fx-vignette" aria-hidden="true" />
        <div className="fx-grain" aria-hidden="true" />
        <Reticle />
      </body>
    </html>
  );
}
