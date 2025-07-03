import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  HomePage,
  CollectionPage,
  OutletPage,
  CareersPage,
  PressPage,
  BlogPage,
  DocumentationPage,
  HelpCenterPage,
  TutorialsPage,
  CommunityPage,
  CookiePolicyPage,
  GdprPage,
  SearchPage,
  ProfilePage,
  WishlistPage,
  CategoryPage,
  LoginPage,
  RegisterPage,
  ExclusiveBuyingPage,
  CartPage,
} from "../../pages";
import { ADMIN_DASHBOARD_URL, BLOGPAGE_URL, CAREERSPAGE_URL, CART_URL, CATEGORY_URL, COLLECTIONPAGE_URL, COMMUNITYPAGE_URL, COOKIEPAGE_URL, DOCUMENTATIONPAGE_URL, GDPRPAGE_URL, HELPPAGE_URL, HOMEPAGE_URL, LOGIN_URL, OUTLETPAGE_URL, PRESSPAGE_URL, PRODUCT_PAGE_URL, PROFILEPAGE_URL, REGISTER_URL, SEARCHPAGE_URL, TUTORIALPAGE_URL, WISHLISTPAGE_URL } from '../../constants/routes';
import AdminDashboardPage from '../../admin/pages/Dashboard';
import { useEffect } from 'react';
import ProtectedRoute from '../../routes/ProtectedRoute';
import PublicRoute from '../../routes/PublicRoute';

export default function AppRoutes() {
  const location = useLocation()
  const navigate = useNavigate()
  const accountType = localStorage.getItem("accountType") || "";
  const isAdmin = accountType === 'admin'
  const adminRoutes = [ADMIN_DASHBOARD_URL]

  useEffect(() => {
    const currentPath = location.pathname;
    const isAdminPath = adminRoutes.includes(currentPath);

    if (isAdmin && !isAdminPath && currentPath !== ADMIN_DASHBOARD_URL) {
      navigate(ADMIN_DASHBOARD_URL);
    } else if (!isAdmin && isAdminPath) {
      navigate(HOMEPAGE_URL);
    }
  }, [isAdmin, location.pathname, navigate]);

  return (
    <>
      {!isAdmin ?
        <Routes>
          <Route path={LOGIN_URL} element={<PublicRoute><LoginPage /> </PublicRoute>} />
          <Route path={REGISTER_URL} element={<PublicRoute><RegisterPage /> </PublicRoute>} />
          <Route path={HOMEPAGE_URL} element={<HomePage />} />
          <Route path={CATEGORY_URL} element={<CategoryPage />} />
          <Route path={COLLECTIONPAGE_URL} element={<CollectionPage />} />
          <Route path={OUTLETPAGE_URL} element={<OutletPage />} />
          <Route path={CAREERSPAGE_URL} element={<CareersPage />} />
          <Route path={PRESSPAGE_URL} element={<PressPage />} />
          <Route path={BLOGPAGE_URL} element={<BlogPage />} />
          <Route path={DOCUMENTATIONPAGE_URL} element={<DocumentationPage />} />
          <Route path={HELPPAGE_URL} element={<HelpCenterPage />} />
          <Route path={TUTORIALPAGE_URL} element={<TutorialsPage />} />
          <Route path={COMMUNITYPAGE_URL} element={<CommunityPage />} />
          <Route path={COOKIEPAGE_URL} element={<CookiePolicyPage />} />
          <Route path={GDPRPAGE_URL} element={<GdprPage />} />
          <Route path={SEARCHPAGE_URL} element={<SearchPage />} />
          <Route path={PROFILEPAGE_URL} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path={WISHLISTPAGE_URL} element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path={`${PRODUCT_PAGE_URL}/:id`} element={<ExclusiveBuyingPage />} />
          <Route path={CART_URL} element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        </Routes>
        :
        <Routes>
          <Route path={ADMIN_DASHBOARD_URL} element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        </Routes>
      }
    </>
  )
}