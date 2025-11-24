import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/BannerCarousel.css";

const bannerImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=900&q=80",
];

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2500,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  beforeChange: (oldIndex, newIndex) => {},
  afterChange: () => {},
};

export default function BannerCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const sliderSettings = {
    ...settings,
    beforeChange: (oldIndex, newIndex) => setCurrentIdx(newIndex),
  };

  return (
    <div className="banner-carousel">
      <Slider {...sliderSettings}>
        {bannerImages.map((src, idx) => (
          <div key={idx}>
            <img src={src} alt={`Banner ${idx + 1}`} className="banner-img" />
          </div>
        ))}
      </Slider>
      {/* Slider progress bar */}
      <div className="carousel-bars">
        {bannerImages.map((_, idx) => (
          <div
            key={idx}
            className={`carousel-bar${currentIdx === idx ? " active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
