import {JobReportType} from "../types/types/JobReportType";
import axios, {AxiosRequestConfig} from "axios";
import AuthenticationService from "./AuthenticationService";

export default class JobReportService {
  private static SERVER_BASE_URL: string = `${process.env.REACT_APP_BASE_URL}/job-report`;

  public static async save(jobReport: JobReportType) {
    const config: AxiosRequestConfig = {
      method: "post",
      url: this.SERVER_BASE_URL,
      headers: {
        Authorization: AuthenticationService.getJWT()
      },
      data: jobReport
    }
    const response = await axios(config);
    return response.data as JobReportType;
  }
}
