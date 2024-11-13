import { FETCH_TOKEN, FETCH_USER_DATA } from "../actions/user.actions";

const initialState = { token: null, user: null };

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
