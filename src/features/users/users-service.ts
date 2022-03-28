import { AxiosResponse } from "../../app/models/AxiosResponse";
import { User } from "../../app/models/User";
import { axiosDelete } from "../../axiosHelpers/axiosDeleteHelper";
import { axiosGet } from "../../axiosHelpers/axiosGetHelper";
import { axiosPost } from "../../axiosHelpers/axiosPostHelper";
import { axiosPut } from "../../axiosHelpers/axiosPutHelper";


export class UserService {
  getUsers = async (): Promise<AxiosResponse> => {
    return await axiosGet('users')
  }

  addUser = async(postBody: User): Promise<AxiosResponse> => {
    return await axiosPost(`users`, postBody)
  }

  updateUser = async (userId: number, postBody: User):  Promise<AxiosResponse> => {
    return await axiosPut(`users/${userId}`, postBody)
  }

  deleteUser = async(userId: number): Promise<AxiosResponse> => {
    return await axiosDelete(`users/${userId}`)
  }
}

export const userService = new UserService();
