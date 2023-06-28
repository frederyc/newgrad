import {CompanyData} from "../types/types/CompanyData";
import axios from "axios";

export default class CompanyDataService {
  private static SERVER_BASE_URL: string = `${process.env.REACT_APP_BASE_URL}/company`;
  private static S3_CONTAINER_COMPANIES_URL: string = `${process.env.REACT_APP_S3_CONTAINER_COMPANIES}`;

  public static async getAllCompanies() {
    // TODO this function doesn't handle errors, should do it in the future
    const url: string = `${this.SERVER_BASE_URL}/`;
    const response = await axios.get(url);
    // TODO fix this
    return response.data as CompanyData[];
  }

  public static getCompanyImageURL(companyName: string, imageSize: "S" | "L"): string {
    // image size in pixels
    const size: number = imageSize === "S" ? 64 : 512;
    // company name modified for url
    let name: string = "";
    companyName.split(" ").forEach(x => name += x.toLowerCase());

    return `${this.S3_CONTAINER_COMPANIES_URL}/${size}/${name}_${size}x${size}.jpg`;
  }
}
