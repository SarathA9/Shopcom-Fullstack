import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Category from "./components/Category";
import Products from "./components/Products";
import AllProducts from "./components/AllProducts";
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Buy from './components/VideoBackground';
import PopupAuth from './components/PopupAuth';
import Cart from './components/Cart';
import SellerForm from './components/SellerForm';
import SellerPortal from "./components/SellerPortal";
import Checkout from './components/Checkout';
import Navbar from './components/Navbar';

 
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );. 
}

function AppContent() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<PopupAuth />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/cart" element={<Cart />}/>
        <Route path="/SellerForm" element={<SellerForm />}/>
        <Route path="/Products/:categoryName" element={<Products />} />
        <Route path="/Products" element={<AllProducts />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/SellerPortal" element={<SellerPortal/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/navbar" element={<Navbar/>}/>

      </Routes>
      <Footer/>
    </>
  );
}

export default App;