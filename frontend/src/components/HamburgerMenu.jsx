import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-cyan/theme.css"; // already included in your project
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const menuOptions = [
  {
    label: "Profile",
    icon: "pi pi-user",
  },
  {
    label: "Orders",
    icon: "pi pi-book",
  },
  {
    label: "Wishlist",
    icon: "pi pi-heart",
  },
  {
    label: "Rewards",
    icon: "pi pi-star",
  },
  {
    label: "GiftCards",
    icon: "pi pi-gift",
  },
];

const HamburgerMenu = () => {
  const menu = useRef(null);

  return (
    <div style={{ display: "inline-block", position: "relative" }}>
      <Button
        icon="pi pi-bars"
        label="Menu"
        size="small"
        onClick={(e) => menu.current.toggle(e)}
        aria-controls="menu_popup"
        aria-haspopup
        className="menu-btn"
      />
      <Menu
        model={menuOptions}
        popup
        ref={menu}
        id="menu_popup"
        style={{ minWidth: 160 }}
      />
    </div>
  );
};

export default HamburgerMenu;
