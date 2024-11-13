import axios from "axios";

export const FETCH_TOKEN = "FETCH_TOKEN";
export const FETCH_USER_DATA = "FETCH_USER_DATA";

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
      .post("http://localhost:3001/api/v1/user/profile", null, {
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
