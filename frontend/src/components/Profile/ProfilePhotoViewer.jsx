import React from "react";
import { Dialog } from "primereact/dialog";

const ProfilePhotoViewer = ({ photo, visible, onHide }) => {
  return (
    <Dialog
      header="Profile Photo"
      visible={visible}
      onHide={onHide}
      className="profile-photo-viewer"
      draggable={false}
      resizable={false}
    >
      <div className="photo-viewer-content">
        {photo ? (
          <img src={photo} alt="Profile" className="enlarged-photo" />
        ) : (
          <div className="no-photo">
            <i className="pi pi-image" style={{ fontSize: "3rem" }}></i>
            <p>No photo available</p>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ProfilePhotoViewer;
