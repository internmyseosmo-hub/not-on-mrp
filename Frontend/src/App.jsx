import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header.jsx";
import TopNav from "./components/TopNav.jsx";
import HeroSection from "./components/HeroSection.jsx";
import CategoryGrid from "./components/CategoryGrid.jsx";
import FeaturesBar from "./components/FeaturesBar.jsx";
import ProductSpotlight from "./components/ProductSpotlight.jsx";
import TopPicks from "./components/TopPicks.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Footer from "./components/Footer.jsx";
import MobileDrawer from "./components/MobileDrawer.jsx";
import MobileBottomNav from "./components/MobileBottomNav.jsx";
import ProductDetailPage from "./components/ProductDetailPage.jsx";
import ProductCatalogPage from "./components/ProductCatalogPage.jsx";
import NewArrivalsPage from "./components/NewArrivalsPage.jsx";
import DealsPage from "./components/DealsPage.jsx";
import ContactPage from "./components/ContactPage.jsx";
import CartPage from "./components/CartPage.jsx";
import WishlistPage from "./components/WishlistPage.jsx";
import CheckoutPage from "./components/CheckoutPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import AccountPage from "./components/AccountPage.jsx";
import HomeDeals from "./components/HomeDeals.jsx";
import BlogPage from "./components/BlogPage.jsx";
import BlogPostPage from "./components/BlogPostPage.jsx";
import FranchisePage from "./components/FranchisePage.jsx";
import FranchiseApplicationPage from "./components/FranchiseApplicationPage.jsx";
import TrackOrderPage from "./components/TrackOrderPage.jsx";
import TermsandConditions from "./components/TermsandConditions.jsx";
import PrivacyPolicy from "./components/PrivacyPolicy.jsx";
import AdminHome from "./admin/Home.jsx";
import AdminDeals from "./admin/DealsAndOffers.jsx";
import AdminLogin from "./admin/Login.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import AdminDashboard from "./admin/Dashboard.jsx";
import AdminAbout from "./admin/About.jsx";
import AdminBlog from "./admin/Blog.jsx";
import AdminProduct from "./admin/Product.jsx";
import AdminContact from "./admin/Contact.jsx";
import AdminUser from "./admin/User.jsx";
import AdminFranchise from "./admin/AdminFranchise.jsx";
import AdminOrders from "./admin/AdminOrders.jsx";
import { Helmet } from "react-helmet-async";

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const handleToggleSearch = () => setIsSearchOpen((prev) => !prev);

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty <= 0) return prev.filter((item) => item.id !== product.id);
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      if (quantity <= 0) return prev;
      return [...prev, { ...product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    navigate("/admin/dashboard");
  };

  useEffect(() => {
    // Check for existing user session
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Session expired");
          return res.json();
        })
        .then((data) => {
          if (data.success && data.data) {
            handleLogin({
              name: data.data.fullName || data.data.email.split("@")[0],
              email: data.data.email,
              phone: data.data.mobile || "",
              avatar: (data.data.fullName || data.data.email)[0].toUpperCase(),
              _id: data.data._id
            });
          }
        })
        .catch((err) => {
          console.error(err.message);
          localStorage.removeItem("token");
        });
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen bg-white font-body text-brand-ink selection:bg-brand-yellow selection:text-brand-ink pb-16 md:pb-0">
      <Helmet>
        <title>Not On MRP | Best Deals on Electronics, Car Care and More</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Get the best deals on premium car care, electronics, and daily essentials at Not On MRP. Enjoy guaranteed prices below Maximum Retail Price. Shop now!" />
      </Helmet>
      {!isAdminRoute && (
        <>
          <MobileDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            cartCount={cartCount}
          />
          <Header
            cartCount={cartCount}
            onOpenDrawer={handleOpenDrawer}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogout={handleLogout}
          />
          <TopNav />
        </>
      )}

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <HomeDeals />
              <CategoryGrid />
              <FeaturesBar />
              <ProductSpotlight />
              <TopPicks onAddToCart={handleAddToCart} />
              <Testimonials />
            </>
          } />
          
          <Route path="/deals" element={<DealsPage onAddToCart={handleAddToCart} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage onAddToCart={handleAddToCart} />} />
          <Route path="/catalog" element={<ProductCatalogPage onAddToCart={handleAddToCart} />} />
          <Route path="/catalog/:category" element={<ProductCatalogPage onAddToCart={handleAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/apply-franchise" element={<FranchiseApplicationPage />} />
          <Route path="/cart" element={<CartPage cartItems={cartItems} onUpdateQuantity={handleUpdateCartQuantity} onRemoveItem={handleRemoveFromCart} />} />
          <Route path="/wishlist" element={<WishlistPage onAddToCart={handleAddToCart} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onClearCart={handleClearCart} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/account" element={<AccountPage user={currentUser} onLogout={handleLogout} onUpdateUser={(updatedUser) => setCurrentUser({ ...currentUser, ...updatedUser })} />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/terms-and-conditions" element={<TermsandConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={
            !isAdminLoggedIn ? (
              <AdminLogin onLogin={handleAdminLogin} />
            ) : (
              <AdminLayout
                onLogout={() => {
                  setIsAdminLoggedIn(false);
                  localStorage.removeItem("adminToken");
                  navigate("/admin/login");
                }}
              >
                <Routes>
                  <Route path="" element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="home" element={<AdminHome />} />
                  <Route path="about" element={<AdminAbout />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="products" element={<AdminProduct />} />
                  <Route path="deals" element={<AdminDeals />} />
                  <Route path="contact" element={<AdminContact />} />
                  <Route path="franchise" element={<AdminFranchise />} />
                  <Route path="users" element={<AdminUser />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="*" element={<Navigate to="dashboard" replace />} />
                </Routes>
              </AdminLayout>
            )
          } />

          {/* Catch all 404 */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-slate-50/60">
              <h1 className="text-9xl font-black text-brand-yellow drop-shadow-md">404</h1>
              <h2 className="mt-4 text-3xl font-bold text-brand-ink">Page Not Found</h2>
              <p className="mt-2 text-gray-500 max-w-md mx-auto">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
              <button onClick={() => navigate("/")} className="mt-8 bg-brand-ink text-white px-8 py-3.5 rounded-full font-bold hover:bg-black transition-all active:scale-95 shadow-xl">
                Back to Home
              </button>
            </div>
          } />
        </Routes>
      </main>

      {!isAdminRoute && (
        <>
          <Footer />
          <MobileBottomNav
            cartCount={cartCount}
            onOpenDrawer={handleOpenDrawer}
            onToggleSearch={handleToggleSearch}
          />
        </>
      )}
    </div>
  );
}
