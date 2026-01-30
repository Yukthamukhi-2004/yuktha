import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileInfoCard from "../../components/Profile/ProfileInfoCard";
import ProfileEditModal from "../../components/Profile/ProfileEditModal";
import ProfilePhotoViewer from "../../components/Profile/ProfilePhotoViewer";
import "../../styles/profile.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "rtyuio",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    profilePhoto: "",
  });

  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [showPhotoViewer, setShowPhotoViewer] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const toast = useRef(null);

  const handleEdit = (field, value) => {
    setEditField(field);
    setEditValue(value || "");
  };

  const handleSave = (field, newValue) => {
    const trimmedValue =
      typeof newValue === "string" ? newValue.trim() : newValue;

    setUserData((prev) => ({
      ...prev,
      [field]: trimmedValue,
    }));

    const fieldName = field.replace(/([A-Z])/g, " $1").toLowerCase();
    const detailMessage = trimmedValue
      ? `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} updated successfully`
      : `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} cleared`;

    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: detailMessage,
      life: 3000,
    });

    setEditField(null);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "File size should be less than 5MB",
          life: 3000,
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUserData((prev) => ({
          ...prev,
          profilePhoto: e.target.result,
        }));

        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Profile photo updated successfully",
          life: 3000,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setUserData((prev) => ({
      ...prev,
      profilePhoto: "",
    }));

    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Profile photo removed",
      life: 3000,
    });
  };

  const handleViewPhoto = () => {
    if (userData.profilePhoto) {
      setSelectedPhoto(userData.profilePhoto);
      setShowPhotoViewer(true);
    }
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleSaveProfile = () => {
    toast.current.show({
      severity: "success",
      summary: "Profile Saved",
      detail: "All profile changes have been saved",
      life: 3000,
    });
  };

  const personalFields = [
    {
      label: "First Name",
      value: userData.firstName,
      field: "firstName",
      icon: "pi-user",
    },
    {
      label: "Last Name",
      value: userData.lastName,
      field: "lastName",
      icon: "pi-user",
    },
    {
      label: "Phone Number",
      value: userData.phoneNumber,
      field: "phoneNumber",
      icon: "pi-phone",
    },
    {
      label: "Email Address",
      value: userData.email,
      field: "email",
      icon: "pi-envelope",
    },
  ];

  const addressFields = [
    {
      label: "Address",
      value: userData.address,
      field: "address",
      icon: "pi-home",
    },
  ];

  return (
    <div className="profile-page-container">
      <Toast ref={toast} />

      {/* Wrong button outside the profile card */}
      <div className="wrong-button-container">
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-text p-button-danger"
          onClick={handleNavigateHome}
          tooltip="Go to Home"
          tooltipOptions={{ position: "left" }}
        />
      </div>

      <div className="profile-wrapper">
        <Card className="profile-card">
          <ProfileHeader
            userData={userData}
            onPhotoUpload={handlePhotoUpload}
            onRemovePhoto={handleRemovePhoto}
            onViewPhoto={handleViewPhoto}
          />

          <div className="profile-content">
            <div className="profile-section">
              <ProfileInfoCard
                title="Personal Information"
                fields={personalFields}
                onEdit={handleEdit}
              />
            </div>

            <div className="profile-section">
              <ProfileInfoCard
                title="Address Information"
                fields={addressFields}
                onEdit={handleEdit}
              />
            </div>

            <div className="profile-section">
              <div className="account-actions">
                <Button
                  label="Change Password"
                  icon="pi pi-lock"
                  className="p-button-outlined"
                />
                <Button
                  label="Save Profile"
                  icon="pi pi-save"
                  className="p-button-success"
                  onClick={handleSaveProfile}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <ProfileEditModal
        field={editField}
        value={editValue}
        visible={editField !== null}
        onHide={() => setEditField(null)}
        onSave={handleSave}
      />

      <ProfilePhotoViewer
        photo={selectedPhoto}
        visible={showPhotoViewer}
        onHide={() => setShowPhotoViewer(false)}
      />
    </div>
  );
};

export default ProfilePage;
