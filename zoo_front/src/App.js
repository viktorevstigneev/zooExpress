import "./App.css";
import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import SavedPage from "./components/pages/SavedPage/SavedPage";

const SignInPage = lazy(() => import("./components/pages/SignIn"));
const SignUpPage = lazy(() => import("./components/pages/Signup"));
const MainPage = lazy(() => import("./components/pages/MainPage"));
const ClothesPage = lazy(() => import("./components/pages/ClothesPage"));
const ProfilePage = lazy(() => import("./components/pages/ProfilePage"));
const AdminPage = lazy(() => import("./components/pages/AdminPanel"));
const CartPage = lazy(() => import("./components/pages/CartPage"));
const ContactPage = lazy(() => import("./components/pages/ContactPage"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={"load"}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<MainPage />} />
          <Route path="/clothes" element={<ClothesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
        {/* <Navigate  to="/main" /> */}
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
