import {
  FETCH_TOKEN,
  FETCH_USER_DATA,
  EDIT_USER_NAME,
} from "../actions/user.actions";

const initialState = {
  token: localStorage.getItem("token") || null, // Load from localStorage
  user: JSON.parse(localStorage.getItem("user")) || null, // Parse stored user
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
      // After the name is edited, update the localStorage with the new user data
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
