import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ProfileEditModal = ({ field, value, visible, onHide, onSave }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const fieldName = field ? field.replace(/([A-Z])/g, " $1") : "";

  const handleSave = () => {
    onSave(field, inputValue);
  };

  const footer = (
    <div className="modal-footer">
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={onHide}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-success"
        onClick={handleSave}
        autoFocus
      />
    </div>
  );

  return (
    <Dialog
      header={`Edit ${fieldName}`}
      visible={visible}
      onHide={onHide}
      className="profile-edit-modal"
      footer={footer}
      draggable={false}
    >
      <div className="modal-content">
        <label className="p-d-block mb-2">
          Enter {fieldName.toLowerCase()}
        </label>
        <InputText
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full"
          placeholder={`Enter ${fieldName.toLowerCase()}`}
          autoFocus
        />
      </div>
    </Dialog>
  );
};

export default ProfileEditModal;
