import type { ReactNode } from 'react';
import { Footer, Header, ScrollToTop } from '../../components';
import AdminHeader from '../../admin/components/AdminHeader';
import AdminFooter from '../../admin/components/AdminFooter';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const accountType = localStorage.getItem("accountType") || "";
  const isAdmin = accountType === 'admin'

  return (
    <>
      <ScrollToTop />
      {isAdmin ? <AdminHeader/> : <Header />}
      {children}
      {isAdmin ? <AdminFooter/> : <Footer />}
    </>
  );
}
