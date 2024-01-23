import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const login = createAsyncThunk("user/login", async (data) => {
  console.log("Sending login request with data:", data);
  const response = await fetch("http://localhost:5000/api/auth/v1/adminlogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;

});
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
    loading: false,
    message: "",
    error: "",
    success: false,
    userDetails: {},
  },
  reducers: {
    isLoggedIn: (state) => {
      let auth = localStorage.getItem("auth-token");
      let user = localStorage.getItem("user-details");
      if (auth && user) {
        state.authToken = auth;
        state.userDetails = JSON.parse(user);
      }
    },
    
    logout: (state) => {
      state.authToken = null;
      state.userDetails = {};
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
        (state, { payload: { error, message, authToken, success, logedInUser } }) => {
          console.log("Login Fulfilled Payload:", { error, message, authToken, success, logedInUser });
          if (error) {
            state.error = error;
          } else if (success) {
            state.success = success;
            state.authToken = authToken;
            state.message = message;
            state.userDetails = logedInUser;
            state.loading = false;
            // Save to localStorage
            localStorage.setItem("auth-token", authToken);
            localStorage.setItem("user-details", JSON.stringify(logedInUser));
          } else {
            state.message = message;
            state.success = success;
          }
        }
      )      
      .addCase(login.rejected, (state ,action) => {
        state.loading = false;
        console.error("Login rejected with error:", action.error);
      })
  },
});
export const { isLoggedIn, logout } = authSlice.actions;
export default authSlice.reducer;
