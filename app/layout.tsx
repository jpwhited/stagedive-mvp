import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'StageDive',
  description: 'MVP',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
