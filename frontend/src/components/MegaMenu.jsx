import React, { useState } from "react";
import { megaMenuData } from "../data/megaMenuData";
import "../styles/MegaMenu.css";

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  return (
    <nav className="main-menu">
      {Object.keys(megaMenuData).map((category) => (
        <div className="main-menu-item" key={category}>
          <button
            className={`menu-btn${
              activeCategory === category ? " active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
          {activeCategory === category && (
            <div className="mega-dropdown">
              {megaMenuData[category].map((sectionObj) => (
                <div className="mega-section" key={sectionObj.section}>
                  <div className="mega-section-title">{sectionObj.section}</div>
                  <div className="mega-section-items">
                    {sectionObj.items.map((item) => (
                      <div className="mega-item" key={item}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
