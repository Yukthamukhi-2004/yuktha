import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login attempt:", { email, password });
    // Add login logic here
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Card title="Login to Flipkart" style={{ width: "400px" }}>
        <div className="p-fluid">
          <div className="p-field" style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="p-field" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              feedback={false}
            />
          </div>

          <Button
            label="Login"
            className="w-full"
            onClick={handleLogin}
            style={{ background: "#2874f0", borderColor: "#2874f0" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
