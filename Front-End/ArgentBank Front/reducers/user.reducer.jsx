import {
  FETCH_TOKEN,
  FETCH_USER_DATA,
  EDIT_USER_NAME,
  LOGOUT_USER,
} from "../actions/user.actions";

const initialState = {
  token: sessionStorage.getItem("token") || null, // Load from sessionStorage
  user: (() => {
    const userData = sessionStorage.getItem("user");
    try {
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data from sessionStorage", error);
      return null;
    }
  })(),
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOKEN:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    case FETCH_USER_DATA:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case EDIT_USER_NAME:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}
