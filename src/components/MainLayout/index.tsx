import type { ReactNode } from 'react';
import { Footer, Header, ScrollToTop } from '../../components';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
    <ScrollToTop />
      <Header />
      {children}
      <Footer />
    </>
  );
}
