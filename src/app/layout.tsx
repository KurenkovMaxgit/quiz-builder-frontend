import '@/app/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { PrimeProvider } from '@/providers/prime-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { StoreProvider } from '@/providers/store-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { SidebarLayout } from '@/components/layout/sidebar-layout';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = { title: 'Quiz Builder' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <PrimeProvider>
            <StoreProvider>
              <ToastProvider>
                <SidebarLayout>{children}</SidebarLayout>
              </ToastProvider>
            </StoreProvider>
          </PrimeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
