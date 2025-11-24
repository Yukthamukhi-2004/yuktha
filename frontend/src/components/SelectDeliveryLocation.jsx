import React, { useState } from "react";

function SelectDeliveryLocation({ onClose }) {
  const [savedAddresses, setSavedAddresses] = useState([
    "Khammam, Telangana",
    "Hyderabad, Telangana",
    "Vijayawada, Andhra Pradesh",
  ]);
  const [currentAddress, setCurrentAddress] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSelectLocation = () => {
    if (!currentAddress.trim()) {
      alert("Please enter an address");
      return;
    }
    window.open(
      `https://www.google.com/maps?q=${encodeURIComponent(currentAddress)}`
    );
  };

  const handleSaveAddress = () => {
    if (!currentAddress.trim()) {
      alert("Please enter an address to save");
      return;
    }
    if (editingIndex !== null) {
      const updatedAddresses = [...savedAddresses];
      updatedAddresses[editingIndex] = currentAddress.trim();
      setSavedAddresses(updatedAddresses);
      setEditingIndex(null);
      setCurrentAddress("");
      alert("Address updated successfully!");
    } else {
      if (savedAddresses.includes(currentAddress.trim())) {
        alert("This address is already saved!");
        return;
      }
      setSavedAddresses([...savedAddresses, currentAddress.trim()]);
      setCurrentAddress("");
      alert("Address saved successfully!");
    }
  };

  const handleEditAddress = (index) => {
    setCurrentAddress(savedAddresses[index]);
    setEditingIndex(index);
  };

  const handleRemoveAddress = (indexToRemove) => {
    setSavedAddresses(
      savedAddresses.filter((_, index) => index !== indexToRemove)
    );
    if (editingIndex === indexToRemove) {
      setEditingIndex(null);
      setCurrentAddress("");
    }
    alert("Address removed.");
  };

  const handleClose = () => {
    setCurrentAddress("");
    setEditingIndex(null);
    onClose();
  };

  return (
    <div
      style={{
        padding: "1.5rem",
        backgroundColor: "#f9f9f9",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
        Select Delivery Location
      </h3>
      {/* Address Input Row */}
      <form
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveAddress();
        }}
      >
        <label htmlFor="delivery-address" style={{ marginRight: "0.5rem" }}>
          Address:
        </label>
        <input
          type="text"
          id="delivery-address"
          value={currentAddress}
          onChange={(e) => setCurrentAddress(e.target.value)}
          placeholder={
            editingIndex !== null ? "Edit address..." : "Enter delivery address"
          }
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "0.95rem",
          }}
          autoFocus
        />
        <button
          type="button"
          onClick={handleSelectLocation}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#2874f0",
            color: "white",
            border: "none",
            borderRadius: "2px",
            cursor: "pointer",
            fontSize: "0.9rem",
            transition: "background 0.2s",
          }}
          tabIndex={0}
        >
          Select Location
        </button>
        <button
          type="submit"
          disabled={!currentAddress.trim()}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: currentAddress.trim() ? "#28a745" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: currentAddress.trim() ? "pointer" : "not-allowed",
            fontSize: "0.9rem",
            transition: "background 0.2s",
          }}
          tabIndex={0}
        >
          {editingIndex !== null ? "Update Address" : "Save Address"}
        </button>
        <button
          type="button"
          onClick={handleClose}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
          tabIndex={0}
        >
          Close
        </button>
      </form>

      {/* Saved Addresses List */}
      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
        }}
      >
        <h4 style={{ marginBottom: "0.75rem", fontSize: "1rem" }}>
          Saved Addresses ({savedAddresses.length})
        </h4>
        {savedAddresses.length === 0 ? (
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            No saved addresses yet.
          </p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {savedAddresses.map((address, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  backgroundColor:
                    editingIndex === index ? "#fff3cd" : "#e8f5e9",
                  border: `1px solid ${
                    editingIndex === index ? "#ffc107" : "#4caf50"
                  }`,
                  borderRadius: "4px",
                  transition: "background 0.2s",
                }}
                tabIndex={0}
              >
                <span style={{ flex: 1 }}>
                  <strong>Address {index + 1}:</strong> {address}
                  {editingIndex === index && (
                    <span style={{ marginLeft: "0.5rem", color: "#ff9800" }}>
                      (Editing...)
                    </span>
                  )}
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => handleEditAddress(index)}
                    aria-label={`Edit address ${index + 1}`}
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "#ff9800",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      transition: "background 0.2s",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveAddress(index)}
                    aria-label={`Remove address ${index + 1}`}
                    style={{
                      padding: "0.25rem 0.75rem",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      transition: "background 0.2s",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectDeliveryLocation;
