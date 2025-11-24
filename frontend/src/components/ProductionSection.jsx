import React, { useState } from "react";
import "../styles/ProductionSection.css";
import { observer } from "mobx-react-lite";
import { cartStore } from "../stores/CartStore"; // Make sure this is the correct path.

const products = [
  {
    id: 1,
    name: "Oppo K13x 5G",
    price: "₹12,999",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=120&q=80",
    ram: "6 GB",
    storage: "128 GB",
    battery: "6000 mAh",
    camera: "50MP + 2MP",
    display: "16.94 cm HD+",
    processor: "Dimensity 6300",
    seller: "XONIGHT E-Commerce",
    warranty: "1 Year Manufacturer Warranty",
  },
  {
    id: 2,
    name: "iPhone 14",
    price: "₹57,999",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=120&q=80",
    ram: "6 GB",
    storage: "128 GB",
    battery: "3200 mAh",
    camera: "12MP",
    display: "15.94 cm Retina",
    processor: "A15 Bionic",
    seller: "Apple Store",
    warranty: "1 Year Manufacturer Warranty",
  },
  // ...add more products if needed
];

export default observer(function ProductSection() {
  const [selectedId, setSelectedId] = useState(null);

  // Add to cart function just calls MobX cartStore
  const handleAddToCart = (product) => cartStore.addToCart(product);

  return (
    <section className="product-section">
      <h2>Best deals on smartphones</h2>
      <div className="product-grid">
        {products.map((prod) => (
          <button
            className={`product-card${
              selectedId === prod.id ? " selected" : ""
            }`}
            key={prod.id}
            onClick={() =>
              setSelectedId(selectedId === prod.id ? null : prod.id)
            }
            tabIndex={0}
          >
            <img src={prod.image} alt={prod.name} className="product-img" />
            <div className="product-name">{prod.name}</div>
            <div className="product-price">{prod.price}</div>
            {selectedId === prod.id && (
              <div className="product-details">
                <div>RAM: {prod.ram}</div>
                <div>Storage: {prod.storage}</div>
                <div>Battery: {prod.battery}</div>
                <div>Camera: {prod.camera}</div>
                <div>Display: {prod.display}</div>
                <div>Processor: {prod.processor}</div>
                <div>Seller: {prod.seller}</div>
                <div>Warranty: {prod.warranty}</div>
                <div className="product-actions">
                  <button
                    className="cart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(prod);
                    }}
                  >
                    Add to Cart
                  </button>
                  {/* Only the button logic is here, cart UI is handled in Header */}
                  <button className="buy-btn">Buy Now</button>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
});
