import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("user/login", async (data) => {
  const response = await fetch("http://localhost:5000/api/auth/v1/adminlogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Fix the typo here
    },
    body: JSON.stringify(data),
  });
  let res = await response.json();
  return res;
});

export const signUp = createAsyncThunk("user/signup", async (data) => {
  const response = await fetch("http://localhost:5000/api/auth/v1/adminsignup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Fix the typo here
    },
    body: JSON.stringify(data),
  });
  let res = await response.json();
  return res;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
    loading: false, // Set to false initially
    message: "",
    error: "",
    success: "",
    userDetails: {},
  },
  reducers: {
    isLoggedIn: (state) => {
      let auth = localStorage.getItem("auth-token");
      let user = localStorage.getItem("user-details");
      if (auth && user) {
        state.authToken = auth;
        state.userDetails = user;
      }
      state.authToken = null;
      state.userDetails = {};
    },
    logout: (state) => {
      state.authToken = null;
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user-details");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          { payload: { error, message, authToken, success, userDetails } }
        ) => {
          if (error) {
            state.error = error;
          }
          if (success) {
            state.success = success;
            state.authToken = authToken;
            state.message = message;
            state.userDetails = userDetails;
            state.loading = false;
            localStorage.setItem("auth-token", authToken);
            localStorage.setItem("user-details", userDetails);
          }
        }
      )
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })

      // For SignUp

      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signUp.fulfilled,
        (
          state,
          { payload: { error, message, authToken, success, userDetails } }
        ) => {
          if (error) {
            state.error = error;
          }
          if (success) {
            state.success = success;
            state.authToken = authToken;
            state.message = message;
            state.userDetails = userDetails;
            state.loading = false;
            localStorage.setItem("auth-token", authToken);
            localStorage.setItem("user-details", userDetails);
          }
        }
      )
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { isLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
