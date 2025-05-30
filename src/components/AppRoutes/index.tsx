import { Route, Routes } from 'react-router-dom'
import { HomePage, CategoryPage, CartPage } from "../../pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  )
}