import React, { useState } from "react";
import Header from "./components/Header";
import CategoryMenu from "./components/CategoryMenu";
import BannerCarousel from "./components/BannerCarousel";
import ProductSection from "./components/ProductionSection";
import SelectDeliveryLocation from "./components/SelectDeliveryLocation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import "primereact/resources/themes/lara-light-cyan/theme.css"; // or other theme
import "primereact/resources/primereact.min.css"; // core PrimeReact

function App() {
  const [showLocationSection, setShowLocationSection] = useState(false);

  // This will be called from CategoryMenu.jsx
  const handleDetectLocationClick = () => {
    setShowLocationSection(true);
  };

  return (
    <div className="app">
      <Header />
      <CategoryMenu onDetectLocation={handleDetectLocationClick} />
      <BannerCarousel />
      <ProductSection />
      {/*  <Cart />
      <AuthInfo />*/}
      {showLocationSection && (
        <SelectDeliveryLocation onClose={() => setShowLocationSection(false)} />
      )}
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
      <footer
        className="footer"
        style={{
          background: "#263238",
          color: "white",
          textAlign: "center",
          padding: "1rem 0",
        }}
      >
        © {new Date().getFullYear()} Flipkart Clone. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
