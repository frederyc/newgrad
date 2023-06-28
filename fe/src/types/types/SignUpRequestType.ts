export type SignUpRequestType = {
  name: string,
  email: string,
  password: string,
  role: "JOB_SEEKER" | "RECRUITER",
  university?: string,
  company?: string
}
