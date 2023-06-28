import axios, {AxiosRequestConfig} from "axios";

export default class UniversityService {
  private static SERVER_BASE_URL: string = `${process.env.REACT_APP_BASE_URL}/university`;

  public static async getById(id: string) {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${this.SERVER_BASE_URL}/${id}`
    }
    const response = await axios(config);
    return response.data;
  }

  public static async getByName(name: string) {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `${this.SERVER_BASE_URL}/name=${name}`
    }
    const response = await axios(config);
    return response.data;
  }

  public static async getByStudentEmailDomain(domain: string) {
    const url = `${this.SERVER_BASE_URL}/domain=${domain}`;
    const response = await axios.get(`${this.SERVER_BASE_URL}/domain=${domain}`);
    return response.data;
  }
}
