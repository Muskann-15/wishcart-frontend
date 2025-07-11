import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import {
  HomePage,
  CollectionPage,
  SearchPage,
  ProfilePage,
  WishlistPage,
  CategoryPage,
  LoginPage,
  RegisterPage,
  ExclusiveBuyingPage,
  CartPage,
  PaymentSuccess,
  PaymentFailed,
} from "../../pages";
import { ADMIN_DASHBOARD_URL, CART_URL, CATEGORY_URL, COLLECTIONPAGE_URL, HOMEPAGE_URL, LOGIN_URL, PAYMENT_FAILED_URL, PAYMENT_SUCCESS_URL, PRODUCT_PAGE_URL, PROFILEPAGE_URL, REGISTER_URL, SEARCHPAGE_URL, WISHLISTPAGE_URL } from '../../constants/routes';
import AdminDashboardPage from '../../admin/pages/Dashboard';
import { useEffect } from 'react';
import ProtectedRoute from '../../routes/ProtectedRoute';
import PublicRoute from '../../routes/PublicRoute';
import NotFoundPage from '../NotFound';

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
          <Route path={SEARCHPAGE_URL} element={<SearchPage />} />
          <Route path={PROFILEPAGE_URL} element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path={WISHLISTPAGE_URL} element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
          <Route path={`${PRODUCT_PAGE_URL}/:id`} element={<ExclusiveBuyingPage />} />
          <Route path={CART_URL} element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path={PAYMENT_SUCCESS_URL} element={<PaymentSuccess />} />
          <Route path={PAYMENT_FAILED_URL} element={<PaymentFailed />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        :
        <Routes>
          <Route path={ADMIN_DASHBOARD_URL} element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        </Routes>
      }
    </>
  )
}