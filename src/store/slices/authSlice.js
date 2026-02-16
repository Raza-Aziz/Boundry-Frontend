import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const initialState = {
  user: null,
  // NOTE: No need of token as setting token as HTTP-only cookie
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    );

    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    );

    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });

    builder.addMatcher(
      authApi.endpoints.getCurrentUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
    );
  },
});

{
  /* NOTE : For dispatch() approach

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login: (state, action) => {
        state.user = action.payload.userData;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      },
      register: (state, action) => {
        state.user = action.payload.newUserData;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      },
    },
  });
  */
}

// export const { login, logout, register } = authSlice.actions;

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
