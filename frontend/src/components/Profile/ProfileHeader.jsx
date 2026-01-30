import React, { useRef } from "react";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";

const ProfileHeader = ({
  userData,
  onPhotoUpload,
  onRemovePhoto,
  onViewPhoto,
}) => {
  const fileInputRef = useRef(null);
  const overlayPanelRef = useRef(null);

  const handleCameraClick = (event) => {
    if (userData.profilePhoto) {
      overlayPanelRef.current.toggle(event);
    } else {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-header">
      <div className="photo-section">
        <div className="profile-photo-container">
          {userData.profilePhoto ? (
            <img
              src={userData.profilePhoto}
              alt="Profile"
              className="profile-photo"
              onClick={onViewPhoto}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <div className="profile-photo-placeholder">
              <i className="pi pi-user" style={{ fontSize: "2rem" }}></i>
            </div>
          )}

          <Button
            icon="pi pi-camera"
            className="p-button-rounded camera-button"
            onClick={handleCameraClick}
          />

          <OverlayPanel ref={overlayPanelRef}>
            <div className="photo-menu">
              <Button
                label="View Photo"
                icon="pi pi-eye"
                className="p-button-text w-full justify-start"
                onClick={() => {
                  overlayPanelRef.current.hide();
                  onViewPhoto();
                }}
              />
              <Button
                label="Remove Photo"
                icon="pi pi-trash"
                className="p-button-text p-button-danger w-full justify-start"
                onClick={() => {
                  overlayPanelRef.current.hide();
                  onRemovePhoto();
                }}
              />
            </div>
          </OverlayPanel>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={onPhotoUpload}
        />

        <div className="profile-name">
          <h2>
            {userData.firstName || userData.lastName
              ? `${userData.firstName || ""} ${userData.lastName || ""}`.trim()
              : "No Name Set"}
          </h2>
          <p>{userData.email || "No email set"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
