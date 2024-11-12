import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Retrieve the token from local storage if it exists
const savedToken = localStorage.getItem("token");

// INITIAL STATE
const initialState = {
  user: null,
  token: savedToken || null,
  isLoading: false,
  error: null,
};

// ASYNC THUNKS

// Thunk to handle login
export const login = createAsyncThunk(
  "user/login",
  async (credentials, thunkAPI) => {
    try {
      const { username, password } = credentials;
      console.log("Credentials being sent:", { username, password });
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      console.log("API response data:", data);

      if (!response.ok) throw new Error(data.message || "Failed to login");

      console.log("Token from API response:", data.body?.token);

      // Save token to local storage
      localStorage.setItem("token", data.body.token);

      return {
        token: data.body.token,
        user: data.body.user,
      };
    } catch (error) {
      console.log("Login error:", error.message);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

// Thunk to fetch user info
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().user.token || localStorage.getItem("token");

      if (!token) {
        return thunkAPI.rejectWithValue({
          message: "No token found, please log in.",
        });
      }

      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch user info");

      return {
        firstName: data.body.firstName || "Unknown",
        lastName: data.body.lastName || "Unknown",
        userName: data.body.userName || "Unknown",
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

// SLICE
export const SignInSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Synchronous login action (useful for initial token load)
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from local storage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login async thunk
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })

      // Handle fetchUserInfo async thunk if needed
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

// Export synchronous actions
export const { login: syncLogin, logout } = SignInSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

// Export the reducer
export default SignInSlice.reducer;
