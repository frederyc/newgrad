import axios, {AxiosRequestConfig} from "axios";
import AuthenticationService from "./AuthenticationService";
import {JobEntryData} from "../types/types/JobEntryData";
import {BrowseJobEntryData} from "../types/types/BrowseJobEntryData";

export default class JobEntryService {
  private static SERVER_BASE_URL: string = `${process.env.REACT_APP_BASE_URL}/job-entry`;

  public static async getJobById(id: string) {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${this.SERVER_BASE_URL}/id=${id}`,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    const response = await axios(config);
    return response.data as JobEntryData;
  }

  public static async getJobs(params: URLSearchParams) {
    let jobId: string | null = null;
    if (params.get("id")) {
      jobId = params.get("id");
      params.delete("id");
    }
    const url: string = `${this.SERVER_BASE_URL}/${params.toString() === "" ? "" : `?${params.toString()}`}`;
    if (jobId) {
      params.set("id", jobId);
    }
    const config: AxiosRequestConfig = {
      method: "get",
      url: url,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    const response = await axios(config);
    return response.data;
  }

  public static async getUserPostedJobs() {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${this.SERVER_BASE_URL}/posted`,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    const response = await axios(config);
    return response.data;
  }

  public static async getUserSavedJobs() {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${this.SERVER_BASE_URL}/saved`,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    const response = await axios(config);
    return response.data;
  }

  public static async postJob(jobEntry: JobEntryData) {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${this.SERVER_BASE_URL}`,
      data: jobEntry,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    const response = await axios(config);
    return response.data;
  }

  public static async putJob(jobEntry: JobEntryData) {
    const config: AxiosRequestConfig = {
      method: "put",
      url: `${this.SERVER_BASE_URL}`,
      data: jobEntry,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    const response = await axios(config);
    return response.data;
  }

  public static async deleteJob(jobEntry: JobEntryData | BrowseJobEntryData) {
    const config: AxiosRequestConfig = {
      method: "delete",
      url: `${this.SERVER_BASE_URL}/${jobEntry.id}`,
      data: jobEntry,
      headers: {
        Authorization: AuthenticationService.getJWT()
      }
    }
    const response = await axios(config);
    return response.data;
  }
}
