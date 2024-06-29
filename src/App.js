import "./App.css";
// import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Products from "./components/Products";
import AllProducts from "./components/AllProducts";
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Buy from './components/VideoBackground';
import PopupAuth from './components/PopupAuth';


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();


  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PopupAuth />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Products/:categoryName" element={<Products />} />
        <Route path="/Products" element={<AllProducts />} />
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;