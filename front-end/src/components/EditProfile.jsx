import React, { useState } from 'react';

function EditProfile({ profile, onBack, onSaveProfile, onDeleteAccount }) {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const handleSave = () => {
    const updatedProfile = { name, email };
    onSaveProfile(updatedProfile);
  };

  return (
    <div className="edit-profile-container">
      <button className="back-button" onClick={onBack}>
        ← Go back
      </button>

      <h2 className="edit-profile-title">Edit Profile</h2>

      <div className="edit-profile-form">
        <label className="edit-profile-label">Name</label>
        <input
          type="text"
          className="edit-profile-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="edit-profile-label">Email</label>
        <input
          type="email"
          className="edit-profile-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="delete-account-button" onClick={onDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default EditProfile;