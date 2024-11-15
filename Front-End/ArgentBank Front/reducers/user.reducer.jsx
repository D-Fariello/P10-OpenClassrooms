import { FETCH_TOKEN, FETCH_USER_DATA } from "../actions/user.actions";

const initialState = {
  token: localStorage.getItem("token") || null, // Load from localStorage
  user: JSON.parse(localStorage.getItem("user")) || null, // Parse stored user
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case FETCH_USER_DATA:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
