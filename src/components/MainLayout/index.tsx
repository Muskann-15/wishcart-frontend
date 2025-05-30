import type { ReactNode } from 'react';
import { Footer, Header } from '../../components';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
