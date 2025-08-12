import './globals.css';
import { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}