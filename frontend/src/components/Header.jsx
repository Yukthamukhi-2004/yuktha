import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import HamburgerMenu from "./HamburgerMenu";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import { cartStore } from "../stores/CartStore";
import { observer } from "mobx-react-lite";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/header.css";

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&.,;:])[A-Za-z\d@$!%*#?&.,;:]{10,16}$/;

const Header = observer(() => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showForgetPswd, setForgetPswd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const op = useRef(null);
  const loginPanel = useRef(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!passwordPattern.test(form.password)) {
      errs.password =
        "Password must be 10-16 chars, and include uppercase, lowercase, number, and special character.";
    }
    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    return errs;
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    alert(`LogIn as:\nName: ${form.name}\nEmail: ${form.email}`);
    setShowLogin(false);
    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleForgetPswd = (e) => {
    e.preventDefault();
  };

  // Generates and "sends" (shows) a random OTP

  const handleSignIn = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    alert(
      `Signed in as:\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}`,
    );
    setShowSignIn(false);
    setForm({ name: "", email: "", phone: "" });
    setErrors({});
  };

  return (
    <header className="header">
      <SearchBar />
      <div
        className="header-actions"
        style={{ display: "flex", alignItems: "center", gap: "1rem" }}
      >
        <Button
          label="Login / Sign In"
          icon="pi pi-user"
          className="p-button-rounded p-button-info"
          style={{ minWidth: 110, fontWeight: 600 }}
          onClick={(e) => loginPanel.current.toggle(e)}
        />

        <OverlayPanel ref={loginPanel} showCloseIcon dismissable>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              minWidth: 160,
            }}
          >
            <Button
              label="Login"
              icon="pi pi-user-plus"
              style={{ width: "100%" }}
              severity="success"
              onClick={() => {
                setShowLogin(true);
                setShowSignIn(false);
              }}
            />
            <Button
              label="Sign In"
              icon="pi pi-user-plus"
              style={{ width: "100%" }}
              severity="success"
              onClick={() => {
                setShowSignIn(true);
                setShowLogin(false);
                loginPanel.current.hide();
              }}
            />
            <Button
              label="Logout"
              icon="pi pi-sign-out"
              style={{ width: "100%" }}
              severity="danger"
              onClick={() => alert("you have Logout ")}
            />
          </div>
        </OverlayPanel>

        <Dialog
          header="Login"
          visible={showLogin}
          style={{ width: "100%", maxWidth: "300px" }}
          modal
          draggable
          resizable
          onHide={() => setShowLogin(false)}
        >
          <form
            onSubmit={handleLogIn}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <span className="p-float-label">
              <InputText
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoFocus
              />
              <label htmlFor="name">Full Name</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                keyfilter="email"
              />
              <label htmlFor="email">Email</label>
            </span>
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                toggleMask
                feedback={false}
                minLength={10}
                maxLength={16}
                promptLabel="Create a password"
                weakLabel="Weak"
                mediumLabel="Medium"
                strongLabel="Strong"
              />
              <label htmlFor="password">Password</label>
            </span>
            <span
              className="header-actions"
              style={{
                color: "#5b94f0ff",
                cursor: "pointer",
                display: "flex",
                flexdirection: "column",
                position: "center",
              }}
              onClick={() => {
                setShowSignIn(false);
                setForgetPswd(true);
                loginPanel.current &&
                  loginPanel.current.hide &&
                  loginPanel.current.hide();
              }}
            >
              Forget Password?
            </span>
            <Button
              type="submit"
              label="LogIn"
              severity="info"
              className="w-full"
            />
          </form>
        </Dialog>
        <Dialog
          header="ForgetPassword"
          visible={showForgetPswd}
          style={{
            width: "100%",
            maxWidth: "400px",
            position: "center",
            display: "flex",
            flexdirection: "column",
          }}
          modal
          draggable
          resizable
          onHide={() => {
            setShowSignIn(false);
            setShowLogin(false);
            setForgetPswd(false);
          }}
        >
          <ForgotPasswordDialog />
        </Dialog>

        <Dialog
          header="Sign In"
          visible={showSignIn}
          style={{ width: "300%", maxWidth: "800px" }}
          modal
          draggable
          resizable
          onHide={() => setShowSignIn(false)}
        >
          <form
            onSubmit={handleSignIn}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <span className="p-float-label">
              <InputText
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoFocus
              />
              <label htmlFor="name">Full Name</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                keyfilter="email"
              />
              <label htmlFor="email">Email</label>
            </span>
            <span className="p-float-label">
              <InputText
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                keyfilter="pint"
                maxLength={12}
              />
              <label htmlFor="phone">Phone Number</label>
            </span>
            <span className="p-float-label">
              <Password
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                toggleMask
                feedback={false}
                minLength={10}
                maxLength={16}
                promptLabel="Create a password"
                weakLabel="Weak"
                mediumLabel="Medium"
                strongLabel="Strong"
              />
              <label htmlFor="password">Password</label>
            </span>
            {errors.password && (
              <small style={{ color: "red", marginTop: -8 }}>
                {errors.password}
              </small>
            )}
            <span className="p-float-label">
              <Password
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                toggleMask
                feedback={false}
                minLength={10}
                maxLength={16}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </span>
            {errors.confirmPassword && (
              <small style={{ color: "red", marginTop: -8 }}>
                {errors.confirmPassword}
              </small>
            )}
            <Button
              type="submit"
              label="Sign In"
              severity="success"
              className="w-full"
            />
          </form>
        </Dialog>

        <button
          className="cart-btn"
          type="button"
          onClick={(e) => op.current.toggle(e)}
        >
          <i className="pi pi-shopping-cart" style={{ marginRight: 6 }} />
          Cart ({cartStore.itemCount})
        </button>
        <OverlayPanel
          ref={op}
          showCloseIcon
          dismissable
          style={{ width: "300px", maxWidth: "95vw" }}
        >
          <div style={{ padding: "1rem" }}>
            <b>Your Cart</b>
            <hr />
            {cartStore.cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "1rem" }}>
                Your cart is empty.
              </div>
            ) : (
              cartStore.cart.map((item) => (
                <div
                  key={item.cartId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                  <span>
                    <button
                      onClick={() => cartStore.removeFromCart(item.cartId)}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: 22,
                        cursor: "pointer",
                        color: "#db2828",
                        marginLeft: 10,
                      }}
                      title="Remove"
                    >
                      🗑️
                    </button>
                  </span>
                </div>
              ))
            )}
          </div>
        </OverlayPanel>
        <HamburgerMenu />
      </div>
    </header>
  );
});

export default Header;
