import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";

const HamburgerMenu = () => {
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => navigate("/profile"),
    },
    {
      label: "Orders",
      icon: "pi pi-shopping-bag",
      command: () => navigate("/orders"),
    },
    {
      label: "Wishlist",
      icon: "pi pi-heart",
      command: () => navigate("/wishlist"),
    },
    {
      label: "Rewards",
      icon: "pi pi-star",
      command: () => navigate("/rewards"),
    },
    {
      label: "Gift Cards",
      icon: "pi pi-gift",
      command: () => navigate("/gift-cards"),
    },
    {
      separator: true,
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        // Handle logout logic
        console.log("Logout clicked");
      },
    },
  ];

  return (
    <div className="hamburger-menu-container">
      <Button
        icon="pi pi-bars"
        border="#667eea"
        className="hamburger-button p-button-text p-button-rounded"
        onClick={(e) => menuRef.current.toggle(e)}
        aria-label="Menu"
      />
      <Menu
        model={menuItems}
        popup
        ref={menuRef}
        className="hamburger-menu-popup"
      />
    </div>
  );
};

export default HamburgerMenu;
