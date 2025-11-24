import React, { useState } from "react";
import { megaMenuData } from "../data/megaMenuData";
import "../styles/CategoryMenu.css";

const categoryIcons = {
  Minutes: "⏱️",
  Electronics: "🔌",
  "TVs & Appliances": "📺",
  Men: "👔",
  Women: "👗",
  "Baby & Kids": "🧒",
  "Home & Furniture": "🛋️",
  "Sports, Books & More": "📚",
  Flights: "✈️",
  "Offer Zone": "🎉",
};

export default function CategoryMenu({ onDetectLocation }) {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div>
      <div className="category-btn-strip">
        {Object.keys(megaMenuData).map((cat) => (
          <button
            className={`category-btn${activeCategory === cat ? " active" : ""}`}
            key={cat}
            onClick={() =>
              setActiveCategory(activeCategory === cat ? null : cat)
            }
          >
            <span className="category-emoji">{categoryIcons[cat]}</span>
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="mega-dropdown-panel">
          {megaMenuData[activeCategory].map((section) => (
            <div className="mega-dropdown-section" key={section.section}>
              <div className="mega-dropdown-title">{section.section}</div>
              <div className="mega-dropdown-items">
                {section.items.map((item) =>
                  item === "Detect Location (Google Maps)" ? (
                    <div
                      className="mega-dropdown-item"
                      style={{
                        cursor: "pointer",
                        color: "#2874f0",
                        textDecoration: "underline",
                      }}
                      key={item}
                      onClick={onDetectLocation}
                    >
                      {item}
                    </div>
                  ) : (
                    <div className="mega-dropdown-item" key={item}>
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
