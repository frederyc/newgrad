export type GlobalAlertType = {
  severity?: "error" | "warning" | "info" | "success",
  title: string,
  message: string,
  open: boolean
}

export const DEFAULT_GLOBAL_ALERT: GlobalAlertType = {
  severity: undefined,
  title: "",
  message: "",
  open: false
}
