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
import { Helmet } from "react-helmet-async";

function getRouteFromPath() {
  let path = decodeURIComponent(window.location.pathname.replace(/^\/+/, ""));
  path = path.replace(/\/+$/, "");

  if (!path || path === "home") {
    return { page: "home", param: null };
  }
  if (path === "deals") {
    return { page: "deals", param: null };
  }
  if (path === "about") {
    return { page: "about", param: null };
  }
  if (path === "blog") {
    return { page: "blog", param: null };
  }
  if (path.startsWith("blog/")) {
    const id = parseInt(path.split("/")[1], 10);
    return { page: "blog-post", param: isNaN(id) ? 1 : id };
  }
  if (path === "franchise") {
    return { page: "franchise", param: null };
  }
  if (path === "apply-franchise") {
    return { page: "apply-franchise", param: null };
  }
  if (path === "cart") {
    return { page: "cart", param: null };
  }
  if (path === "wishlist") {
    return { page: "wishlist", param: null };
  }
  if (path === "checkout") {
    return { page: "checkout", param: null };
  }
  if (path === "login") {
    return { page: "login", param: null };
  }
  if (path === "account") {
    return { page: "account", param: null };
  }
  if (path === "track-order") {
    return { page: "track-order", param: null };
  }
  if (path === "admin" || path === "admin/") {
    return { page: "admin", param: "dashboard" };
  }
  if (path.startsWith("admin/")) {
    const sub = path.replace("admin/", "");
    return { page: "admin", param: sub };
  }
  if (path.startsWith("product/")) {
    const id = parseInt(path.split("/")[1], 10);
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
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );
  const [adminSubpage, setAdminSubpage] = useState("dashboard");

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
    localStorage.removeItem("token");
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    if (currentPage === "admin" && adminSubpage !== "login") {
      // already on an admin route, just re-render
    } else {
      navigateTo("admin", "dashboard");
    }
  };

  // Sync state from URL path and handle browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const route = getRouteFromPath();
      setCurrentPage(route.page);
      if (route.page === "product" && typeof route.param === "number") {
        setSelectedProductId(route.param);
      } else if (route.page === "catalog" && typeof route.param === "string") {
        setSelectedCategory(route.param);
      } else if (route.page === "admin") {
        setAdminSubpage(route.param || "dashboard");
      }
    };

    // Initialize from current path on load
    handleLocationChange();

    // Check for existing user session
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://127.0.0.1:3000/api/users/profile", {
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

    // Listen to browser Back / Forward actions
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const navigateTo = (page, param = null, pushHistory = true) => {
    let path = "/home";
    if (page === "catalog") {
      const cat = typeof param === "string" ? param : "All";
      setSelectedCategory(cat);
      path = cat !== "All" ? `/catalog/${encodeURIComponent(cat)}` : "/catalog";
    } else if (page === "deals") {
      path = "/deals";
    } else if (page === "contact") {
      path = "/contact";
    } else if (page === "new-arrivals") {
      path = "/new-arrivals";
    } else if (page === "about") {
      path = "/about";
    } else if (page === "blog") {
      path = "/blog";
    } else if (page === "blog-post" && param !== null) {
      path = `/blog/${param}`;
    } else if (page === "franchise") {
      path = "/franchise";
    } else if (page === "apply-franchise") {
      path = "/apply-franchise";
    } else if (page === "cart") {
      path = "/cart";
    } else if (page === "wishlist") {
      path = "/wishlist";
    } else if (page === "checkout") {
      path = "/checkout";
    } else if (page === "login") {
      path = "/login";
    } else if (page === "account") {
      path = "/account";
    } else if (page === "track-order") {
      path = "/track-order";
    } else if (page === "admin") {
      path = !param || param === "dashboard" ? "/admin" : `/admin/${param}`;
      if (param) setAdminSubpage(param);
    } else if (page === "product" && param !== null) {
      if (typeof param === "number") {
        setSelectedProductId(param);
      }
      path = `/product/${param}`;
    }

    setCurrentPage(page);

    if (pushHistory && window.location.pathname !== path) {
      window.history.pushState({ page, param }, "", path);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-white font-body text-brand-ink selection:bg-brand-yellow selection:text-brand-ink pb-16 md:pb-0">
      <Helmet>
        <title>Not On MRP | Best Deals on Electronics, Car Care and More</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Get the best deals on premium car care, electronics, and daily essentials at Not On MRP. Enjoy guaranteed prices below Maximum Retail Price. Shop now!" />
      </Helmet>
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
          <AccountPage onNavigate={navigateTo} user={currentUser} onLogout={handleLogout} onUpdateUser={(updatedUser) => setCurrentUser({ ...currentUser, ...updatedUser })} />
        )}

        {currentPage === "track-order" && (
          <TrackOrderPage onNavigate={navigateTo} />
        )}

        {/* Admin Routes Protection */}
        {currentPage === "admin" && !isAdminLoggedIn && (
          <AdminLogin onLogin={handleAdminLogin} />
        )}

        {currentPage === "admin" && isAdminLoggedIn && (
          <AdminLayout
            activePage={adminSubpage}
            onNavigate={navigateTo}
            onLogout={() => {
              setIsAdminLoggedIn(false);
              localStorage.removeItem("adminToken");
              navigateTo("admin", "login");
            }}
          >
            {adminSubpage === "dashboard" && <AdminDashboard />}
            {adminSubpage === "home" && <AdminHome onNavigate={navigateTo} />}
            {adminSubpage === "about" && <AdminAbout />}
            {adminSubpage === "blog" && <AdminBlog />}
            {adminSubpage === "products" && <AdminProduct />}
            {adminSubpage === "deals" && <AdminDeals onNavigate={navigateTo} />}
            {adminSubpage === "contact" && <AdminContact />}
            {adminSubpage === "franchise" && <AdminFranchise />}
            {adminSubpage === "users" && <AdminUser />}
          </AdminLayout>
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
