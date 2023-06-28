import {SavedJobType} from "../types/types/SavedJobType";
import axios, {AxiosRequestConfig} from "axios";
import AuthenticationService from "./AuthenticationService";

export default class SavedJobService {
  private static SERVER_BASE_URL: string = `${process.env.REACT_APP_BASE_URL}/saved-job`;

  public static async save(jobId: string) {
    const config: AxiosRequestConfig = {
      method: "post",
      url: this.SERVER_BASE_URL,
      headers: {
        Authorization: AuthenticationService.getJWT()
      },
      data: {jobId: jobId} as SavedJobType
    }
    const response = await axios(config);
    return response.data;
  }

  public static async delete(jobId: string) {
    const config: AxiosRequestConfig = {
      method: "delete",
      url: `${this.SERVER_BASE_URL}/id=${jobId}`,
      headers: {
        Authorization: AuthenticationService.getJWT()
      },
      data: {jobId: jobId} as SavedJobType
    }
    const response = await axios(config);
    return response.data;
  }

  public static async getByQueryIndex(jobId: string) {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${this.SERVER_BASE_URL}/jobId=${jobId}`,
      headers: {
        Authorization: AuthenticationService.getJWT()
      },
    }
    const response = await axios(config);
    return response.data;
  }

  public static async getByUsername() {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${this.SERVER_BASE_URL}/`,
      headers: {
        Authorization: AuthenticationService.getJWT()
      },
    }
    const response = await axios(config);
    return response.data;
  }
}
