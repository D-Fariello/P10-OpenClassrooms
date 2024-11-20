import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserName } from "../../actions/user.actions";

const UserGreeting = () => {
  const user = useSelector((state) => state.userReducer);
  const [editButton, setEditButton] = useState(false);
  const [userName, setUserName] = useState(user?.user?.body?.userName || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.user?.body?.userName && user?.user?.body?.userName !== userName) {
      setUserName(user?.user?.body?.userName || "");
    }
  }, [user]);

  const handleEditButtonClick = () => {
    setEditButton(true);
    setUserName(user?.user?.body?.userName);
  };

  const handleEditName = (e) => {
    e.preventDefault();
    const postData = {
      userName,
    };

    dispatch(editUserName(postData, user.token)).then((updatedUserData) => {
      // After successful update, update the local state
      if (updatedUserData && updatedUserData.body) {
        setUserName(updatedUserData.userName);
      }
    });

    setEditButton(false);
  };

  const handleCancelEdit = () => {
    setUserName(user?.user?.body?.userName);
    setEditButton(false);
  };

  return (
    <div className="user-greeting">
      <h1>
        Welcome back
        <br />
        {userName || "Loading.."}!
      </h1>
      {editButton ? (
        <form className="form-edit-name" onSubmit={handleEditName}>
          <div className="div-user-name">
            <label className="label">Username</label>
            <input
              className="input-user-name"
              type="text"
              placeholder="Username"
              value={userName || ""}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="div-first-name">
            <label className="label">First Name</label>
            <input
              className="input-disabled-name"
              type="text"
              value={user?.user?.body?.firstName || ""}
              placeholder="First Name"
              disabled
            />
          </div>

          <div className="div-last-name">
            <label className="label">Last Name</label>
            <input
              className="input-disabled-name"
              type="text"
              value={user?.user?.body?.lastName || ""}
              placeholder="First Name"
              disabled
            />
          </div>

          <div className="button-group">
            <button className="button-save" type="submit">
              Save
            </button>
            <button
              className="button-cancel"
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="edit-button" onClick={handleEditButtonClick}>
          Edit Name
        </button>
      )}
    </div>
  );
};

export default UserGreeting;
