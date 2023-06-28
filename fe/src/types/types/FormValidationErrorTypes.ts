import react from "react";

/**
 * How does form validation work in this application? Simple! Each form has its specific key-value pair data structure,
 * where each field is of type 'key: string | null', representing the error status of that field, when validated, which
 * usually happens when the user clicks a submit button. If the value of the field is null, that means there are no
 * errors on the specific field, if it has a value, that will be the error, for example "Password is too short". The
 * purpose of each interface that extends FormValidation is to be used as a stateful variable, and, when the user
 * submits the form, to be changed according to the specific needs. You can go to the PostJobForm for an example.
 */

/**
 * A form validator is an interface that should be passed to a component inside a form (like a text input), that's
 * intended to display an error message if the data in the input is not correct. It gets the name of the field,
 * (ex: "email"), the formValidation data structure, that keeps track of current errors in the form and its setter
 * (remember, FromValidator needs to be used as a stateful component). Its main purpose is to reset an error field to
 * null when a change is made. For example, after a user submitted a field and the email was incorrect, after he focuses
 * on that field again and changes the text, the error should no longer be visible, so we'll need to set the email's
 * error field to null.
 */
export interface FormValidator<T extends FVE> {
  field: keyof T, // The field which the component will modify (ex: "fullName")
  fv: T,  // The form validation, specific for each form
  setFV: react.Dispatch<react.SetStateAction<T>>  // The setter for the form validation
}

// FVE = FormValidationError
export interface FVE {}

export interface RegisterFVE extends FVE {
  fullName: string | null,
  email: string | null,
  password: string | null,
  cpassword: string | null,
  company?: string | null
}

export interface PostJobFVE extends FVE {
  jobTitle: string | null,
  jobLocation: string | null,
  link: string | null,
  workArrangement: string | null,
  workTime: string | null,
  seniority: string | null,
  education: string | null,
  description: string | null,
  responsibilities: string | null,
  requiredSkills: string | null,
  preferredSkills: string | null,
}
