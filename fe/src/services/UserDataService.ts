import axios, {AxiosRequestConfig} from "axios";
import AuthenticationService from "./AuthenticationService";
import {UserData} from "../types/types/UserData";

export default class UserDataService {
  private static BASE_URL: string = `${process.env.REACT_APP_BASE_URL}/user-data`;

  public static async getUserDataCloud() {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${this.BASE_URL}/`,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    try {
      const response = await axios(config);
      window.localStorage.setItem("userData", JSON.stringify(response.data));
      return response.data as UserData;
    } catch (e: any) {
      return e;
    }
  }

  public static getUserDataLocal(): UserData {
    return JSON.parse(window.localStorage.getItem("userData")!) as UserData;
  }

  public static removeUserData() {
    window.localStorage.removeItem("userData");
  }
}
