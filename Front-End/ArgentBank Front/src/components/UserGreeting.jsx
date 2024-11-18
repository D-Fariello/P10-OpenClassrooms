import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editUserName } from "../../actions/user.actions";

const UserGreeting = ({ userName, user }) => {
  const [editButton, setEditButton] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();

  const handleEditName = (e) => {
    e.preventDefault();
    const postData = {
      firstName,
      lastName,
    };
    dispatch(editUserName(postData, user.token));
    setEditButton(false);
  };

  return (
    <div className="user-greeting">
      <h1>
        Welcome back
        <br />
        {userName}!
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
