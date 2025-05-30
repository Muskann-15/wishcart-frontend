import { Route, Routes } from 'react-router-dom'
import { HomePage, CategoryPage } from "../../pages";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category" element={<CategoryPage />} />
    </Routes>
  )
}