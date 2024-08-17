import React from 'react';

const Profile = ({ userName, userProfileImage }) => {
  return (
    <div className="profile-button">
      <button className="profile-button">
        <img
          src={userProfileImage}
          alt="User Profile"
          className="profile-pic"
        />
        <span>{userName}</span>
      </button>
    </div>
  );
};

export default Profile;
