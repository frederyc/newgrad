import {Education, Seniority, WorkArrangement, WorkTime} from "./JobEntryTypes";
import {UserData} from "./UserData";
import {CompanyData} from "./CompanyData";

export type JobEntryData = {
  id?: string,
  ownerUsername: string,
  companyName: string,
  title: string,
  location: string,
  description: string,
  link: string,
  workArrangement: WorkArrangement,
  workTime: WorkTime,
  seniority: Seniority,
  education: Education,
  responsibilities: string[],
  requiredSkills: string[],
  preferredSkills: string[],
  benefits: string[],
  salary: number[] | null,
  salaryCurrency: string | null,
  tags: string[],
}
