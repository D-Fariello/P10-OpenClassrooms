import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editUserName } from "../../actions/user.actions";

const UserGreeting = ({ user }) => {
  const [editButton, setEditButton] = useState(false);
  const [firstName, setFirstName] = useState(user?.user?.body?.firstName || "");
  const [lastName, setLastName] = useState(user?.user?.body?.lastName || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.user?.body?.firstName && user?.user?.body?.lastName) {
      setFirstName(user?.user?.body?.firstName);
      setLastName(user?.user?.body?.lastName);
    }
  }, [user]);

  const handleEditName = (e) => {
    e.preventDefault();
    const postData = {
      firstName,
      lastName,
    };

    console.log("Submitting data:", postData);

    dispatch(editUserName(postData, user.token)).then((updatedUserData) => {
      // After successful update, update the local state
      if (updatedUserData && updatedUserData.body) {
        setFirstName(updatedUserData.firstName);
        setLastName(updatedUserData.lastName);
      }
    });
    console.log("Name updated successfully!");

    setEditButton(false);
  };

  const userName = `${firstName} ${lastName}`;

  return (
    <div className="user-greeting">
      <h1>
        Welcome back
        <br />
        {userName || "Loading..."}!
      </h1>
      {editButton ? (
        <form className="form-edit-name" onSubmit={handleEditName}>
          <input
            className="input-first-name"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input-last-name"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="button-group">
            <button className="button-save" type="submit">
              Save
            </button>
            <button
              className="button-cancel"
              type="button"
              onClick={() => setEditButton(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="edit-button" onClick={() => setEditButton(true)}>
          Edit Name
        </button>
      )}
    </div>
  );
};

export default UserGreeting;
