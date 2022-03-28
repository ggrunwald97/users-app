import { createSlice } from '@reduxjs/toolkit';

interface login {
  isUserLoggedIn: boolean,
};

const initialState: login = {
  isUserLoggedIn: false,
};

export const loginSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    logUserIn: (state) => {
      state.isUserLoggedIn = true;
    },
    logUserOut: (state) => {
      state.isUserLoggedIn = false;
    },
  },
  extraReducers: () => {
  },
});

export const { logUserIn, logUserOut } = loginSlice.actions;

export default loginSlice.reducer;

