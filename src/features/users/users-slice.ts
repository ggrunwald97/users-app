import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../app/models/User';
import { deleteUser, getUsers, addUser, updateUser } from './users-thunk';

interface user {
  selectedUser: User,
  usersList: User[],
  errorMessage: string,
  isLoading: boolean,
};

const initialState: user = {
  selectedUser: {} as User,
  usersList: [],
  errorMessage: '',
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.errorMessage = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.usersList = action.payload;
    });
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.usersList = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.usersList = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.usersList = action.payload;
    })
  },
});

export default userSlice.reducer;

