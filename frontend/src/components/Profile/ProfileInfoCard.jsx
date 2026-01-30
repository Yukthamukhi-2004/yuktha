import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const ProfileInfoCard = ({ title, fields, onEdit }) => {
  return (
    <Card title={title} className="profile-info-card">
      <div className="profile-fields">
        {fields.map((field, index) => (
          <div key={index} className="profile-field">
            <div className="field-label">
              <i className={`pi ${field.icon}`}></i>
              <span>{field.label}</span>
            </div>
            <div className="field-value-and-edit">
              <span
                className={`field-value ${!field.value ? "empty-value" : ""}`}
              >
                {field.value || `No ${field.label.toLowerCase()} set`}
              </span>
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-text edit-button"
                onClick={() => onEdit(field.field, field.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProfileInfoCard;
