import axios, {AxiosError} from "axios";
import {AxiosRequestConfig} from "axios";
import UserDataService from "./UserDataService";
import {SignUpRequestType} from "../types/types/SignUpRequestType";

export default class AuthenticationService {
  private static BASE_URL: string = `${process.env.REACT_APP_BASE_URL}/authentication`;

  public static async signUp(req: SignUpRequestType) {
    const url: string = `${this.BASE_URL}/signup`;
    const body = {
      name: req.name,
      email: req.email,
      password: req.password,
      role: req.role,
      university: req.university,
      company: req.company
    }

    try {
      const response = await axios.post(url, body);
      return response.data;
    } catch (err: any) {
      return err;
    }
  }

  public static async signIn(email: string, password: string) {
    const url: string = `${this.BASE_URL}/signin`;
    const body = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post(url, body);
      this.storeJWT(response.data);
      await UserDataService.getUserDataCloud();
      return response.data;
    } catch (err: any) {
      return err;
    }
  }

  public static async signOut() {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${this.BASE_URL}/signout`,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    try {
      const response = await axios(config);
      this.removeJWT();
      UserDataService.removeUserData();
      return response.data;
    } catch (e: any) {
      if (e instanceof AxiosError) {
        console.log("axios err 2");
      } else {
        console.log("other error");
      }
      return e;
    }
  }

  public static storeJWT(jwt: string) {
    window.localStorage.setItem("jwt", jwt);
  }

  public static getJWT(): string | null {
    return window.localStorage.getItem("jwt");
  }

  public static removeJWT() {
    window.localStorage.removeItem("jwt");
  }
}
