import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Career from './pages/Career'
import { Toaster } from "react-hot-toast";
import Product from './pages/Product'
import ProductDetails from './pages/ProductDetails'
import ProtectedAdminRoute from './admin/routes/ProtectedAdminRoute'
import AdminLayout from './admin/layout/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import Products from './admin/pages/Products'
import CreateProduct from './admin/pages/CreateProduct'
import EditProduct from './admin/pages/EditProduct'
import Sizes from './admin/pages/Sizes'
import Surfaces from './admin/pages/Surfaces'
import Categories from './admin/pages/Categories'
import Login from './admin/pages/Login'
import { useLocation } from "react-router-dom";

const App = () => {
   const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
     <div className="text-default min-h-screen bg-white">
      <Toaster />
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/inquiry" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<CreateProduct />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="sizes" element={<Sizes />} />
              <Route path="surfaces" element={<Surfaces />} />
              <Route path="categories" element={<Categories />} />
            </Route>
          </Routes>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App