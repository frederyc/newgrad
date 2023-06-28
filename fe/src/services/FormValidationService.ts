import {
  PostJobFVE,
  RegisterFVE,
} from "../types/types/FormValidationErrorTypes";
import {Education, Seniority, WorkArrangement, WorkTime} from "../types/types/JobEntryTypes";

export default class FormValidationService {

  public static getRegisterFormErrors = (
      fullName: string,
      email: string,
      password: string,
      cpassword: string,
      company?: string): RegisterFVE => {
    const nameRegex: RegExp = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/;
    const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex: RegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,25}$/;
    const companyRegex: RegExp = /^[0-9A-Za-zÀ-ÿ\s,._+;()*~'#@!?&-]+$/;    // TODO: this is not working right
    return {
      fullName: !nameRegex.test(fullName) ? "Invalid name" : null,
      email: !emailRegex.test(email) ? "Invalid email address" : null,
      password: !passwordRegex.test(password) ? "Invalid password" : null,
      cpassword: cpassword !== password ? "Passwords must match" : null,
      company: company === undefined ? undefined : (!companyRegex.test(company) ? "Invalid company name" : null)
    } as RegisterFVE;
  }

  public static getPostJobFormErrors = (
      jobTitle: string,
      jobLocation: string,
      link: string,
      workArrangement: WorkArrangement | null,
      workTime: WorkTime | null,
      seniority: Seniority | null,
      education: Education | null,
      description: string,
      responsibilities: string[],
      requiredSkills: string[],
      preferredSkills: string[],
  ): PostJobFVE => {
    const titleRegex: RegExp = /^(?!\s)(?!.*\s$)\S.{3,48}\S$/;
    const descriptionRegex: RegExp = /^(?!\s)(?!.*\s$)\S.{198,2490}\S$/;
    const linkRegex: RegExp = /^(http:\/\/|https:\/\/|ftp:\/\/|ftps:\/\/)/;
    const descriptionCnt: number = this.countCharacters(description);

    return {
      jobTitle: !titleRegex.test(jobTitle) ? "Invalid job title" : null,
      jobLocation: null,  // TODO make it match only certain locations
      link: !linkRegex.test(link) ? "Invalid link" : null,
      workArrangement: !workArrangement ? "Please select an option" : null,
      workTime: !workTime ? "Please select an option" : null,
      seniority: !seniority ? "Please select an option" : null,
      education: !education ? "Please select an option" : null,
      description: descriptionCnt < 200 || descriptionCnt > 2500
          ? "This field should have between [200, 2500] characters and not start or end with a space"
          : null,
      responsibilities: responsibilities.length === 0 ? "Please insert responsibilities" : null,
      requiredSkills: requiredSkills.length === 0 ? "Please insert required skills" : null,
      preferredSkills: null,
    }
  }

  private static countCharacters = (str: string): number => {
    return str.split("").filter(x => x !== " " && x !== "\n").length;
  }
}
