import React from "react";

const UserGreeting = ({ userName }) => {
  return (
    <div className="user-greeting">
      <h1>
        Welcome back
        <br />
        {userName}!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
};

export default UserGreeting;
