import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { User } from "../../app/models/User";
import { userService } from "./users-service";
import { setAlert } from "./users-slice";


export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (thunkAPI) => {
    const response = await userService.getUsers();

    if (response.hasErrors) {
      throw new Error(response.errorMessage);
    }
    return response.data;
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async(postBody: User, thunkAPI) => {
    const response = await userService.addUser(postBody);
    if (response.hasErrors) {
      thunkAPI.dispatch(setAlert({
        severity: "error",
        text: "An error has occurred.",
        isOpen: true,
      }))
      throw new Error(response.errorMessage);
    }
    thunkAPI.dispatch(setAlert({
      severity: "success",
      text: `User ${postBody?.name} added successfully.`,
      isOpen: true,
    }))

    const store: RootStateOrAny = thunkAPI.getState();
    let usersList = JSON.parse(JSON.stringify(store.users.usersList));
    usersList.unshift(response.data);
    return usersList;
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async(data: {userId: number, postBody: User}, thunkAPI) => {
    const response = await userService.updateUser(data?.userId, data?.postBody);

    if (response.hasErrors) {
      thunkAPI.dispatch(setAlert({
        severity: "error",
        text: "An error has occurred while editing the user.",
        isOpen: true,
      }))
      throw new Error(response.errorMessage);
    }
    thunkAPI.dispatch(setAlert({
      severity: "success",
      text: `User ${data.postBody?.name} edited successfully.`,
      isOpen: true,
    }))

    const store: RootStateOrAny = thunkAPI.getState();

    let usersList = JSON.parse(JSON.stringify(store.users.usersList));
    const userIndexToUpdate = usersList.findIndex((user: User) => user._id === data.userId);

    usersList.splice(userIndexToUpdate, 1, response.data)
    return usersList;
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async(userId: number, thunkAPI) => {
    const response = await userService.deleteUser(userId);

    if (response.hasErrors) {
      thunkAPI.dispatch(setAlert({
        severity: "error",
        text: "An error has occurred while deleting the user.",
        isOpen: true,
      }))
      throw new Error(response.errorMessage);
    }
    thunkAPI.dispatch(setAlert({
      severity: "success",
      text: `User ${userId} deleted successfully.`,
      isOpen: true,
    }))

    const store: RootStateOrAny = thunkAPI.getState();

    let usersList = JSON.parse(JSON.stringify(store.users.usersList));

    const userIndexToDelete = usersList.findIndex((user: User) => user._id === userId);
    usersList.splice(userIndexToDelete, 1);
    return usersList;
  }
)


