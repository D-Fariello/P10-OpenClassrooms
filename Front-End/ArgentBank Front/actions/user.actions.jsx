import axios from "axios";

export const FETCH_TOKEN = "FETCH_TOKEN";
export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const EDIT_USER_NAME = "EDIT_USER_NAME";

export const fetchToken = (postData) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:3001/api/v1/user/login", postData)
      .then((response) => {
        dispatch({
          type: FETCH_TOKEN,
          payload: response.data.body.token,
        });
        return response.data.body.token;
      });
  };
};

export const fetchUserData = (token) => {
  return (dispatch) => {
    return axios
      .get("http://localhost:3001/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: FETCH_USER_DATA,
          payload: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        throw error.message;
      });
  };
};

export const editUserName = (postData, token) => {
  return (dispatch) => {
    return axios
      .put("http://localhost:3001/api/v1/user/profile", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedUser = response.data.body;

        // Dispatch updated user data to Redux
        dispatch({
          type: EDIT_USER_NAME,
          payload: updatedUser, // Dispatch updated user data
        });

        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Return updated user data for local state sync
        return updatedUser;
      })
      .catch((error) => {
        console.error("Error updating user name:", error);
        throw error;
      });
  };
};
