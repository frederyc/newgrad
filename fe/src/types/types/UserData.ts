import {UserRole} from "./UserRole";

export type UserData = {
  id: string,
  name: string,
  email: string,
  username: string,
  role: UserRole,
  company: string | null,
  university: string | null
}
