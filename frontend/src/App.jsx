import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import CategoryMenu from "./components/CategoryMenu";
import BannerCarousel from "./components/BannerCarousel";
import ProductSection from "./components/ProductionSection";
import SelectDeliveryLocation from "./components/SelectDeliveryLocation";
import ProfilePage from "./app/pages/ProfilePage";
import CartPage from "./app/pages/CartPage"; // You'll need to create this
import OrdersPage from "./app/pages/OrdersPage"; // You'll need to create this
import WishlistPage from "./app/pages/WishlistPage"; // You'll need to create this
import LoginPage from "./app/pages/LoginPage"; // You'll need to create this
import { PrimeReactProvider } from "primereact/api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  const [showLocationSection, setShowLocationSection] = useState(false);

  const handleDetectLocationClick = () => {
    setShowLocationSection(true);
  };

  // MainLayout component for pages that need header and footer
  const MainLayout = ({ children, showCategory = true }) => {
    return (
      <div className="app">
        <Header />
        {showCategory && (
          <CategoryMenu onDetectLocation={handleDetectLocationClick} />
        )}
        {showLocationSection && (
          <SelectDeliveryLocation
            onClose={() => setShowLocationSection(false)}
          />
        )}
        {children}
        <footer
          className="footer"
          style={{
            background: "#263238",
            color: "white",
            textAlign: "center",
            padding: "1rem 0",
            marginTop: "2rem",
          }}
        >
          © {new Date().getFullYear()} Flipkart Clone. All rights reserved.
        </footer>
      </div>
    );
  };

  // Home page component
  const Home = () => (
    <MainLayout>
      <BannerCarousel />
      <ProductSection />
      <main
        className="main-content"
        style={{ minHeight: "70vh", padding: "2rem" }}
      >
        <h2>Welcome to Flipkart</h2>
        <p>
          Explore top deals and products below. Add product cards or sections
          here.
        </p>
      </main>
    </MainLayout>
  );

  return (
    <PrimeReactProvider>
      <Router>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Profile Route */}
          <Route
            path="/profile"
            element={
              <MainLayout showCategory={false}>
                <ProfilePage />
              </MainLayout>
            }
          />

          {/* Cart Route */}
          <Route
            path="/cart"
            element={
              <MainLayout>
                <CartPage />
              </MainLayout>
            }
          />

          {/* Orders Route */}
          <Route
            path="/orders"
            element={
              <MainLayout>
                <OrdersPage />
              </MainLayout>
            }
          />

          {/* Wishlist Route */}
          <Route
            path="/wishlist"
            element={
              <MainLayout>
                <WishlistPage />
              </MainLayout>
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <MainLayout showCategory={false}>
                <LoginPage />
              </MainLayout>
            }
          />

          {/* Rewards Route */}
          <Route
            path="/rewards"
            element={
              <MainLayout>
                <div className="container" style={{ padding: "2rem" }}>
                  <h2>Rewards Page</h2>
                  <p>Rewards content coming soon...</p>
                </div>
              </MainLayout>
            }
          />

          {/* Gift Cards Route */}
          <Route
            path="/gift-cards"
            element={
              <MainLayout>
                <div className="container" style={{ padding: "2rem" }}>
                  <h2>Gift Cards</h2>
                  <p>Gift cards content coming soon...</p>
                </div>
              </MainLayout>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
