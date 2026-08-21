import { useState, useEffect } from "react";
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
import AdminHome from "../admin/Home.jsx";
import AdminDeals from "../admin/DealsAndOffers.jsx";
import AdminLogin from "../admin/Login.jsx";

function getRouteFromHash() {
  const hash = decodeURIComponent(window.location.hash.replace("#", ""));
  if (!hash || hash === "home") {
    return { page: "home", param: null };
  }
  if (hash === "deals") {
    return { page: "deals", param: null };
  }
  if (hash === "contact") {
    return { page: "contact", param: null };
  }
  if (hash === "catalog") {
    return { page: "catalog", param: "All" };
  }
  if (hash.startsWith("catalog/")) {
    const category = hash.replace("catalog/", "");
    return { page: "catalog", param: category || "All" };
  }
  if (hash === "new-arrivals") {
    return { page: "new-arrivals", param: null };
  }
  if (hash === "about") {
    return { page: "about", param: null };
  }
  if (hash === "blog") {
    return { page: "blog", param: null };
  }
  if (hash.startsWith("blog/")) {
    const id = parseInt(hash.split("/")[1], 10);
    return { page: "blog-post", param: isNaN(id) ? 1 : id };
  }
  if (hash === "franchise") {
    return { page: "franchise", param: null };
  }
  if (hash === "apply-franchise") {
    return { page: "apply-franchise", param: null };
  }
  if (hash === "cart") {
    return { page: "cart", param: null };
  }
  if (hash === "wishlist") {
    return { page: "wishlist", param: null };
  }
  if (hash === "checkout") {
    return { page: "checkout", param: null };
  }
  if (hash === "login") {
    return { page: "login", param: null };
  }
  if (hash === "account") {
    return { page: "account", param: null };
  }
  if (hash === "track-order") {
    return { page: "track-order", param: null };
  }
  if (hash === "admin" || hash === "admin-home") {
    return { page: "admin", param: null };
  }
  if (hash === "admin-deals") {
    return { page: "admin-deals", param: null };
  }
  if (hash.startsWith("product/")) {
    const id = parseInt(hash.split("/")[1], 10);
    return { page: "product", param: isNaN(id) ? 1 : id };
  }
  return { page: "home", param: null };
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleOpenDrawer = () => setIsDrawerOpen(true);
  const handleCloseDrawer = () => setIsDrawerOpen(false);
  const handleToggleSearch = () => setIsSearchOpen((prev) => !prev);

  const handleAddToCart = (product, quantity = 1) => {
    setCartCount((prev) => prev + quantity);
  };

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };
  
  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    if (currentPage === "admin" || currentPage === "admin-home" || currentPage === "admin-deals") {
       // already on an admin route, just re-render
    } else {
       navigateTo("admin");
    }
  };

  // Sync state from URL hash and handle browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const route = getRouteFromHash();
      setCurrentPage(route.page);
      if (route.page === "product" && typeof route.param === "number") {
        setSelectedProductId(route.param);
      } else if (route.page === "catalog" && typeof route.param === "string") {
        setSelectedCategory(route.param);
      }
    };

    // Initialize from current hash on load
    handleLocationChange();

    // Listen to browser Back / Forward actions
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigateTo = (page, param = null, pushHistory = true) => {
    let hash = "#home";
    if (page === "catalog") {
      const cat = typeof param === "string" ? param : "All";
      setSelectedCategory(cat);
      hash = cat !== "All" ? `#catalog/${encodeURIComponent(cat)}` : "#catalog";
    } else if (page === "deals") {
      hash = "#deals";
    } else if (page === "contact") {
      hash = "#contact";
    } else if (page === "new-arrivals") {
      hash = "#new-arrivals";
    } else if (page === "about") {
      hash = "#about";
    } else if (page === "blog") {
      hash = "#blog";
    } else if (page === "blog-post" && param !== null) {
      hash = `#blog/${param}`;
    } else if (page === "franchise") {
      hash = "#franchise";
    } else if (page === "apply-franchise") {
      hash = "#apply-franchise";
    } else if (page === "cart") {
      hash = "#cart";
    } else if (page === "wishlist") {
      hash = "#wishlist";
    } else if (page === "checkout") {
      hash = "#checkout";
    } else if (page === "login") {
      hash = "#login";
    } else if (page === "account") {
      hash = "#account";
    } else if (page === "track-order") {
      hash = "#track-order";
    } else if (page === "admin") {
      hash = "#admin";
    } else if (page === "admin-home") {
      hash = "#admin-home";
    } else if (page === "admin-deals") {
      hash = "#admin-deals";
    } else if (page === "product" && param !== null) {
      if (typeof param === "number") {
        setSelectedProductId(param);
      }
      hash = `#product/${param}`;
    }

    setCurrentPage(page);

    if (pushHistory && window.location.hash !== hash) {
      window.history.pushState({ page, param }, "", hash);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-white font-body text-brand-ink selection:bg-brand-yellow selection:text-brand-ink pb-16 md:pb-0">
      {!currentPage.startsWith("admin") && (
        <>
          {/* Slide-out navigation drawer for mobile/tablet */}
          <MobileDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            cartCount={cartCount}
            onNavigate={navigateTo}
          />

          {/* Header with logo, desktop search, mobile search toggle & utilities */}
          <Header
            cartCount={cartCount}
            onOpenDrawer={handleOpenDrawer}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            onNavigateToHome={(page = "home") => navigateTo(page)}
            onNavigate={navigateTo}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogout={handleLogout}
          />

          {/* Category nav strip */}
          <TopNav
            currentPage={currentPage}
            onNavigate={navigateTo}
          />
        </>
      )}

      {/* Main Page View Switcher */}
      <main>
        {currentPage === "home" && (
          <>
            <HeroSection onNavigate={navigateTo} />
            <HomeDeals onNavigate={navigateTo} />
            <CategoryGrid onNavigate={navigateTo} />
            <FeaturesBar />
            <ProductSpotlight onNavigate={navigateTo} />
            <TopPicks onNavigate={navigateTo} onAddToCart={handleAddToCart} />
            <Testimonials />
          </>
        )}

        {currentPage === "deals" && (
          <DealsPage
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === "contact" && (
          <ContactPage
            onNavigate={navigateTo}
          />
        )}

        {currentPage === "new-arrivals" && (
          <NewArrivalsPage
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === "catalog" && (
          <ProductCatalogPage
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
            initialCategory={selectedCategory}
          />
        )}

        {currentPage === "product" && (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={navigateTo}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === "about" && (
          <AboutUs onNavigateToHome={() => navigateTo("home")} />
        )}

        {currentPage === "blog" && (
          <BlogPage onNavigate={navigateTo} />
        )}

        {currentPage === "blog-post" && (
          <BlogPostPage 
            postId={typeof selectedProductId === 'number' ? selectedProductId : 1} 
            onNavigate={navigateTo} 
          />
        )}

        {currentPage === "franchise" && (
          <FranchisePage onNavigate={navigateTo} />
        )}

        {currentPage === "apply-franchise" && (
          <FranchiseApplicationPage onNavigate={navigateTo} />
        )}

        {currentPage === "cart" && (
          <CartPage onNavigate={navigateTo} />
        )}

        {currentPage === "wishlist" && (
          <WishlistPage onNavigate={navigateTo} onAddToCart={handleAddToCart} />
        )}

        {currentPage === "checkout" && (
          <CheckoutPage onNavigate={navigateTo} />
        )}

        {currentPage === "login" && (
          <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />
        )}

        {currentPage === "account" && (
          <AccountPage onNavigate={navigateTo} user={currentUser} onLogout={handleLogout} />
        )}

        {currentPage === "track-order" && (
          <TrackOrderPage onNavigate={navigateTo} />
        )}

        {/* Admin Routes Protection */}
        {currentPage.startsWith("admin") && !isAdminLoggedIn && (
          <AdminLogin onLogin={handleAdminLogin} />
        )}

        {currentPage === "admin" && isAdminLoggedIn && (
          <AdminHome onNavigate={navigateTo} />
        )}
        
        {currentPage === "admin-deals" && isAdminLoggedIn && (
          <AdminDeals onNavigate={navigateTo} />
        )}
      </main>

      {!currentPage.startsWith("admin") && (
        <>
          {/* Comprehensive Footer */}
          <Footer onNavigate={navigateTo} />

          {/* Mobile Sticky Bottom Action Bar */}
          <MobileBottomNav
            cartCount={cartCount}
            onOpenDrawer={handleOpenDrawer}
            onToggleSearch={handleToggleSearch}
            onNavigateToHome={() => navigateTo("home")}
          />
        </>
      )}
    </div>
  );
}
