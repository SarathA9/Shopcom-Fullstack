import "./App.css";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Products from "./components/Products";
import AllProducts from "./components/AllProducts";
import Footer from './components/Footer';
import AuthPage from './components/AuthPage';
import Buy from './components/VideoBackground';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current route is /VideoBackground
  const isVideoBackgroundRoute = location.pathname === "/buy";

  return (
    <>
      {!isVideoBackgroundRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Products/:categoryName" element={<Products />} />
        <Route path="/Products" element={<AllProducts />} />
      </Routes>
      {!isVideoBackgroundRoute && <Footer />}
    </>
  );
}

export default App;