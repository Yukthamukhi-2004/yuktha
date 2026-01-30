import React, { useState } from "react";
import { InputText } from "primereact/inputtext";

const ForgotPasswordDialog = () => {
  const [form, setForm] = useState({ email: "", otp: "" });
  const [otpSentMsg, setOtpSentMsg] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleGetOtp = async () => {
    if (!form.email.trim()) {
      alert("Please enter an email.");
      return;
    }
    setOtpSentMsg("Sending OTP...");
    try {
      const res = await fetch("http://localhost:4000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsOtpSent(true);
        setOtpSentMsg("OTP sent to " + form.email);
      } else {
        setOtpSentMsg(data.message || "Failed to send OTP.");
      }
    } catch {
      setOtpSentMsg("Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    const res = await fetch("http://localhost:4000/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.email, otp: form.otp }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Login successfully!");
      setForm({ email: "", otp: "" });
      setIsOtpSent(false);
      setOtpSentMsg("");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        padding: 16,
      }}
      onSubmit={(e) => e.preventDefault()}
    >
      <span className="p-float-label" style={{ width: "80%" }}>
        <InputText
          id="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          keyfilter="email"
          style={{ width: "100%" }}
        />
        <label htmlFor="email">Email</label>
      </span>
      <button
        type="button"
        onClick={handleGetOtp}
        style={{
          width: "80%",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "16px",
          padding: "12px 0",
          fontSize: "1rem",
          cursor: "pointer",
        }}
        disabled={isOtpSent}
      >
        Get OTP
      </button>
      {otpSentMsg && (
        <div style={{ color: "#2196f3", fontSize: 13, marginTop: -12 }}>
          {otpSentMsg}
        </div>
      )}
      <span className="p-float-label" style={{ width: "80%" }}>
        <InputText
          id="otp"
          name="otp"
          value={form.otp}
          onChange={(e) =>
            setForm({
              ...form,
              otp: e.target.value.replace(/[^0-9]/g, "").slice(0, 6),
            })
          }
          keyfilter="pint"
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          style={{ width: "100%", letterSpacing: 4 }}
        />
        <label htmlFor="otp">Enter OTP</label>
      </span>
      <button
        type="button"
        onClick={handleVerifyOtp}
        style={{
          width: "80%",
          backgroundColor: "#00796b",
          color: "white",
          border: "none",
          borderRadius: "16px",
          padding: "12px 0",
          fontSize: "1rem",
          cursor: "pointer",
        }}
        disabled={!form.otp || form.otp.length < 6 || !isOtpSent}
      >
        Verify OTP
      </button>
    </form>
  );
};
export default ForgotPasswordDialog;
